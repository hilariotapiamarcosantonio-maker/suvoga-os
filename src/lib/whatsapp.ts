// Centralized WhatsApp "concierge" configuration.
//
// The official WhatsApp number is not yet available (see
// src/data/contact.ts: "WhatsApp oficial próximamente" / placeholder
// +1 (809) 000-0000). This module must never construct a wa.me link from
// that placeholder or from any invented number — only from a real number
// supplied via NEXT_PUBLIC_SUVOGA_WHATSAPP.

const DEFAULT_MESSAGE =
  "Hola, deseo recibir orientación sobre los programas de SuVoGa Academia.";

function sanitizeDigits(raw: string) {
  return raw.replace(/[^0-9]/g, "");
}

/**
 * Returns the configured WhatsApp number as digits only (E.164 without "+"),
 * or null when it is missing or implausible (8-15 digits is the valid
 * international range). Never falls back to a placeholder number.
 */
export function getSuvogaWhatsAppNumber(): string | null {
  const raw = process.env.NEXT_PUBLIC_SUVOGA_WHATSAPP?.trim() ?? "";
  if (!raw) return null;
  const digits = sanitizeDigits(raw);
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

function getConfiguredDefaultMessage() {
  return process.env.NEXT_PUBLIC_SUVOGA_WHATSAPP_MESSAGE?.trim() || DEFAULT_MESSAGE;
}

/**
 * Build a wa.me link with a prefilled message. Returns null when no valid
 * number is configured — callers must treat null as "do not render a link".
 */
export function buildWhatsAppLink(message?: string): string | null {
  const number = getSuvogaWhatsAppNumber();
  if (!number) return null;
  const text = encodeURIComponent((message ?? "").trim() || getConfiguredDefaultMessage());
  return `https://wa.me/${number}?text=${text}`;
}

/** Contextual message for a course detail page. */
export function buildCourseWhatsAppMessage(courseName: string) {
  return `Hola, deseo recibir orientación sobre ${courseName}.`;
}
