export type SourceId =
  | "CUR-001"
  | "CUR-002"
  | "CUR-003"
  | "CUR-004"
  | "CUR-005"
  | "CUR-006"
  | "CUR-007"
  | "CUR-008"
  | "CUR-009"
  | "CUR-010"
  | "CUR-011"
  | "CUR-012"
  | "CUR-013"
  | "CUR-014"
  | "CUR-015"
  | "CUR-016"
  | "CUR-017"
  | "CUR-018"
  | "CUR-019"
  | "CUR-020"
  | "CUR-021"
  | "CUR-022"
  | "CUR-023"
  | "CUR-024"
  | "CUR-025"
  | "CUR-026"
  | "CUR-027"
  | "CUR-028"
  | "CUR-029"
  | "CUR-030"
  | "CUR-031"
  | "CUR-032"
  | "CUR-033"
  | "CUR-034"
  | "CUR-035"
  | "CUR-036"
  | "CUR-037"
  | "CUR-038"
  | "CUR-039"
  | "CUR-040";

export type PublicationStatus = "published" | "draft" | "archived";

export type ReviewableText = {
  value: string;
  pendingOwnerReview: boolean;
};

export type MoneyValue = {
  amount: number;
  currency: "DOP";
  raw: string;
  pendingOwnerReview: boolean;
};

export type CoursePricing = {
  publicPrice: MoneyValue | null;
  memberPrice: MoneyValue | null;
  reservation: MoneyValue | null;
  paymentPlan: string[];
  rawLines: string[];
  pendingOwnerReview: boolean;
};

export type CourseSchedule = {
  dateText: string;
  duration: ReviewableText;
  modality: ReviewableText;
  rawLines: string[];
  pendingOwnerReview: boolean;
};

export type ArchivedCourseAlias = {
  legacyId: string;
  courseUid: string;
  title: string;
  reason: string;
  publicationStatus: "archived";
};

export type CourseSourceRaw = {
  heading: string;
  markdown: string;
  lineStart: number;
  lineEnd: number;
};

export type CoursePublicCopy = {
  title: string;
  subtitle: string;
  category: ReviewableText;
  description: ReviewableText;
  pricing: CoursePricing;
  schedule: CourseSchedule;
  objectives: string[];
  profile: string[];
  requirements: string[];
  syllabusMarkdown: string;
  indications: string[];
  contraindications: string[];
  practices: string[];
  materials: string[];
  competencies: string[];
  certifications: string[];
  endorsements: string[];
  facilitator: string;
  legalNotes: string[];
  professionalNotes: string[];
  normalizedMarkdown: string;
};

export type CourseRecord = {
  courseUid: string;
  sourceId: SourceId;
  legacyIds: string[];
  archivedAliases?: ArchivedCourseAlias[];
  slug: string;
  title: string;
  requiresOwnerReview: boolean;
  requiresLegalReview: boolean;
  pendingOwnerReview: boolean;
  publicationStatus: PublicationStatus;
  sourceRaw: CourseSourceRaw;
  publicCopy: CoursePublicCopy;
};
