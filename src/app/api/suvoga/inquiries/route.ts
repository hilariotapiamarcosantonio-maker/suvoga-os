import { NextResponse } from "next/server";
import { academyConfig } from "@/config/academy.config";
import {
  getCatalogo,
  postInscripcion,
  postPaciente,
} from "@/lib/crm-data/get-suvoga-data";
import { sendInquiryNotification, summarizeEmailWorkflow } from "@/lib/email/send-inquiry-notification";
import { createReservationCalendarEvent } from "@/lib/google-calendar";
import type { NormalizedInquiry, RegistrationResult } from "@/lib/inquiries/inquiry-types";
import { checkInquiryRateLimit, markSubmissionProcessed, wasSubmissionProcessed } from "@/lib/inquiries/rate-limit";
import { validateInquiryPayload } from "@/lib/inquiries/inquiry-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

function todayInAcademyTimezone() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: academyConfig.timezone,
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

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function buildNote(inquiry: NormalizedInquiry) {
  const parts = [
    `Solicitud ${inquiry.requestId}`,
    `Tipo ${inquiry.type}`,
    `Correo ${inquiry.email || "no provisto"}`,
    `Curso ${inquiry.courseName || inquiry.courseId || "no especificado"}`,
    `Mensaje ${inquiry.message || "sin mensaje adicional"}`,
    `Origen ${inquiry.originPath || "no disponible"}`,
    `Fecha ${inquiry.createdAt}`,
  ];

  if (inquiry.consentPrivacyTerms) {
    parts.push(`Consentimiento Políticas: Aceptado (Versión: ${inquiry.policyVersion || "2026-06"})`);
  }
  if (inquiry.consentPromotional !== undefined) {
    parts.push(`Consentimiento Promocional: ${inquiry.consentPromotional ? "Aceptado" : "Rechazado"}`);
  }

  return parts.join(" | ");
}

async function registerInquiry(inquiry: NormalizedInquiry): Promise<RegistrationResult> {
  const note = buildNote(inquiry);
  const origenRegistro = inquiry.type === "reservation" ? "web-reservation" : "web-contact";

  if (inquiry.type === "reservation") {
    const catalogo = await getCatalogo();
    const servicio = catalogo.find((item) => item.idServicio === inquiry.courseId);

    if (!servicio) {
      throw Object.assign(new Error("El servicio seleccionado no existe en el catalogo."), {
        status: 404,
      });
    }

    const paciente = await postPaciente({
      nombreCompleto: inquiry.name,
      whatsapp: inquiry.phone,
      correo: inquiry.email,
      cedula: inquiry.cedula,
      provincia: inquiry.provincia,
      origenRegistro,
      notaInterna: note,
    });

    const result = await postInscripcion({
      idPaciente: paciente.idPaciente,
      idServicio: servicio.idServicio,
      fechaProgramada: todayInAcademyTimezone(),
      estadoAsistencia: "Inscrito",
      montoPagado: 0,
      balancePendiente: Number(servicio.montoAnticipo),
      metodoPago: "",
      estadoPago: "Anticipo pendiente",
      origenRegistro,
      notaInterna: note,
    });

    return {
      status: "registered",
      storage: "google-sheets",
      pacienteId: paciente.idPaciente,
      inscripcionId: result.inscripcion.idInscripcion,
      anticipoEstado: result.anticipo.estadoPago,
      fechaProgramada: result.inscripcion.fechaProgramada,
    };
  }

  const paciente = await postPaciente({
    nombreCompleto: inquiry.name,
    whatsapp: inquiry.phone || inquiry.email,
    correo: inquiry.email,
    cedula: "",
    provincia: "",
    origenRegistro,
    notaInterna: note,
  });

  return {
    status: "registered",
    storage: "google-sheets",
    pacienteId: paciente.idPaciente,
  };
}

export async function POST(request: Request) {
  const rateLimit = checkInquiryRateLimit(clientIp(request));
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta nuevamente en unos minutos." },
      {
        status: 429,
        headers: {
          ...NO_STORE_HEADERS,
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const payload = await request.json();
    const validation = validateInquiryPayload(payload);

    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.errors[0]?.message || "Solicitud invalida.", errors: validation.errors },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    const { inquiry } = validation;
    if (wasSubmissionProcessed(inquiry.submissionId)) {
      return NextResponse.json(
        {
          success: true,
          duplicate: true,
          requestId: inquiry.requestId,
          calendar: { status: "skipped" },
          message: "Solicitud ya recibida. No se duplico el registro.",
        },
        { headers: NO_STORE_HEADERS }
      );
    }

    const registration = await registerInquiry(inquiry);
    markSubmissionProcessed(inquiry.submissionId);

    const calendar =
      inquiry.type === "reservation" && registration.inscripcionId && registration.fechaProgramada
        ? await createReservationCalendarEvent({
            courseName: inquiry.courseName || inquiry.courseId,
            fechaProgramada: registration.fechaProgramada,
            inscripcionId: registration.inscripcionId,
            studentName: inquiry.name,
            whatsapp: inquiry.phone,
            email: inquiry.email,
            provincia: inquiry.provincia,
            anticipoEstado: registration.anticipoEstado || "no disponible",
          })
        : { status: "skipped" as const };

    const email = await sendInquiryNotification(inquiry, registration);
    const message = summarizeEmailWorkflow(email);
    const status = email.notification.status === "failed" || email.notification.status === "skipped" ? 202 : 200;

    return NextResponse.json(
      {
        success: true,
        requestId: inquiry.requestId,
        registration,
        calendar,
        email,
        message,
      },
      { status, headers: NO_STORE_HEADERS }
    );
  } catch (error) {
    const maybeStatus =
      typeof error === "object" && error && "status" in error
        ? Number((error as { status?: unknown }).status)
        : 0;

    if (maybeStatus === 404) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Recurso no encontrado." },
        { status: 404, headers: NO_STORE_HEADERS }
      );
    }

    console.error("Error creating SuVoGa inquiry:", {
      status: maybeStatus || undefined,
    });

    if (isGooglePermissionError(error)) {
      return NextResponse.json(
        {
          error: "No se pudo registrar la solicitud en este momento.",
        },
        { status: 403, headers: NO_STORE_HEADERS }
      );
    }

    return NextResponse.json(
      { error: "Error interno al registrar la solicitud." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
