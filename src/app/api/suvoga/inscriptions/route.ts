import { NextResponse } from "next/server";
import {
  getCatalogo,
  postInscripcion,
  postPaciente,
} from "@/lib/crm-data/get-suvoga-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function todayInLaPaz() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "America/La_Paz",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value;

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function isGooglePermissionError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const status = "status" in error ? (error as { status?: unknown }).status : null;
  const code = "code" in error ? (error as { code?: unknown }).code : null;

  return String(status) === "403" || String(code) === "403";
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const requiredFields = [
      "idServicio",
      "nombreCompleto",
      "whatsapp",
      "cedula",
      "provincia",
    ];
    const missing = requiredFields.filter(
      (field) => !String(data[field] ?? "").trim()
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const catalogo = await getCatalogo();
    const servicio = catalogo.find(
      (item) => item.idServicio === String(data.idServicio)
    );

    if (!servicio) {
      return NextResponse.json(
        { error: "El servicio seleccionado no existe en el catalogo." },
        { status: 404 }
      );
    }

    const paciente = await postPaciente({
      nombreCompleto: String(data.nombreCompleto).trim(),
      whatsapp: String(data.whatsapp).trim(),
      cedula: String(data.cedula).trim(),
      provincia: String(data.provincia).trim(),
    });

    const result = await postInscripcion({
      idPaciente: paciente.idPaciente,
      idServicio: servicio.idServicio,
      fechaProgramada: todayInLaPaz(),
      estadoAsistencia: "Inscrito",
      montoPagado: 0,
      balancePendiente: Number(data.montoAnticipo ?? servicio.montoAnticipo),
      metodoPago: "",
      estadoPago: "Anticipo pendiente",
    });

    return NextResponse.json({
      success: true,
      paciente,
      inscripcion: result.inscripcion,
      anticipo: result.anticipo,
    });
  } catch (error) {
    console.error("Error creating SuVoGa inscription:", error);
    if (isGooglePermissionError(error)) {
      return NextResponse.json(
        {
          error:
            "La app no tiene permisos para escribir en SuVoGa_OS_DB. Comparte el Sheet con la cuenta de servicio configurada.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Error interno al guardar la inscripcion." },
      { status: 500 }
    );
  }
}
