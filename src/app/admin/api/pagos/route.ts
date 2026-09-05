import { NextResponse } from "next/server";
import {
  postHistorialPago,
  type NewPagoInput,
} from "@/lib/crm-data/get-suvoga-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SAVE_ERROR = "No se pudo guardar. Revisa conexión o permisos.";
const PAYMENT_CONCEPTS: NewPagoInput["concepto"][] = [
  "Anticipo",
  "Pago de clase",
  "Pago parcial",
  "Pago final",
  "Ajuste",
  "Otro",
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const concepto = String(body.concepto ?? "").trim();
    const monto = Number(body.monto);

    if (
      !String(body.idInscripcion ?? "").trim() ||
      !String(body.idPaciente ?? "").trim() ||
      !String(body.idServicio ?? "").trim() ||
      !String(body.nombreAlumnoAlPagar ?? "").trim() ||
      !String(body.nombreProgramaAlPagar ?? "").trim() ||
      !String(body.fechaPago ?? "").trim() ||
      !Number.isFinite(monto) ||
      monto <= 0 ||
      !PAYMENT_CONCEPTS.includes(concepto)
    ) {
      return NextResponse.json(
        { error: SAVE_ERROR },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const result = await postHistorialPago({
      idInscripcion: String(body.idInscripcion),
      idPaciente: String(body.idPaciente),
      idServicio: String(body.idServicio),
      nombreAlumnoAlPagar: String(body.nombreAlumnoAlPagar),
      nombreProgramaAlPagar: String(body.nombreProgramaAlPagar),
      fechaPago: String(body.fechaPago),
      fechaVencimiento: body.fechaVencimiento ? String(body.fechaVencimiento) : "",
      monto,
      metodoPago: String(body.metodoPago ?? ""),
      concepto,
      nota: String(body.nota ?? ""),
      registradoPor: "Admin SuVoGa",
    });

    return NextResponse.json(
      { ok: true, ...result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    console.error("[admin] No se pudo registrar el pago.");
    return NextResponse.json(
      { error: SAVE_ERROR },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
