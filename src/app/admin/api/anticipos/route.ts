import { NextResponse } from "next/server";
import {
  updateAnticipo,
  type UpdateAnticipoInput,
} from "@/lib/crm-data/get-suvoga-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAVE_ERROR = "No se pudo guardar. Revisa conexión o permisos.";
const PAYMENT_ACTIONS: UpdateAnticipoInput["action"][] = [
  "pendiente",
  "confirmado",
  "completa",
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<UpdateAnticipoInput>;
    const idInscripcion = String(body.idInscripcion ?? "").trim();
    const action = body.action;
    const montoPagado = Number(body.montoPagado);

    if (
      !idInscripcion ||
      !action ||
      !PAYMENT_ACTIONS.includes(action) ||
      !Number.isFinite(montoPagado) ||
      montoPagado < 0
    ) {
      return NextResponse.json(
        { error: SAVE_ERROR },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const result = await updateAnticipo({
      idInscripcion,
      action,
      montoPagado,
      metodoPago: String(body.metodoPago ?? ""),
    });

    return NextResponse.json(
      { ok: true, ...result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    console.error("[admin] No se pudo actualizar el anticipo.");
    return NextResponse.json(
      { error: SAVE_ERROR },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
