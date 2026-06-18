import type { SuvogaServicio } from "@/lib/crm-data/get-suvoga-data";

/** Format a number as Dominican Peso currency. */
export function formatDop(value: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function priceLabel(value: number) {
  return value > 0 ? formatDop(value) : "";
}

/**
 * Remove a leading "Label:" prefix (e.g. "Duración: 8 horas" -> "8 horas")
 * and surrounding markdown emphasis, without altering the underlying data.
 */
export function cleanLabeledValue(value?: string) {
  if (!value) return "";
  let text = value.trim().replace(/^\*+|\*+$/g, "").trim();
  const colon = text.indexOf(":");
  if (colon > -1 && colon <= 18) {
    text = text.slice(colon + 1).trim();
  }
  return text;
}

// Leading glyphs observed in the source documents that should be stripped
// before display (avoids the Unicode property-escape regex flag, which this
// project's TypeScript target does not support).
const LEADING_GLYPHS = "*✅✔✨•📖🎓💰🔒💚🍇🍫☕🧖🏅📘👐🔒🎗";

// Markers that, in the contaminated `duracion` field, signal where the real
// duration text ends and other (misclassified) data begins.
const DURATION_CONTAMINANTS = /\b(nivel|modalidad|facilitador|elaborado|inversi[oó]n|precio|anticipo|reservaci[oó]n|miembros)\b/i;

/**
 * Extract a clean, display-safe duration from the (sometimes contaminated)
 * `duracion` field — e.g. "Modalidad: Teórico Duración: 6 a 8 Horas Nivel:
 * Básico Facilitadora: ..." -> "6 a 8 Horas". Never mutates the source data.
 * Returns "" when no real duration phrase is present, so callers can omit the
 * field rather than render leaked facilitator/price text in the hero or card.
 */
export function courseDurationText(value?: string) {
  if (!value) return "";
  const raw = `${value}`;
  const match = raw.match(/duraci[oó]n:?\s*(.+)/i);
  if (!match) return "";
  // Cut at the first contaminant marker that follows the duration.
  const cut = match[1].split(DURATION_CONTAMINANTS)[0];
  const text = cleanText(cut).replace(/[–\-,;:]\s*$/, "").trim();
  if (!text || isAuthorityOrPricingNoise(text)) return "";
  return text;
}

/** Strip markdown emphasis and bullet markers for clean display. */
export function cleanText(value?: string) {
  if (!value) return "";
  const escaped = LEADING_GLYPHS.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const leadingPattern = new RegExp(`^[${escaped}\\s]+`);
  return value
    .replace(leadingPattern, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .trim();
}

/** Extract the largest hour figure for sorting by duration. */
export function durationHours(course: SuvogaServicio) {
  const text = `${course.duracion ?? ""}`.toLowerCase();
  const hourTokens = text.match(/\d+\s*(?:horas?|hrs?|h)\b/g);
  if (hourTokens && hourTokens.length) {
    return Math.max(...hourTokens.map((t) => parseInt(t, 10)));
  }
  const classTokens = text.match(/\d+\s*clases?/g);
  if (classTokens && classTokens.length) {
    return Math.max(...classTokens.map((t) => parseInt(t, 10) * 5));
  }
  return 0;
}

export function courseCategory(course: SuvogaServicio) {
  const value = (course.category || "").trim();
  if (!value || value.toLowerCase().includes("categor")) return "General";
  return value;
}

/** A short, clean modality keyword for filtering. */
export function courseModality(course: SuvogaServicio) {
  const raw = cleanLabeledValue(course.modalidad).toLowerCase();
  if (!raw) return "Por definir";
  if (raw.includes("online") && raw.includes("presencial")) return "Presencial y Online";
  if (raw.includes("online") || raw.includes("virtual")) return "Online";
  if (raw.includes("teó") || raw.includes("teo")) return "Teórico-Práctico";
  if (raw.includes("práctic") || raw.includes("practic")) return "Práctico presencial";
  if (raw.includes("presencial")) return "Presencial";
  return "Presencial";
}

export type DurationBucket = "Corta" | "Media" | "Extensa";

export function durationBucket(course: SuvogaServicio): DurationBucket {
  const hours = durationHours(course);
  if (hours <= 0) return "Media";
  if (hours <= 8) return "Corta";
  if (hours <= 20) return "Media";
  return "Extensa";
}

/** Resolve the hero/card image for a course. */
export function courseImage(course: SuvogaServicio) {
  if (course.imagen_url) return course.imagen_url;
  const idNum = Number((course.sourceId || course.idServicio).replace("CUR-", ""));
  if (idNum >= 18 && idNum <= 25) return `/images/courses/cur-${String(idNum).padStart(3, "0")}.svg`;
  if (idNum > 25) return "/images/courses/cur-025.svg";
  return `/images/courses/cur-${String(idNum).padStart(3, "0")}.png`;
}

export function courseHref(course: Pick<SuvogaServicio, "slug" | "idServicio">) {
  return `/curso/${course.slug || course.idServicio}`;
}

/** Extract a YouTube video id from full, short, embed or bare-id inputs. */
export function youTubeId(url?: string): string | null {
  if (!url) return null;
  const value = url.trim();
  if (!value) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  try {
    const parsed = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = parsed.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = parsed.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed" || p === "shorts" || p === "v");
      if (idx > -1 && parts[idx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[idx + 1])) {
        return parts[idx + 1];
      }
    }
  } catch {
    return null;
  }
  return null;
}

/** Curated featured slugs; falls back to first N when missing. */
const FEATURED_SLUGS = [
  "master-en-drenaje-linfatico-curso-avanzado",
  "diplomado-de-masaje-corporal",
  "taller-de-aparatologia-9-en-1",
  "taller-de-kinesiotape",
  "curso-de-cosmetologia-profesional",
  "taller-de-masaje-tailandes",
];

export function selectFeatured(courses: SuvogaServicio[], count = 6) {
  const bySlug = new Map(courses.map((c) => [c.slug, c]));
  const picked: SuvogaServicio[] = [];
  for (const slug of FEATURED_SLUGS) {
    const found = bySlug.get(slug);
    if (found && !picked.includes(found)) picked.push(found);
  }
  for (const course of courses) {
    if (picked.length >= count) break;
    if (!picked.includes(course)) picked.push(course);
  }
  return picked.slice(0, count);
}

// ---------------------------------------------------------------------------
// List cleaning: the extracted publicCopy arrays sometimes include section
// headers ("OBJETIVO GENERAL", "INCLUYE", "MÓDULO II: ...") mixed with real
// items. These helpers drop the headers for display without altering data.
// ---------------------------------------------------------------------------

const HEADER_LINES = new Set([
  "objetivo",
  "objetivo general",
  "temario",
  "incluye",
  "indicaciones",
  "contraindicaciones",
  "competencias",
  "competencias que adquirira el participante",
  "certificacion",
  "certificación",
  "materiales",
  "beneficios",
  "taller practico",
  "taller práctico",
  "correccion de tecnicas",
  "corrección de técnicas",
  "evaluacion practica final",
  "elaborado por:",
]);

function normalizeForCompare(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function isNoiseLine(value: string) {
  const text = cleanText(value);
  if (!text) return true;
  if (/^m[óo]dulo\b/i.test(text)) return true;
  const normalized = normalizeForCompare(text).replace(/[.:]+$/, "");
  if (HEADER_LINES.has(normalized)) return true;
  // Short all-caps standalone headings (e.g. "ANATOMÍA APLICADA")
  const words = text.split(/\s+/);
  if (words.length <= 4 && text === text.toUpperCase() && /[A-ZÁÉÍÓÚÑ]/.test(text)) {
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Authority / pricing / marketing noise filter
//
// The source `publicCopy` arrays were extracted from raw course documents
// and sometimes mix in content that belongs to a different part of the
// course record: the facilitator's name and title, pricing figures,
// promotional copy, administrative section headers, or schedule details.
// Showing that text under "Competencias", "Materiales", "Beneficios",
// "Temario" or "Resultados" misrepresents who created/teaches the course and
// inflates content that is not actually a learning outcome.
//
// IMPORTANT — this filter never edits the underlying data:
//   - `src/data/courses/*.json` and `sourceRaw` are not touched.
//   - It only decides whether a given line is rendered inside a specific
//     result list, based on which field it is destined for (`context`).
//   - A line legitimately describing certification/avales IS allowed through
//     when the context itself is "certifications" or "endorsements" — those
//     are this content's rightful home. The same line is blocked when it
//     would otherwise render under competencies/materials/benefits/topics.
//
// Rule set (documented per acceptance criteria):
//   1. FACILITATOR_NAME    — the facilitator's proper name, in any spelling
//                            variant seen in the source data ("Sugeidy
//                            Vólquez García" / "Sugeidy Volquez").
//   2. FACILITATOR_TITLE   — her role/title ("Directora de SuVoGa...").
//   3. AUTHORSHIP_PREFIX   — "Elaborado por:", "Impartido por:", "Dictado
//                            por:" lines (authorship, not a competency).
//   4. FACILITATOR_LABEL   — a line that is literally the label
//                            "Facilitador(a):" with or without the name.
//   5. ADMIN_HEADER        — administrative/document headers that leaked
//                            into a list ("CUR-003", "Categoría Actual:",
//                            "Beneficios del Diplomado", "Fecha y horario").
//   6. PRICING_LANGUAGE    — explicit price/anticipo/reservation figures
//                            (allowed only when context === "pricing", i.e.
//                            the payment-plan list itself).
//   7. PROMOTIONAL_LANGUAGE— marketing/emotional copy ("Transforma
//                            ingredientes...", "Aumenta tus ingresos...").
//   8. AVAL_CLAIM          — an institutional endorsement/certification
//                            claim ("Avalado por ASNAMATEM...", "Miembros
//                            ASNaMaTeM: $X"). Allowed only when context is
//                            "certifications" or "endorsements" or "pricing".
// ---------------------------------------------------------------------------

export type CourseListContext =
  | "competencies"
  | "materials"
  | "benefits"
  | "topics"
  | "results"
  | "indications"
  | "contraindications"
  | "profile"
  | "requirements"
  | "certifications"
  | "endorsements"
  | "pricing"
  | "default";

const FACILITATOR_NAME = /sugeidy\s+v[oó]lquez(\s+garc[ií]a)?/i;
const FACILITATOR_TITLE = /\b(directora|fundadora)\s+de\s+suvoga\b/i;
const AUTHORSHIP_PREFIX = /^\s*(elaborado|impartido|dictado)\s+por\b/i;
const FACILITATOR_LABEL = /^\s*facilitador(a)?\s*:/i;
const ADMIN_HEADER = /^(cur-\d{3}\b|categor[ií]a actual\s*:?$|beneficios del diplomado\s*:?$|fecha y horario\s*:?$|t[eé]cnicas y protocolos para trabajar\s*:?$|\d{1,2}:\d{2}\s*(am|pm)\s*a\s*\d{1,2}:\d{2}\s*(am|pm)$)/i;
const PRICING_LANGUAGE = /(rd\$|us\$\s?\d|\$\s?\d{2,}|precio\s*:|inversi[oó]n\s*:?\s*(rd\$|\$|\d)|anticipo\s*:|reservaci[oó]n\s*:|miembros?\s+(de\s+)?asnama(s)?tem\s*:?\s*(rd\$|\$|\d))/i;
const PROMOTIONAL_LANGUAGE = /(transforma ingredientes|experiencia(s)? exclusiva|oportunidad de (emprender|negocio)|aumenta tus ingresos|experiencia transformadora|beneficios que te destacan|formando profesionales)/i;
const AVAL_CLAIM = /\b(avalad[oa]\s+por|aval(es)?\s+de|certificaci[oó]n\s+avalada)\b/i;

/**
 * Detect a line that belongs to authorship, the facilitator's identity,
 * pricing, marketing, or an administrative header — content that should
 * never render as a competency, material, benefit, topic, or result, even
 * though it remains untouched in the source JSON. See rule set above.
 */
export function isAuthorityOrPricingNoise(
  value: string,
  context: CourseListContext = "default"
) {
  const text = cleanText(value);
  if (!text) return false;
  if (FACILITATOR_NAME.test(text)) return true;
  if (FACILITATOR_TITLE.test(text)) return true;
  if (AUTHORSHIP_PREFIX.test(text)) return true;
  if (FACILITATOR_LABEL.test(text)) return true;
  if (ADMIN_HEADER.test(text)) return true;
  if (context !== "pricing" && PRICING_LANGUAGE.test(text)) return true;
  if (PROMOTIONAL_LANGUAGE.test(text)) return true;
  if (
    AVAL_CLAIM.test(text) &&
    context !== "certifications" &&
    context !== "endorsements" &&
    context !== "pricing"
  ) {
    return true;
  }
  return false;
}

/**
 * Remove header/noise lines, duplicates, and misclassified
 * authorship/pricing/marketing content from an extracted list. `context`
 * identifies which section the list is being rendered into, so a line can
 * be allowed in its rightful section (e.g. an aval mention inside
 * "certifications") while still being blocked everywhere else.
 */
export function cleanList(items?: string[], context: CourseListContext = "default") {
  if (!items?.length) return [];
  const seen = new Set<string>();
  const out: string[] = [];

  const pushIfValid = (raw: string) => {
    if (isNoiseLine(raw)) return;
    if (isAuthorityOrPricingNoise(raw, context)) return;
    const text = cleanText(raw);
    if (!text) return;
    const key = normalizeForCompare(text);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(text);
  };

  for (const raw of items) {
    // Some extracted entries cram a header + several real items + a stray
    // pricing line into a single "•"-separated string (e.g. CUR-005). Split
    // on the bullet so each fragment can be judged on its own merits instead
    // of discarding (or keeping) the whole blob as one unit.
    const segments = raw.includes("•")
      ? raw.split("•").map((s) => s.trim()).filter(Boolean)
      : [raw];
    for (const segment of segments) pushIfValid(segment);
  }

  return out;
}

// ---------------------------------------------------------------------------
// Syllabus parsing: turn the source markdown temario into structured modules
// without losing any of the original micro-detail.
// ---------------------------------------------------------------------------

export type SyllabusGroup = { heading?: string; items: string[] };
export type SyllabusModule = {
  id: string;
  number: string;
  title: string;
  groups: SyllabusGroup[];
  itemCount: number;
};

const MODULE_RE = /^m[óo]dulo\s+([ivxlcdm0-9]+)\s*[:.\-–]?\s*(.*)$/i;
const ROMAN: Record<string, number> = { i: 1, v: 5, x: 10, l: 50, c: 100 };

function romanToNumber(value: string) {
  const s = value.toLowerCase();
  if (/^\d+$/.test(s)) return Number(s);
  let total = 0;
  for (let i = 0; i < s.length; i += 1) {
    const cur = ROMAN[s[i]] ?? 0;
    const next = ROMAN[s[i + 1]] ?? 0;
    total += cur < next ? -cur : cur;
  }
  return total || 0;
}

/**
 * Parse the temario markdown into modules. Lines starting with "*" are items;
 * non-bullet, non-module lines act as sub-section headings within a module.
 */
export function parseSyllabusModules(markdown?: string): SyllabusModule[] {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const modules: SyllabusModule[] = [];
  let current: SyllabusModule | null = null;
  let group: SyllabusGroup | null = null;

  const pushGroup = () => {
    if (current && group && group.items.length) current.groups.push(group);
    group = null;
  };
  const pushModule = () => {
    pushGroup();
    if (current) {
      current.itemCount = current.groups.reduce((sum, g) => sum + g.items.length, 0);
      if (current.itemCount > 0 || current.title) modules.push(current);
    }
    current = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line === "---" || line === "***") continue;
    if (/^temario\b/i.test(line)) continue;

    const moduleMatch = line.match(MODULE_RE);
    if (moduleMatch) {
      pushModule();
      const num = romanToNumber(moduleMatch[1]);
      current = {
        id: `modulo-${modules.length + 1}`,
        number: num ? String(num) : String(modules.length + 1),
        title: cleanText(moduleMatch[2]) || `Módulo ${num || modules.length + 1}`,
        groups: [],
        itemCount: 0,
      };
      group = null;
      continue;
    }

    if (!current) {
      current = { id: "modulo-1", number: "1", title: "Contenido del programa", groups: [], itemCount: 0 };
    }

    if (line.startsWith("*") || line.startsWith("•") || /^✅|^✔/.test(line)) {
      if (isAuthorityOrPricingNoise(line, "topics")) continue;
      if (!group) group = { items: [] };
      const item = cleanText(line);
      if (item) group.items.push(item);
    } else {
      if (isAuthorityOrPricingNoise(line, "topics")) continue;
      // Sub-section heading
      pushGroup();
      group = { heading: cleanText(line), items: [] };
    }
  }
  pushModule();
  return modules;
}
