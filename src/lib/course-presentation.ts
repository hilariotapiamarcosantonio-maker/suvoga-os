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

/** Strip markdown emphasis and bullet markers for clean display. */
export function cleanText(value?: string) {
  if (!value) return "";
  return value
    .replace(/^[*✅✔🎗️✨•\s]+/, "")
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

/** Remove header/noise lines and duplicates from an extracted list. */
export function cleanList(items?: string[]) {
  if (!items?.length) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    if (isNoiseLine(raw)) continue;
    const text = cleanText(raw);
    const key = normalizeForCompare(text);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(text);
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
      if (!group) group = { items: [] };
      const item = cleanText(line);
      if (item) group.items.push(item);
    } else {
      // Sub-section heading
      pushGroup();
      group = { heading: cleanText(line), items: [] };
    }
  }
  pushModule();
  return modules;
}
