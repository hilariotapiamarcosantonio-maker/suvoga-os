import type { NormalizedInquiry, RegistrationResult } from "@/lib/inquiries/inquiry-types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function valueOrDash(value: string | undefined) {
  return value?.trim() ? value.trim() : "-";
}

function rows(items: [string, string | undefined][]) {
  return items
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;background:#f6efe2;color:#0d3b22">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #eadfca">${escapeHtml(valueOrDash(value))}</td></tr>`
    )
    .join("");
}

export function buildInternalNotificationEmail(
  inquiry: NormalizedInquiry,
  registration: RegistrationResult
) {
  const subject = "Nueva solicitud de orientación — SuVoGa Academia";
  const fields: [string, string | undefined][] = [
    ["Identificador", inquiry.requestId],
    ["Tipo", inquiry.type === "reservation" ? "Reserva de curso" : "Orientación general"],
    ["Nombre", inquiry.name],
    ["Teléfono / WhatsApp", inquiry.phone],
    ["Correo", inquiry.email],
    ["Curso", inquiry.courseName || inquiry.courseId],
    ["Mensaje", inquiry.message],
    ["Fecha y hora", inquiry.createdAt],
    ["Origen", inquiry.originPath],
    ["Paciente", registration.pacienteId],
    ["Inscripción", registration.inscripcionId],
    ["Estado registro", registration.status],
  ];

  const text = fields.map(([label, value]) => `${label}: ${valueOrDash(value)}`).join("\n");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0d3b22;line-height:1.5">
      <h1 style="font-family:Georgia,serif;color:#0d3b22">Nueva solicitud de orientación</h1>
      <p>Se registró una nueva solicitud desde SuVoGa Academia.</p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px">${rows(fields)}</table>
    </div>
  `;

  return { subject, text, html };
}

export function buildUserConfirmationEmail(inquiry: NormalizedInquiry) {
  const subject = "Hemos recibido tu solicitud — SuVoGa Academia";
  const courseLine = inquiry.courseName ? ` sobre ${inquiry.courseName}` : "";
  const text = [
    `Hola ${inquiry.name},`,
    "",
    `Hemos recibido tu solicitud${courseLine}.`,
    "El equipo de SuVoGa Academia revisará tu información y te contactará por los canales proporcionados.",
    "",
    `Identificador de solicitud: ${inquiry.requestId}`,
    "",
    "Gracias por escribirnos.",
  ].join("\n");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0d3b22;line-height:1.6">
      <h1 style="font-family:Georgia,serif;color:#0d3b22">Hemos recibido tu solicitud</h1>
      <p>Hola ${escapeHtml(inquiry.name)},</p>
      <p>Hemos recibido tu solicitud${escapeHtml(courseLine)}. El equipo de SuVoGa Academia revisará tu información y te contactará por los canales proporcionados.</p>
      <p><strong>Identificador:</strong> ${escapeHtml(inquiry.requestId)}</p>
      <p>Gracias por escribirnos.</p>
    </div>
  `;

  return { subject, text, html };
}
