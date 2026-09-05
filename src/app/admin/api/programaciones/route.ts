import { NextResponse } from "next/server";
import { postProgramacionCurso } from "@/lib/crm-data/get-suvoga-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAVE_ERROR = "No se pudo guardar. Revisa conexión o permisos.";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const idServicio = String(body.idServicio ?? "").trim();
    const fechaHora = String(body.fechaHora ?? "").trim();
    const cuposTotales = Number(body.cuposTotales);
    const nombreGrupo = String(body.nombreGrupo ?? "").trim();
    const modalidad = String(body.modalidad ?? "").trim();
    const nota = String(body.nota ?? "").trim();
    const validDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fechaHora);

    if (
      !idServicio ||
      !validDateTime ||
      Number.isNaN(Date.parse(fechaHora)) ||
      !Number.isInteger(cuposTotales) ||
      cuposTotales < 1
    ) {
      return NextResponse.json(
        { error: SAVE_ERROR, code: "PROGRAMACION_WRITE_FAILED" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const result = await postProgramacionCurso({
      idServicio,
      fechaHora,
      cuposTotales,
      cuposRestantes: cuposTotales,
      nombreGrupo,
      modalidad,
      estadoProgramacion: "Programada",
      nota,
    });

    return NextResponse.json(
      { ok: true, ...result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    console.error("[admin] No se pudo crear la programación");
    return NextResponse.json(
      { error: SAVE_ERROR, code: "PROGRAMACION_WRITE_FAILED" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
