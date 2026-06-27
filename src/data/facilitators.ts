import { courseRecordToSuvogaServicio } from "./courses";
import { publicCourseCatalog, type CourseRecord } from "./courses/course-index";

export type Facilitator = {
  id: string;
  slug: string;
  name: string;
  role?: string;
  shortBio?: string;
  fullBio?: string;
  photoUrl?: string;
  photoAlt?: string;
  specialties?: string[];
  credentials?: string[];
  institution?: string;
  signatureUrl?: string;
  verified: boolean;
  provisionalPhoto: boolean;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
};

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export const facilitators: Facilitator[] = [
  {
    id: "fac-sugeidy-volquez-garcia",
    slug: "sugeidy-volquez-garcia",
    name: "Sugeidy Vólquez García",
    role: "Facilitadora",
    photoUrl: "/images/facilitators/sugeidy-volquez-garcia.webp",
    photoAlt: "Sugeidy Vólquez García, facilitadora de SuVoGa",
    verified: false,
    provisionalPhoto: false,
  },
];

export function findFacilitatorBySlug(slug: string) {
  const normalized = slug.trim().toLowerCase();
  return facilitators.find((facilitator) => facilitator.slug === normalized) ?? null;
}

export function findFacilitatorByName(name?: string) {
  if (!name) return null;
  const normalized = normalizeName(name);
  return (
    facilitators.find((facilitator) => normalizeName(facilitator.name) === normalized) ??
    null
  );
}

export function getFacilitatorForCourseRecord(course: CourseRecord) {
  return findFacilitatorByName(course.publicCopy.facilitator);
}

export function getCoursesForFacilitator(slug: string) {
  const facilitator = findFacilitatorBySlug(slug);
  if (!facilitator) return [];

  return publicCourseCatalog
    .filter((course) => getFacilitatorForCourseRecord(course)?.slug === facilitator.slug)
    .map(courseRecordToSuvogaServicio);
}
