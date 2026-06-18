import type { SuvogaServicio } from "@/lib/crm-data/get-suvoga-data";
import {
  findCourseByLegacyId,
  findCourseByPublicIdentifier,
  officialCourseCatalog,
  publicCourseCatalog,
  type CourseRecord,
} from "./courses/course-index";

export const genericCourseDescription =
  "Programa formativo de bienestar y tecnica aplicada, creado para desarrollar habilidades profesionales con acompanamiento cercano.";

function imageForCourse(sourceId: string) {
  const idNumber = Number(sourceId.replace("CUR-", ""));
  if (idNumber >= 18 && idNumber <= 25) {
    return `/images/courses/${sourceId.toLowerCase()}.svg`;
  }

  if (idNumber > 25) {
    return "/images/courses/cur-025.svg";
  }

  return `/images/courses/${sourceId.toLowerCase()}.png`;
}

export function courseRecordToSuvogaServicio(
  course: CourseRecord
): SuvogaServicio {
  const pricing = course.publicCopy.pricing;
  const schedule = course.publicCopy.schedule;
  const description =
    course.publicCopy.description.value ||
    course.publicCopy.subtitle ||
    course.title;

  return {
    courseUid: course.courseUid,
    sourceId: course.sourceId,
    legacyIds: course.legacyIds,
    idServicio: course.sourceId,
    nombre: course.title,
    tipo: "Curso",
    category: course.publicCopy.category.value,
    description,
    precioTotal: pricing.publicPrice?.amount ?? 0,
    montoAnticipo: pricing.reservation?.amount ?? 1000,
    cuposTotales: 12,
    slug: course.slug,
    subtitulo_premium: course.publicCopy.subtitle,
    duracion: schedule.duration.value,
    modalidad: schedule.modality.value,
    fechaTexto: schedule.dateText,
    incluye: course.publicCopy.materials,
    para_quien_es: course.publicCopy.profile,
    que_aprenderas: course.publicCopy.syllabusMarkdown
      ? [course.publicCopy.syllabusMarkdown]
      : [],
    imagen_url: imageForCourse(course.sourceId),
    imagen_prompt: "",
    youtube_url: "",
    pdf_drive_url: "",
    nivel: "",
    certificado_incluido: course.publicCopy.certifications.length > 0,
    estado_publicacion:
      course.publicationStatus === "draft" ? "Borrador" : "Publicado",
    orden_destacado: Number(course.sourceId.replace("CUR-", "")),
    publicationStatus: course.publicationStatus,
    pendingOwnerReview: course.pendingOwnerReview,
    requiresOwnerReview: course.requiresOwnerReview,
    requiresLegalReview: course.requiresLegalReview,
  };
}

export const officialCourses = officialCourseCatalog;
export const publicCourses = publicCourseCatalog;

export const allSuvogaCourses: SuvogaServicio[] = officialCourseCatalog.map(
  courseRecordToSuvogaServicio
);

export const suvogaCourses: SuvogaServicio[] = publicCourseCatalog.map(
  courseRecordToSuvogaServicio
);

export function findSuvogaCourseByIdentifier(identifier: string) {
  const course =
    findCourseByLegacyId(identifier) ?? findCourseByPublicIdentifier(identifier);
  if (!course || course.publicationStatus !== "published") return null;
  return courseRecordToSuvogaServicio(course);
}

export function findSuvogaCourseByLegacyId(legacyId: string) {
  const course = findCourseByLegacyId(legacyId);
  return course ? courseRecordToSuvogaServicio(course) : null;
}
