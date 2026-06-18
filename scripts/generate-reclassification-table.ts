// Generates docs/RECLASIFICACION_CONTENIDO_40_CURSOS.md from the current
// src/data/courses/cur-*.json files. READ-ONLY with respect to course data —
// it never writes to the JSON files, only to the markdown report.
//
// Run with: node scripts/generate-reclassification-table.ts

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { isNoiseLine } from "../src/lib/course-presentation.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const coursesDir = join(__dirname, "..", "src", "data", "courses");
const outFile = join(__dirname, "..", "docs", "RECLASIFICACION_CONTENIDO_40_CURSOS.md");

type CourseJson = {
  sourceId: string;
  title: string;
  publicationStatus: string;
  requiresLegalReview: boolean;
  publicCopy: {
    profile: string[];
    objectives: string[];
    requirements: string[];
    indications: string[];
    contraindications: string[];
    practices: string[];
    materials: string[];
    competencies: string[];
    certifications: string[];
    endorsements: string[];
    legalNotes: string[];
    professionalNotes: string[];
    facilitator: string;
    pricing: { rawLines: string[]; paymentPlan: string[] };
  };
};

const FACILITATOR_NAME = /sugeidy\s+v[oó]lquez(\s+garc[ií]a)?/i;
const FACILITATOR_TITLE = /\b(directora|fundadora)\s+de\s+suvoga\b/i;
const AUTHORSHIP_PREFIX = /\b(elaborado|impartido|dictado)\s+por\b/i;
const FACILITATOR_LABEL = /\bfacilitador(a)?\s*:/i;
const PRICING_LANGUAGE = /(rd\$|us\$\s?\d|\$\s?\d{2,}|precio\s*:|inversi[oó]n\s*:?\s*(rd\$|\$|\d)|anticipo\s*:|reservaci[oó]n\s*:|miembros?\s+(de\s+)?asnama(s)?tem\s*:?\s*(rd\$|\$|\d))/i;
const PROMOTIONAL_LANGUAGE = /(transforma ingredientes|experiencia(s)? exclusiva|oportunidad de (emprender|negocio)|aumenta tus ingresos|experiencia transformadora|beneficios que te destacan|formando profesionales|aprende, crea y emprende)/i;
const AVAL_CLAIM = /\b(avalad[oa]\s+por|aval(es)?\s+de|certificaci[oó]n\s+avalada)\b/i;
const LEGAL_LANGUAGE = /(no sustituye el diagn[oó]stico|terapia complementaria|consulte a su (m[eé]dico|especialista)|regulad[oa]|marco legal|ejercicio profesional)/i;

function truncate(text: string, max = 140) {
  const t = text.trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

function readCourse(file: string): CourseJson {
  return JSON.parse(readFileSync(join(coursesDir, file), "utf8")) as CourseJson;
}

type Finding = {
  field: string;
  content: string;
  classification: string;
  movesTo: string;
  certainty: "alta" | "media" | "baja";
  needsOwnerValidation: boolean;
};

function scanField(fieldName: string, lines: string[]): Finding[] {
  const findings: Finding[] = [];
  for (const raw of lines) {
    const text = raw.trim();
    if (!text) continue;
    if (FACILITATOR_NAME.test(text) || FACILITATOR_LABEL.test(text) || AUTHORSHIP_PREFIX.test(text)) {
      findings.push({
        field: fieldName,
        content: truncate(text),
        classification: "mover",
        movesTo: "facilitador (nombre/autoría)",
        certainty: "alta",
        needsOwnerValidation: false,
      });
      continue;
    }
    if (FACILITATOR_TITLE.test(text)) {
      findings.push({
        field: fieldName,
        content: truncate(text),
        classification: "mover",
        movesTo: "cargo de facilitadora (campo inexistente hoy)",
        certainty: "alta",
        needsOwnerValidation: true,
      });
      continue;
    }
    if (PRICING_LANGUAGE.test(text)) {
      findings.push({
        field: fieldName,
        content: truncate(text),
        classification: "mover",
        movesTo: "pricing",
        certainty: "alta",
        needsOwnerValidation: false,
      });
      continue;
    }
    if (PROMOTIONAL_LANGUAGE.test(text)) {
      findings.push({
        field: fieldName,
        content: truncate(text),
        classification: "ruido",
        movesTo: "(descartar o reescribir como copy de marketing aparte)",
        certainty: "media",
        needsOwnerValidation: true,
      });
      continue;
    }
    if (AVAL_CLAIM.test(text)) {
      findings.push({
        field: fieldName,
        content: truncate(text),
        classification: "mover",
        movesTo: "avales/certificación",
        certainty: "alta",
        needsOwnerValidation: false,
      });
      continue;
    }
    // Short ALL-CAPS / emoji-headed administrative header leaking into a list
    // (reuses the same heuristic the page renderer applies via isNoiseLine).
    if (isNoiseLine(text)) {
      findings.push({
        field: fieldName,
        content: truncate(text),
        classification: "ruido",
        movesTo: "(descartar — encabezado de documento)",
        certainty: "alta",
        needsOwnerValidation: false,
      });
    }
  }
  return findings;
}

function arraysEqual(a: string[], b: string[]) {
  return a.length > 0 && a.length === b.length && a.every((v, i) => v === b[i]);
}

const files = readdirSync(coursesDir)
  .filter((f) => /^cur-\d{3}\.json$/.test(f))
  .sort();

const sections: string[] = [];

for (const file of files) {
  const course = readCourse(file);
  const pc = course.publicCopy;
  const id = course.sourceId;

  sections.push(`## ${id} — ${course.title}`);
  sections.push("");
  sections.push(
    `Estado: \`${course.publicationStatus}\`${course.requiresLegalReview ? " · requiere revisión legal" : ""}`
  );
  sections.push("");

  // --- Per-line findings (data-quality issues only) ------------------------
  const findings: Finding[] = [
    ...scanField("profile", pc.profile),
    ...scanField("objectives", pc.objectives),
    ...scanField("requirements", pc.requirements),
    ...scanField("indications", pc.indications),
    ...scanField("contraindications", pc.contraindications),
    ...scanField("practices", pc.practices),
    ...scanField("materials", pc.materials),
    ...scanField("competencies", pc.competencies),
    ...scanField("certifications", pc.certifications),
  ];

  if (arraysEqual(pc.indications, pc.contraindications)) {
    findings.unshift({
      field: "indications == contraindications",
      content: truncate(pc.indications.join(" | ")),
      classification: "duplicado",
      movesTo: "separar contenido real de indicaciones vs. contraindicaciones",
      certainty: "alta",
      needsOwnerValidation: true,
    });
  }

  if (findings.length > 0) {
    sections.push("**Contenido mal clasificado detectado:**");
    sections.push("");
    sections.push("| Campo actual | Contenido actual (cita) | Clasificación propuesta | Debe ir a | Certeza | Validar c/ propietaria |");
    sections.push("|---|---|---|---|---|---|");
    for (const f of findings) {
      sections.push(
        `| ${f.field} | ${f.content.replace(/\|/g, "\\|")} | ${f.classification} | ${f.movesTo} | ${f.certainty} | ${f.needsOwnerValidation ? "sí" : "no"} |`
      );
    }
    sections.push("");
  } else {
    sections.push("**Contenido mal clasificado detectado:** ninguno por heurística automática.");
    sections.push("");
  }

  // --- Category summary (the 11 buckets requested) --------------------------
  const promoHits: string[] = [];
  for (const [field, lines] of Object.entries({
    profile: pc.profile,
    objectives: pc.objectives,
    requirements: pc.requirements,
    indications: pc.indications,
    contraindications: pc.contraindications,
    practices: pc.practices,
    materials: pc.materials,
    competencies: pc.competencies,
  })) {
    for (const line of lines) {
      if (PROMOTIONAL_LANGUAGE.test(line)) promoHits.push(`${field}: "${truncate(line, 80)}"`);
    }
  }

  const facilitatorLeaks = findings.filter((f) => f.movesTo.startsWith("facilitador"));
  const cargoLeaks = findings.filter((f) => f.movesTo.startsWith("cargo"));
  const avalLeaks = findings.filter((f) => f.movesTo.startsWith("avales"));
  const pricingLeaks = findings.filter((f) => f.movesTo === "pricing");

  sections.push("**Resumen por categoría:**");
  sections.push("");
  sections.push("| Categoría | Estado actual | Clasificación | Certeza | Validar c/ propietaria |");
  sections.push("|---|---|---|---|---|");
  sections.push(
    `| Facilitadora | campo \`facilitator\`: "${truncate(pc.facilitator || "(vacío)", 60)}"${facilitatorLeaks.length ? `; además filtrada en: ${facilitatorLeaks.map((f) => f.field).join(", ")}` : ""} | ${facilitatorLeaks.length ? "mover (duplicado fuera de campo)" : "correcto"} | ${facilitatorLeaks.length ? "alta" : "alta"} | ${facilitatorLeaks.length ? "no" : "no"} |`
  );
  sections.push(
    `| Cargo | ${cargoLeaks.length ? `detectado embebido en: ${cargoLeaks.map((f) => f.field).join(", ")}` : "no existe campo dedicado; no se encontró cargo embebido"} | pendiente de propietaria | media | sí |`
  );
  sections.push(
    `| Certificación | campo \`certifications\`: ${pc.certifications.length} línea(s)${pc.certifications.length ? ` — ej. "${truncate(pc.certifications[0], 60)}"` : ""} | ${pc.certifications.length ? "correcto (revisar duplicidad con endorsements)" : "ambiguo — sin certifications propio"} | media | ${pc.certifications.length ? "no" : "sí"} |`
  );
  sections.push(
    `| Avales | campo \`endorsements\`: ${pc.endorsements.length} línea(s)${avalLeaks.length ? `; además filtrados en: ${avalLeaks.map((f) => f.field).join(", ")}` : ""} | ${avalLeaks.length ? "mover (duplicado fuera de campo)" : pc.endorsements.length ? "correcto" : "ambiguo"} | media | ${avalLeaks.length ? "no" : "sí"} |`
  );
  sections.push(
    `| Competencias | campo \`competencies\`: ${pc.competencies.length} línea(s) | ${pc.competencies.length ? "correcto" : "pendiente — usa fallback de temario"} | media | ${pc.competencies.length ? "no" : "sí"} |`
  );
  sections.push(
    `| Materiales | campo \`materials\`: ${pc.materials.length} línea(s) | ${pc.materials.length ? "correcto tras filtrado" : "vacío"} | media | no |`
  );
  sections.push(
    `| Indicaciones | campo \`indications\`: ${pc.indications.length} línea(s) | ${arraysEqual(pc.indications, pc.contraindications) ? "duplicado con contraindications" : pc.indications.length ? "correcto tras filtrado" : "vacío"} | media | ${arraysEqual(pc.indications, pc.contraindications) ? "sí" : "no"} |`
  );
  sections.push(
    `| Contraindicaciones | campo \`contraindications\`: ${pc.contraindications.length} línea(s) | ${arraysEqual(pc.indications, pc.contraindications) ? "duplicado con indications" : pc.contraindications.length ? "correcto tras filtrado" : "vacío"} | media | ${arraysEqual(pc.indications, pc.contraindications) ? "sí" : "no"} |`
  );
  sections.push(
    `| Pricing | \`pricing.rawLines\`: ${pc.pricing.rawLines.length} línea(s)${pricingLeaks.length ? `; precio también filtrado fuera de pricing en: ${pricingLeaks.map((f) => f.field).join(", ")}` : ""} | ${pricingLeaks.length ? "duplicado fuera de pricing" : "correcto"} | alta | ${pricingLeaks.length ? "no" : "no"} |`
  );
  sections.push(
    `| Notas legales | campo \`legalNotes\`: ${pc.legalNotes.length} línea(s)${pc.legalNotes.some((l) => LEGAL_LANGUAGE.test(l)) ? "" : pc.legalNotes.length ? " (sin lenguaje legal reconocible)" : ""} | ${pc.legalNotes.length === 0 ? "vacío" : pc.legalNotes.some((l) => LEGAL_LANGUAGE.test(l)) ? "correcto" : "pendiente legal"} | media | ${pc.legalNotes.some((l) => LEGAL_LANGUAGE.test(l)) ? "no" : "sí"} |`
  );
  sections.push(
    `| Frases promocionales | ${promoHits.length ? promoHits.join("; ") : "sin hallazgos"} | ${promoHits.length ? "ruido" : "correcto"} | media | ${promoHits.length ? "sí" : "no"} |`
  );
  sections.push("");
  sections.push("---");
  sections.push("");
}

const header = `# Reclasificación de contenido — 40 cursos SuVoGa Academia

Generado automáticamente por \`scripts/generate-reclassification-table.ts\` a partir de
\`src/data/courses/cur-001.json\`…\`cur-040.json\`. **No modifica los JSON fuente.**

Este documento es un insumo para validación de la propietaria, siguiendo el proceso de
\`mh-content-information-design\`: extraer sin editar, clasificar, señalar ambigüedades sin
resolverlas unilateralmente. Ningún dato se reescribe aquí — solo se identifica dónde está
y a dónde debería moverse, con su nivel de certeza.

Clasificaciones usadas: \`correcto\`, \`mover\`, \`duplicado\`, \`ruido\`, \`ambiguo\`,
\`pendiente de propietaria\`, \`pendiente legal\`.

---

`;

writeFileSync(outFile, header + sections.join("\n"), "utf8");
console.log(`Generado: ${outFile}`);
console.log(`${files.length} cursos procesados.`);
