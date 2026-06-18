import type { CourseRecord, SourceId } from "./course-types";
import cur001 from "./cur-001.json";
import cur002 from "./cur-002.json";
import cur003 from "./cur-003.json";
import cur004 from "./cur-004.json";
import cur005 from "./cur-005.json";
import cur006 from "./cur-006.json";
import cur007 from "./cur-007.json";
import cur008 from "./cur-008.json";
import cur009 from "./cur-009.json";
import cur010 from "./cur-010.json";
import cur011 from "./cur-011.json";
import cur012 from "./cur-012.json";
import cur013 from "./cur-013.json";
import cur014 from "./cur-014.json";
import cur015 from "./cur-015.json";
import cur016 from "./cur-016.json";
import cur017 from "./cur-017.json";
import cur018 from "./cur-018.json";
import cur019 from "./cur-019.json";
import cur020 from "./cur-020.json";
import cur021 from "./cur-021.json";
import cur022 from "./cur-022.json";
import cur023 from "./cur-023.json";
import cur024 from "./cur-024.json";
import cur025 from "./cur-025.json";
import cur026 from "./cur-026.json";
import cur027 from "./cur-027.json";
import cur028 from "./cur-028.json";
import cur029 from "./cur-029.json";
import cur030 from "./cur-030.json";
import cur031 from "./cur-031.json";
import cur032 from "./cur-032.json";
import cur033 from "./cur-033.json";
import cur034 from "./cur-034.json";
import cur035 from "./cur-035.json";
import cur036 from "./cur-036.json";
import cur037 from "./cur-037.json";
import cur038 from "./cur-038.json";
import cur039 from "./cur-039.json";
import cur040 from "./cur-040.json";

export type { CourseRecord, SourceId } from "./course-types";

export const officialCourseCatalog = [
  cur001,
  cur002,
  cur003,
  cur004,
  cur005,
  cur006,
  cur007,
  cur008,
  cur009,
  cur010,
  cur011,
  cur012,
  cur013,
  cur014,
  cur015,
  cur016,
  cur017,
  cur018,
  cur019,
  cur020,
  cur021,
  cur022,
  cur023,
  cur024,
  cur025,
  cur026,
  cur027,
  cur028,
  cur029,
  cur030,
  cur031,
  cur032,
  cur033,
  cur034,
  cur035,
  cur036,
  cur037,
  cur038,
  cur039,
  cur040,
] as CourseRecord[];

export const publicCourseCatalog = officialCourseCatalog.filter(
  (course) => course.publicationStatus === "published"
);

export const courseBySourceId = new Map<SourceId, CourseRecord>(
  officialCourseCatalog.map((course) => [course.sourceId, course])
);

export const courseBySlug = new Map<string, CourseRecord>(
  officialCourseCatalog.map((course) => [course.slug, course])
);

export const courseByLegacyId = new Map<string, CourseRecord>();

for (const course of officialCourseCatalog) {
  for (const legacyId of course.legacyIds) {
    courseByLegacyId.set(legacyId, course);
  }
}

export function findCourseByPublicIdentifier(identifier: string) {
  const normalized = decodeURIComponent(identifier).trim().toLowerCase();

  return (
    officialCourseCatalog.find((course) => course.slug.toLowerCase() === normalized) ??
    officialCourseCatalog.find((course) => course.sourceId.toLowerCase() === normalized) ??
    null
  );
}

export function findCourseByLegacyId(legacyId: string) {
  const normalized = decodeURIComponent(legacyId).trim().toUpperCase();
  return courseByLegacyId.get(normalized) ?? null;
}
