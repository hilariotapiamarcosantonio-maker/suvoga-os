// Confirmed editorial overrides for SuVoGa courses.
//
// This file holds ONLY corrections that are safe and confirmed — never guesses.
// It augments presentation without mutating the source JSON or sourceRaw. If a
// value is uncertain, it belongs in course-content-review.ts as "needs-review",
// NOT here.
//
// Today there are no confirmed factual overrides pending owner validation, so
// the map is intentionally empty. The typed shape lets us add confirmed fixes
// course-by-course later without touching components.

export type CourseEditorialOverride = {
  /** Replacement eyebrow/kicker, if the catalog category is empty/placeholder. */
  displayCategory?: string;
  /** Confirmed clean facilitator display name (overrides contaminated value). */
  facilitatorName?: string;
  /** Confirmed facilitator role/title. */
  facilitatorRole?: string;
  /** Lines explicitly confirmed to hide from presentation (exact matches). */
  hiddenLines?: string[];
  /** Free-form note for maintainers. */
  note?: string;
};

export const COURSE_EDITORIAL_OVERRIDES: Record<string, CourseEditorialOverride> = {
  // Intentionally empty: no confirmed overrides yet. Ambiguities are tracked in
  // course-content-review.ts and resolved by the presentation filter, not here.
};

export function getCourseEditorialOverride(courseId: string): CourseEditorialOverride | undefined {
  return COURSE_EDITORIAL_OVERRIDES[courseId?.toUpperCase?.()];
}
