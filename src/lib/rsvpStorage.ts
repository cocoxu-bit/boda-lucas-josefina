import { put, list } from "@vercel/blob";
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

const BLOB_PATH = "rsvp/submissions.json";
const FALLBACK_FILE = path.join(process.cwd(), "tmp_rsvp_submissions.json");

// Read all submissions
export async function getSubmissions(): Promise<RSVPSubmission[]> {
  try {
    // 1. Try reading from Vercel Blob
    const { blobs } = await list({ prefix: BLOB_PATH });
    const targetBlob = blobs.find((b) => b.pathname === BLOB_PATH);

    if (targetBlob) {
      const urlWithCacheBuster = targetBlob.url.includes("?")
        ? `${targetBlob.url}&_t=${Date.now()}`
        : `${targetBlob.url}?_t=${Date.now()}`;
      const res = await fetch(urlWithCacheBuster, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      }
    }
  } catch (error) {
    console.warn("Could not read from Vercel Blob, checking local fallback:", error);
  }

  // 2. Fallback to local filesystem / cache
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
  const current = await getSubmissions();

  const newEntry: RSVPSubmission = {
    ...data,
    id: "rsvp_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    submittedAt: new Date().toISOString(),
  };

  const updated = [newEntry, ...current];

  // 1. Save to Vercel Blob
  try {
    await put(BLOB_PATH, JSON.stringify(updated, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
  } catch (error) {
    console.warn("Could not write to Vercel Blob, writing to local fallback:", error);
  }

  // 2. Also keep local fallback updated
  try {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (e) {
    console.warn("Local fallback write warning:", e);
  }

  return newEntry;
}

// Delete a submission by ID
export async function deleteSubmission(id: string): Promise<boolean> {
  const current = await getSubmissions();
  const filtered = current.filter((item) => item.id !== id);

  try {
    await put(BLOB_PATH, JSON.stringify(filtered, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
  } catch (error) {
    console.warn("Could not write to Vercel Blob during delete:", error);
  }

  try {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  } catch (e) {
    console.warn("Local fallback write warning:", e);
  }

  return true;
}
