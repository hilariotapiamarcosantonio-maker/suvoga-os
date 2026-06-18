const fs = require("node:fs");
const path = require("node:path");

const rootDir = process.cwd();
const coursesDir = path.join(rootDir, "src", "data", "courses");
const expectedSourceIds = [
  "CUR-001",
  "CUR-002",
  "CUR-003",
  "CUR-004",
  "CUR-005",
  "CUR-006",
  "CUR-007",
  "CUR-008",
  "CUR-009",
  "CUR-010",
  "CUR-011",
  "CUR-012",
  "CUR-013",
  "CUR-014",
  "CUR-015",
  "CUR-016",
  "CUR-017",
  "CUR-018",
  "CUR-019",
  "CUR-020",
  "CUR-021",
  "CUR-022",
  "CUR-023",
  "CUR-024",
  "CUR-025",
  "CUR-026",
  "CUR-027",
  "CUR-028",
  "CUR-029",
  "CUR-030",
  "CUR-031",
  "CUR-032",
  "CUR-033",
  "CUR-034",
  "CUR-035",
  "CUR-036",
  "CUR-037",
  "CUR-038",
  "CUR-039",
  "CUR-040",
];

type CourseRecord = {
  courseUid: string;
  sourceId: string;
  legacyIds: string[];
  slug: string;
  requiresOwnerReview: boolean;
  requiresLegalReview: boolean;
  pendingOwnerReview: boolean;
  publicationStatus: string;
  archivedAliases?: Array<{ legacyId: string; publicationStatus: string }>;
  sourceRaw?: {
    heading?: string;
    markdown?: string;
    lineStart?: number;
    lineEnd?: number;
  };
  publicCopy?: {
    title?: string;
    pricing?: {
      publicPrice?: { amount?: number } | null;
      reservation?: { amount?: number } | null;
      pendingOwnerReview?: boolean;
    };
    syllabusMarkdown?: string;
    legalNotes?: string[];
    normalizedMarkdown?: string;
  };
};

const errors: string[] = [];
const warnings: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function warn(message: string) {
  warnings.push(message);
}

function readCourse(fileName: string): CourseRecord {
  return JSON.parse(
    fs.readFileSync(path.join(coursesDir, fileName), "utf8")
  ) as CourseRecord;
}

function hasDuplicates(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

function assertUnique(label: string, values: string[]) {
  const duplicates = Array.from(new Set(hasDuplicates(values)));
  if (duplicates.length > 0) {
    fail(`${label} duplicados: ${duplicates.join(", ")}`);
  }
}

const files: string[] = (fs.readdirSync(coursesDir) as string[])
  .filter((file: string) => /^cur-\d{3}\.json$/.test(file))
  .sort();

const courses: CourseRecord[] = files.map(readCourse);
const sourceIds = courses.map((course) => course.sourceId);

if (courses.length !== 40) {
  fail(`Se esperaban exactamente 40 cursos; encontrados ${courses.length}.`);
}

for (const expectedId of expectedSourceIds) {
  if (!sourceIds.includes(expectedId)) {
    fail(`Falta ${expectedId}.`);
  }
}

for (const sourceId of sourceIds) {
  if (!expectedSourceIds.includes(sourceId)) {
    fail(`sourceId fuera de rango oficial: ${sourceId}.`);
  }
}

assertUnique("sourceId", sourceIds);
assertUnique(
  "courseUid",
  courses.map((course) => course.courseUid)
);
assertUnique(
  "slug",
  courses.map((course) => course.slug)
);

const catalogSource = [
  path.join(rootDir, "src", "data", "courses.ts"),
  path.join(rootDir, "src", "data", "courses", "course-index.ts"),
]
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

if (/CUR-\$\{|\bindex\s*\+\s*1\b|String\(index\s*\+\s*1\)/.test(catalogSource)) {
  fail("Se detecto generacion posicional de IDs en el catalogo.");
}

for (const course of courses) {
  const prefix = course.sourceId;
  if (!course.courseUid || !course.slug) {
    fail(`${prefix}: courseUid y slug son obligatorios.`);
  }

  if (!course.sourceRaw?.markdown || course.sourceRaw.markdown.length < 100) {
    fail(`${prefix}: sourceRaw.markdown ausente o demasiado corto.`);
  }

  if (!course.publicCopy?.normalizedMarkdown) {
    fail(`${prefix}: publicCopy.normalizedMarkdown ausente.`);
  }

  if (!course.publicCopy?.syllabusMarkdown || course.publicCopy.syllabusMarkdown.length < 40) {
    fail(`${prefix}: temario no preservado en publicCopy.syllabusMarkdown.`);
  }

  const textForPublicChecks = JSON.stringify(course.publicCopy);
  if (/\[Categor[ií]a\]|A consultar|Lorem ipsum|placeholder/i.test(textForPublicChecks)) {
    fail(`${prefix}: placeholder publico detectado.`);
  }

  const pricing = course.publicCopy?.pricing;
  if (!pricing?.reservation?.amount) {
    fail(`${prefix}: reservacion ausente.`);
  }

  if (!pricing?.publicPrice?.amount) {
    if (pricing?.pendingOwnerReview && course.pendingOwnerReview) {
      warn(`${prefix}: precio publico pendiente de propietaria; no se invento.`);
    } else {
      fail(`${prefix}: precio publico ausente sin pendingOwnerReview.`);
    }
  }

  if (course.requiresLegalReview && !course.publicCopy?.legalNotes?.length) {
    fail(`${prefix}: curso regulado sin nota legal/profesional.`);
  }
}

const cur008 = courses.find((course) => course.sourceId === "CUR-008");
if (!cur008?.archivedAliases?.some((alias) => alias.legacyId === "CUR-009" && alias.publicationStatus === "archived")) {
  fail("CUR-009 historico Madeoterapia no esta archivado como alias de CUR-008.");
}

const cur012 = courses.find((course) => course.sourceId === "CUR-012");
if (!cur012?.legacyIds.includes("CUR-013")) {
  fail("CUR-013 anterior no apunta a CUR-012 oficial en legacyIds.");
}

for (const reviewId of ["CUR-020", "CUR-031"]) {
  const course = courses.find((item) => item.sourceId === reviewId);
  if (!course) continue;
  if (course.publicationStatus !== "draft") {
    fail(`${reviewId}: debe permanecer como draft.`);
  }
  if (!course.requiresOwnerReview) {
    fail(`${reviewId}: debe requerir revision de propietaria.`);
  }
}

if (sourceIds.includes("CUR-041")) {
  fail("CUR-041 no debe existir.");
}

console.log("Validacion de catalogo SuVoGa Academia");
console.log(`Cursos oficiales: ${courses.length}`);
console.log(`Publicados: ${courses.filter((course) => course.publicationStatus === "published").length}`);
console.log(`Draft/revision: ${courses.filter((course) => course.publicationStatus === "draft").map((course) => course.sourceId).join(", ") || "ninguno"}`);

if (warnings.length > 0) {
  console.log("\nAdvertencias:");
  for (const message of warnings) console.log(`- ${message}`);
}

if (errors.length > 0) {
  console.error("\nErrores:");
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log("\nOK: catalogo validado.");
