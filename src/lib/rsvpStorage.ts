import { put, list, del } from "@vercel/blob";
import fs from "fs";
import path from "path";

export interface RSVPSubmission {
  id: string;
  name: string;
  phone: string;
  attendance: "yes" | "no";
  companion?: string;
  dietary?: string[];
  otherDietary?: string;
  guestRole?: string;
  songTitle?: string;
  songArtist?: string;
  message?: string;
  submittedAt: string;
}

const LEGACY_BLOB_PATH = "rsvp/submissions.json";
const ITEMS_PREFIX = "rsvp/items/";
const FALLBACK_FILE = path.join(process.cwd(), "tmp_rsvp_submissions.json");

// Read all submissions
export async function getSubmissions(): Promise<RSVPSubmission[]> {
  try {
    const { blobs } = await list({ prefix: "rsvp/" });
    const byId = new Map<string, RSVPSubmission>();

    // 1. Read legacy single-file blob if present
    const legacyBlob = blobs.find((b) => b.pathname === LEGACY_BLOB_PATH);
    if (legacyBlob) {
      try {
        const urlWithCacheBuster = legacyBlob.url.includes("?")
          ? `${legacyBlob.url}&_t=${Date.now()}`
          : `${legacyBlob.url}?_t=${Date.now()}`;
        const res = await fetch(urlWithCacheBuster, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            for (const item of data) {
              if (item && item.id) {
                byId.set(item.id, item);
              }
            }
          }
        }
      } catch (e) {
        console.warn("Could not read legacy RSVP blob:", e);
      }
    }

    // 2. Read individual immutable item blobs (race-condition free & instant)
    const itemBlobs = blobs.filter(
      (b) => b.pathname.startsWith(ITEMS_PREFIX) && b.pathname.endsWith(".json")
    );

    if (itemBlobs.length > 0) {
      const fetchedItems = await Promise.all(
        itemBlobs.map(async (blob) => {
          try {
            const res = await fetch(blob.url, { cache: "no-store" });
            if (res.ok) {
              return (await res.json()) as RSVPSubmission;
            }
          } catch (e) {
            console.warn(`Failed reading blob ${blob.pathname}:`, e);
          }
          return null;
        })
      );

      for (const item of fetchedItems) {
        if (item && item.id) {
          byId.set(item.id, item);
        }
      }
    }

    if (byId.size > 0 || blobs.length > 0) {
      return Array.from(byId.values()).sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
    }
  } catch (error) {
    console.warn("Could not read from Vercel Blob, checking local fallback:", error);
  }

  // Fallback to local filesystem / cache
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const content = fs.readFileSync(FALLBACK_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Local fallback read error:", e);
  }

  return [];
}

// Save a new submission
export async function saveSubmission(
  data: Omit<RSVPSubmission, "id" | "submittedAt">
): Promise<RSVPSubmission> {
  const newEntry: RSVPSubmission = {
    ...data,
    id: "rsvp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    submittedAt: new Date().toISOString(),
  };

  // 1. Save individual item to Vercel Blob (zero race conditions, instant visibility)
  try {
    await put(`${ITEMS_PREFIX}${newEntry.id}.json`, JSON.stringify(newEntry, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  } catch (error) {
    console.warn("Could not write item to Vercel Blob, writing to local fallback:", error);
  }

  // 2. Also keep local fallback updated
  try {
    const current = await getSubmissions();
    const exists = current.some((item) => item.id === newEntry.id);
    const updated = exists ? current : [newEntry, ...current];
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (e) {
    console.warn("Local fallback write warning:", e);
  }

  return newEntry;
}

// Delete a submission by ID
export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    const { blobs } = await list({ prefix: "rsvp/" });

    // 1. Delete individual item blob if it exists
    const targetItemBlob = blobs.find((b) => b.pathname === `${ITEMS_PREFIX}${id}.json`);
    if (targetItemBlob) {
      await del(targetItemBlob.url);
    }

    // 2. If legacy submissions.json exists and contains this ID, update or remove it
    const legacyBlob = blobs.find((b) => b.pathname === LEGACY_BLOB_PATH);
    if (legacyBlob) {
      const res = await fetch(`${legacyBlob.url}?_t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const legacyData = await res.json();
        if (Array.isArray(legacyData)) {
          const remaining = legacyData.filter((item: RSVPSubmission) => item.id !== id);
          if (remaining.length === 0) {
            await del(legacyBlob.url);
          } else if (remaining.length !== legacyData.length) {
            // Migrate remaining legacy items to individual blobs and remove legacy file
            await Promise.all(
              remaining.map((item: RSVPSubmission) =>
                put(`${ITEMS_PREFIX}${item.id}.json`, JSON.stringify(item, null, 2), {
                  access: "public",
                  addRandomSuffix: false,
                  allowOverwrite: true,
                  contentType: "application/json",
                })
              )
            );
            await del(legacyBlob.url);
          }
        }
      }
    }
  } catch (error) {
    console.warn("Could not delete from Vercel Blob:", error);
  }

  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const current: RSVPSubmission[] = JSON.parse(fs.readFileSync(FALLBACK_FILE, "utf-8"));
      const filtered = current.filter((item) => item.id !== id);
      fs.writeFileSync(FALLBACK_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    }
  } catch (e) {
    console.warn("Local fallback write warning:", e);
  }

  return true;
}
