export const featuresConfig = {
  courses: true,
  stories: true,
  community: true,
  contact: true,
  facilitators: false,
  testimonials: true,
  pdfs: true,
  videos: true,
  certifications: true,
  endorsements: true,
  reservations: true,
  whatsapp: true,
  email: false,
  futurePayments: false,
} as const;

export type FeaturesConfig = typeof featuresConfig;
