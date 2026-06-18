// Editorial review registry for SuVoGa course content.
//
// Source course JSON (and especially `sourceRaw`) is never edited. This file
// classifies known content situations so the presentation layer can decide
// what to show, what to fix safely, and what to hold for human confirmation.
// It records ambiguity — it does NOT reinterpret ambiguous data as fact.
//
// See docs/AUDITORIA_CONTENIDO_ACADEMICO.md for the full narrative and
// docs/RECLASIFICACION_CONTENIDO_40_CURSOS.md for the per-field detail.

export type ReviewStatus =
  | "confirmed" // verified correct as-is or via a confirmed override
  | "needs-review" // ambiguous; surfaced for the owner, never invented
  | "hidden-from-presentation"; // contaminated noise that must not render

export type CourseContentReviewEntry = {
  courseId: string;
  status: ReviewStatus;
  /** Short, human-readable note for the owner; no secrets. */
  note: string;
  /** Fields known to carry misclassified/contaminated content. */
  affectedFields?: string[];
};

/**
 * Only the most significant, already-audited situations are listed. Absence
 * from this registry means "no special handling beyond the standard
 * presentation filter" (see src/lib/course-presentation.ts).
 */
export const COURSE_CONTENT_REVIEW: Record<string, CourseContentReviewEntry> = {
  "CUR-005": {
    courseId: "CUR-005",
    status: "needs-review",
    note: "indications y contraindications son idénticas y mezclan '¿Qué aprenderás?' + precios; requiere separación validada por la propietaria.",
    affectedFields: ["indications", "contraindications", "legalNotes"],
  },
  "CUR-006": {
    courseId: "CUR-006",
    status: "needs-review",
    note: "indications y contraindications duplicadas con encabezados administrativos y precios incrustados.",
    affectedFields: ["indications", "contraindications"],
  },
  "CUR-011": {
    courseId: "CUR-011",
    status: "needs-review",
    note: "precio público pendiente de propietaria (pricing.pendingOwnerReview); no se inventa.",
    affectedFields: ["pricing"],
  },
  "CUR-020": {
    courseId: "CUR-020",
    status: "needs-review",
    note: "Curso en draft por decisión editorial; permanece no publicado.",
  },
  "CUR-027": {
    courseId: "CUR-027",
    status: "needs-review",
    note: "Nombre de facilitadora y modalidad incrustados en endorsements; contenido sanitario que requiere validación.",
    affectedFields: ["endorsements", "competencies"],
  },
  "CUR-031": {
    courseId: "CUR-031",
    status: "needs-review",
    note: "Curso en draft; 'Elaborado por' + cargo de directora incrustados en materials.",
    affectedFields: ["materials", "endorsements"],
  },
  "CUR-037": {
    courseId: "CUR-037",
    status: "needs-review",
    note: "Autoría/cargo de facilitadora y frase promocional incrustadas en materials.",
    affectedFields: ["materials"],
  },
  "CUR-038": {
    courseId: "CUR-038",
    status: "needs-review",
    note: "'Elaborado por' + cargo incrustados en materials.",
    affectedFields: ["materials"],
  },
  "CUR-039": {
    courseId: "CUR-039",
    status: "needs-review",
    note: "'Elaborado por' + cargo incrustados en materials.",
    affectedFields: ["materials"],
  },
  "CUR-040": {
    courseId: "CUR-040",
    status: "needs-review",
    note: "Autoría/cargo en materials y posibles cruces materials/certifications.",
    affectedFields: ["materials", "certifications"],
  },
};

export function getCourseContentReview(courseId: string): CourseContentReviewEntry | undefined {
  return COURSE_CONTENT_REVIEW[courseId?.toUpperCase?.()];
}
