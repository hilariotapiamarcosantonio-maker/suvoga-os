export type InquiryType = "contact" | "reservation";

export type InquiryValidationError = {
  field: string;
  message: string;
};

export type NormalizedInquiry = {
  type: InquiryType;
  requestId: string;
  submissionId: string;
  name: string;
  phone: string;
  email: string;
  courseId: string;
  courseName: string;
  message: string;
  cedula: string;
  provincia: string;
  originPath: string;
  createdAt: string;
  consentPrivacyTerms?: boolean;
  consentPromotional?: boolean;
  policyVersion?: string;
};

export type RegistrationResult = {
  status: "registered";
  storage: "google-sheets";
  pacienteId?: string;
  inscripcionId?: string;
  anticipoEstado?: string;
  fechaProgramada?: string;
};
