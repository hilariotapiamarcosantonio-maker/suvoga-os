import { NextResponse } from "next/server";
import {
  updateInscripcion,
  type UpdateInscripcionInput,
} from "@/lib/crm-data/get-suvoga-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAVE_ERROR = "No se pudo guardar. Revisa conexión o permisos.";
const ATTENDANCE_STATUSES = [
  "Inscrito",
  "Contactado",
  "Asistió",
  "No asistió",
  "Reprogramar",
  "Finalizada",
] as const;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<UpdateInscripcionInput>;
    const idInscripcion = String(body.idInscripcion ?? "").trim();
    const estadoAsistencia = String(body.estadoAsistencia ?? "").trim();
    const hasProgramacion = Object.prototype.hasOwnProperty.call(body, "idProgramacion");
    const idProgramacion = body.idProgramacion == null
      ? null
      : String(body.idProgramacion).trim();

    const validAttendance = ATTENDANCE_STATUSES.includes(
      estadoAsistencia as (typeof ATTENDANCE_STATUSES)[number]
    );
    if (!idInscripcion || (!hasProgramacion && !validAttendance) || (hasProgramacion && estadoAsistencia && !validAttendance)) {
      return NextResponse.json(
        { error: SAVE_ERROR },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (hasProgramacion && idProgramacion !== null && idProgramacion.length > 120) {
      return NextResponse.json(
        { error: SAVE_ERROR },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const result = await updateInscripcion({
      idInscripcion,
      ...(estadoAsistencia ? { estadoAsistencia } : {}),
      ...(hasProgramacion ? { idProgramacion } : {}),
    });

    return NextResponse.json(
      { ok: true, ...result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    console.error("[admin] No se pudo actualizar la inscripción.");
    return NextResponse.json(
      { error: SAVE_ERROR },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
