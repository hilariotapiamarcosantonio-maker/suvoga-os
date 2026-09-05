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
    const validDateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(fechaHora);

    if (
      !idServicio ||
      !validDateTime ||
      Number.isNaN(Date.parse(fechaHora)) ||
      !Number.isInteger(cuposTotales) ||
      cuposTotales < 1
    ) {
      return NextResponse.json(
        { error: SAVE_ERROR },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const result = await postProgramacionCurso({
      idServicio,
      fechaHora,
      cuposTotales,
      cuposRestantes: cuposTotales,
    });

    return NextResponse.json(
      { ok: true, ...result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[admin] No se pudo crear la programación:", error);
    return NextResponse.json(
      { error: SAVE_ERROR },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
