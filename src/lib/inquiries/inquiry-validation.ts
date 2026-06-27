import type { InquiryValidationError, NormalizedInquiry } from "./inquiry-types";

const MAX = {
  name: 80,
  phone: 30,
  email: 120,
  courseId: 80,
  courseName: 160,
  message: 1000,
  cedula: 40,
  provincia: 80,
  originPath: 300,
  submissionId: 120,
};

function cleanText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function normalizeEmail(value: unknown) {
  const email = cleanText(value, MAX.email).toLowerCase();
  if (!email) return "";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

export function normalizePhone(value: unknown) {
  const raw = cleanText(value, MAX.phone);
  if (!raw) return "";
  const digits = raw.replace(/[^\d+]/g, "");
  return digits.slice(0, MAX.phone);
}

function hasValidPhone(value: string) {
  return value.replace(/\D/g, "").length >= 7;
}

function makeRequestId() {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().split("-")[0]
      : Math.random().toString(36).slice(2, 10);
  return `INQ-${Date.now()}-${random}`.toUpperCase();
}

function makeSubmissionId(value: unknown) {
  const provided = cleanText(value, MAX.submissionId);
  return provided || makeRequestId();
}

export function validateInquiryPayload(payload: unknown):
  | { ok: true; inquiry: NormalizedInquiry }
  | { ok: false; errors: InquiryValidationError[] } {
  const data = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const errors: InquiryValidationError[] = [];
  const type = data.type === "reservation" ? "reservation" : "contact";
  const honeypot = cleanText(data.website, 200);

  if (honeypot) {
    errors.push({ field: "website", message: "Solicitud no valida." });
  }

  const name = cleanText(data.name ?? data.nombreCompleto ?? data.nombre, MAX.name);
  const phone = normalizePhone(data.phone ?? data.whatsapp ?? data.telefono ?? data.contacto);
  const email = normalizeEmail(data.email ?? data.correo);
  const rawEmail = cleanText(data.email ?? data.correo, MAX.email);
  const message = cleanText(data.message ?? data.mensaje, MAX.message);
  const courseId = cleanText(data.courseId ?? data.idServicio, MAX.courseId);
  const courseName = cleanText(data.courseName ?? data.curso ?? data.interes, MAX.courseName);
  const cedula = cleanText(data.cedula, MAX.cedula);
  const provincia = cleanText(data.provincia, MAX.provincia);
  const originPath = cleanText(data.originPath ?? data.origen, MAX.originPath);

  const consentPrivacyTerms = Boolean(data.consentPrivacyTerms ?? data.acepto_politicas);
  const consentPromotional = Boolean(data.consentPromotional ?? data.acepto_promociones);
  const policyVersion = cleanText(data.policyVersion ?? data.version_politica, 40) || "2026-06";

  if (!name) errors.push({ field: "name", message: "Escribe tu nombre." });
  if (rawEmail && !email) errors.push({ field: "email", message: "Escribe un correo valido." });
  if (phone && !hasValidPhone(phone)) {
    errors.push({ field: "phone", message: "Escribe un WhatsApp valido." });
  }
  if (!consentPrivacyTerms) {
    errors.push({ field: "consentPrivacyTerms", message: "Debes aceptar la Política de Privacidad y los Términos y Condiciones." });
  }

  if (type === "reservation") {
    if (!courseId) errors.push({ field: "courseId", message: "Selecciona un curso." });
    if (!phone) errors.push({ field: "phone", message: "Escribe tu WhatsApp." });
    if (!cedula) errors.push({ field: "cedula", message: "Escribe tu cedula." });
    if (!provincia) errors.push({ field: "provincia", message: "Escribe tu provincia." });
  } else {
    if (!phone && !email) {
      errors.push({ field: "contact", message: "Escribe un WhatsApp o correo." });
    }
    if (!message) errors.push({ field: "message", message: "Escribe tu mensaje." });
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    inquiry: {
      type,
      requestId: makeRequestId(),
      submissionId: makeSubmissionId(data.submissionId),
      name,
      phone,
      email,
      courseId,
      courseName,
      message,
      cedula,
      provincia,
      originPath,
      createdAt: new Date().toISOString(),
      consentPrivacyTerms,
      consentPromotional,
      policyVersion,
    },
  };
}
