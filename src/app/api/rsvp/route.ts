import { NextResponse } from "next/server";
import { getSubmissions, saveSubmission, deleteSubmission } from "@/lib/rsvpStorage";

const VALID_PASSWORDS = [
  (process.env.ADMIN_PASSWORD || "boda2027").trim().toLowerCase(),
  "josefinaylucas2027",
  "lucasyjosefina2027",
  "monforte2027",
];

function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim().toLowerCase();
  const customHeader = (req.headers.get("x-admin-password") || "").trim().toLowerCase();

  const url = new URL(req.url);
  const queryPassword = (url.searchParams.get("password") || "").trim().toLowerCase();

  return (
    VALID_PASSWORDS.includes(token) ||
    VALID_PASSWORDS.includes(customHeader) ||
    VALID_PASSWORDS.includes(queryPassword)
  );
}

// POST /api/rsvp - Save guest response
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.attendance) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios (nombre o asistencia)" },
        { status: 400 }
      );
    }

    const saved = await saveSubmission({
      name: String(body.name).trim(),
      phone: body.phone ? String(body.phone).trim() : "-",
      attendance: body.attendance === "yes" ? "yes" : "no",
      companion: body.companion ? String(body.companion).trim() : undefined,
      dietary: Array.isArray(body.dietary) ? body.dietary : [],
      otherDietary: body.otherDietary ? String(body.otherDietary).trim() : undefined,
      guestRole: body.guestRole ? String(body.guestRole).trim() : undefined,
      songTitle: body.songTitle ? String(body.songTitle).trim() : undefined,
      songArtist: body.songArtist ? String(body.songArtist).trim() : undefined,
      message: body.message ? String(body.message).trim() : undefined,
    });

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return NextResponse.json({ error: "Error interno al guardar respuesta" }, { status: 500 });
  }
}

// GET /api/rsvp - Protected: Get all responses for Admin
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "No autorizado. Contraseña incorrecta." }, { status: 401 });
  }

  try {
    const list = await getSubmissions();
    return NextResponse.json({ success: true, count: list.length, data: list });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return NextResponse.json({ error: "Error al recuperar respuestas" }, { status: 500 });
  }
}

// DELETE /api/rsvp?id=... - Protected: Delete an RSVP
export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Falta ID de la respuesta" }, { status: 400 });
    }

    await deleteSubmission(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    return NextResponse.json({ error: "Error al eliminar respuesta" }, { status: 500 });
  }
}
