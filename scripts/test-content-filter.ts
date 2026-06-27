// Manual regression check for the authority/pricing/marketing noise filter in
// src/lib/course-presentation.ts. Run with: node scripts/test-content-filter.ts
//
// This script does NOT modify any JSON data — it only reads the source files
// and runs them through the same cleanList()/parseSyllabusModules() helpers
// the course page uses, then asserts that known-bad lines never reach the
// "competencies / materials / benefits / topics / results" output.

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  areEquivalentLists,
  cleanList,
  isAuthorityOrPricingNoise,
  parseSyllabusModules,
  withoutExactDuplicates,
} from "../src/lib/course-presentation.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const coursesDir = join(__dirname, "..", "src", "data", "courses");

type CourseJson = {
  sourceId: string;
  publicCopy: {
    materials: string[];
    practices: string[];
    indications: string[];
    contraindications: string[];
    competencies: string[];
    profile: string[];
    objectives: string[];
    syllabusMarkdown: string;
  };
};

function readCourse(sourceId: string): CourseJson {
  const file = join(coursesDir, `${sourceId.toLowerCase()}.json`);
  return JSON.parse(readFileSync(file, "utf8")) as CourseJson;
}

const FORBIDDEN_PATTERNS: { name: string; test: (s: string) => boolean }[] = [
  { name: "facilitator name", test: (s) => /sugeidy\s+v[oó]lquez/i.test(s) },
  { name: "facilitator title", test: (s) => /directora\s+de\s+suvoga/i.test(s) },
  { name: "authorship prefix", test: (s) => /\belaborado\s+por\b/i.test(s) },
  { name: "pricing (RD$/US$/$ figure)", test: (s) => /(rd\$|us\$\s?\d|\$\s?\d{2,})/i.test(s) },
  { name: "promotional copy", test: (s) => /(transforma ingredientes|aumenta tus ingresos|experiencia transformadora|formando profesionales)/i.test(s) },
];

let failures = 0;
let checks = 0;

function assertClean(label: string, items: string[]) {
  checks += 1;
  const offenders: string[] = [];
  for (const item of items) {
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(item)) {
        offenders.push(`[${pattern.name}] "${item}"`);
      }
    }
  }
  if (offenders.length > 0) {
    failures += 1;
    console.error(`FAIL ${label}: found ${offenders.length} forbidden line(s):`);
    for (const o of offenders) console.error(`  - ${o}`);
  } else {
    console.log(`OK   ${label} (${items.length} item(s), all clean)`);
  }
}

function assertNotEmpty(label: string, items: string[], minLength: number) {
  checks += 1;
  if (items.length < minLength) {
    failures += 1;
    console.error(
      `FAIL ${label}: expected at least ${minLength} legitimate item(s) to survive filtering, got ${items.length}.`
    );
  } else {
    console.log(`OK   ${label} kept ${items.length} legitimate item(s) (>= ${minLength}).`);
  }
}

const affectedCourses = ["CUR-005", "CUR-006", "CUR-027", "CUR-031", "CUR-037", "CUR-038", "CUR-039", "CUR-040"];

for (const sourceId of affectedCourses) {
  const course = readCourse(sourceId);
  const pc = course.publicCopy;
  console.log(`\n--- ${sourceId} ---`);

  assertClean(`${sourceId} materials`, cleanList(pc.materials, "materials"));
  assertClean(`${sourceId} practices/benefits`, cleanList(pc.practices, "benefits"));
  assertClean(`${sourceId} indications`, cleanList(pc.indications, "indications"));
  assertClean(`${sourceId} contraindications`, cleanList(pc.contraindications, "contraindications"));
  assertClean(`${sourceId} competencies`, cleanList(pc.competencies, "competencies"));

  const modules = parseSyllabusModules(pc.syllabusMarkdown);
  const allTopicLines = modules.flatMap((m) => m.groups.flatMap((g) => g.items));
  assertClean(`${sourceId} syllabus topics`, allTopicLines);
}

// CUR-005 / CUR-006: indications and contraindications were identical blobs
// mixing real content with a "¿QUÉ APRENDERÁS?" header and pricing lines.
// After filtering, real technique mentions should still surface.
assertNotEmpty(
  "CUR-005 indications retains real content after stripping header/pricing",
  cleanList(readCourse("CUR-005").publicCopy.indications, "indications"),
  1
);
assertNotEmpty(
  "CUR-006 indications retains real content after stripping header/pricing",
  cleanList(readCourse("CUR-006").publicCopy.indications, "indications"),
  1
);

// CUR-031/037/038/039/040: "materials" contained "Elaborado por:" + the
// facilitator's name + her title + promotional copy. The legitimate
// "incluido" items must survive while that block disappears.
for (const sourceId of ["CUR-031", "CUR-037", "CUR-038", "CUR-039", "CUR-040"]) {
  assertNotEmpty(
    `${sourceId} materials retains legitimate "incluye" items`,
    cleanList(readCourse(sourceId).publicCopy.materials, "materials"),
    1
  );
}

// Exact cross-field duplicates are removed only in presentation. Semantic
// near-duplicates are deliberately preserved for owner validation.
const exactPreferred = ["Manual digital ilustrado"];
const exactMixed = ["Manual digital ilustrado", "Guía de trabajo"];
const exactResult = withoutExactDuplicates(exactMixed, exactPreferred);
checks += 1;
if (exactResult.length !== 1 || exactResult[0] !== "Guía de trabajo") {
  failures += 1;
  console.error("FAIL: exact cross-field duplicate was not removed predictably.");
} else {
  console.log("OK   exact cross-field duplicate removed in presentation.");
}

checks += 1;
if (!areEquivalentLists(["Indicaciones"], ["indicaciones"])) {
  failures += 1;
  console.error("FAIL: equivalent duplicate lists were not recognized.");
} else {
  console.log("OK   equivalent duplicate lists recognized.");
}

// Sanity check: a genuine certification/endorsement claim must still render
// inside its own rightful section (context-aware allow-listing).
const avalLine = "Avalado por la Asociación Nacional de Masajistas Terapeutas Manuales y Afines (ASNAMATEM).";
if (isAuthorityOrPricingNoise(avalLine, "certifications")) {
  failures += 1;
  console.error("FAIL: a legitimate aval/certification line was blocked inside the certifications context.");
} else {
  console.log('OK   aval/certification line is allowed through inside context="certifications".');
}
if (!isAuthorityOrPricingNoise(avalLine, "materials")) {
  failures += 1;
  console.error("FAIL: an aval/certification claim leaking into materials was NOT blocked.");
} else {
  console.log('OK   the same aval/certification line is blocked inside context="materials".');
}

console.log(`\n${checks} check group(s) run, ${failures} failing.`);
if (failures > 0) {
  process.exit(1);
}
console.log("OK: content filter regression checks passed.");
