// Single source of truth for SuVoGa Academia's official, owner-approved
// public contact channels. Do NOT scatter the phone number or email across
// components — import from here.
//
// These values are explicitly authorized by the owner to appear publicly and
// to ship in production. Environment variables may override them (e.g. for a
// staging number), but production works correctly even with no env var set.
// Only these approved values are allowed — never invent other phones, emails,
// addresses, social handles, or hours.

/** Human-readable phone number, as shown to visitors. */
const OFFICIAL_PHONE_DISPLAY = "829-838-9185";

/** International number, digits only, for wa.me links (no "+", spaces or dashes). */
const OFFICIAL_WHATSAPP_NUMBER = "18298389185";

/** Official academy email. */
const OFFICIAL_EMAIL = "asnamatem@gmail.com";

/** Default WhatsApp message when no course context is available. */
const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, deseo recibir orientación sobre los programas de SuVoGa Academia.";

function sanitizeDigits(raw: string) {
  return raw.replace(/[^0-9]/g, "");
}

/**
 * Resolve the WhatsApp number (digits only). Prefers an env override when it
 * is a plausible international number (8–15 digits); otherwise falls back to
 * the official approved number so production always works.
 */
export function getWhatsAppNumber(): string {
  const override = process.env.NEXT_PUBLIC_SUVOGA_WHATSAPP?.trim();
  if (override) {
    const digits = sanitizeDigits(override);
    if (digits.length >= 8 && digits.length <= 15) return digits;
  }
  return OFFICIAL_WHATSAPP_NUMBER;
}

/** Email address, with optional env override. */
export function getEmail(): string {
  return process.env.NEXT_PUBLIC_SUVOGA_EMAIL?.trim() || OFFICIAL_EMAIL;
}

/** Default (non-course) WhatsApp message, with optional env override. */
export function getDefaultWhatsAppMessage(): string {
  return process.env.NEXT_PUBLIC_SUVOGA_WHATSAPP_MESSAGE?.trim() || DEFAULT_WHATSAPP_MESSAGE;
}

/** Contextual WhatsApp message mentioning a specific course by its real name. */
export function buildCourseWhatsAppMessage(courseName: string): string {
  return `Hola, deseo recibir orientación sobre el curso ${courseName}.`;
}

/**
 * Build a wa.me link with a correctly URL-encoded prefilled message. Uses the
 * default message when none is provided.
 */
export function buildWhatsAppLink(message?: string): string {
  const text = encodeURIComponent((message ?? "").trim() || getDefaultWhatsAppMessage());
  return `https://wa.me/${getWhatsAppNumber()}?text=${text}`;
}

/** Centralized public contact object for display in UI. */
export const suvogaContact = {
  phoneDisplay: OFFICIAL_PHONE_DISPLAY,
  whatsappNumber: getWhatsAppNumber(),
  email: getEmail(),
} as const;
