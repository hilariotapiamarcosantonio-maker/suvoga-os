import { contactConfig } from "./contact.config";

export const academyConfig = {
  id: "suvoga-academia",
  slug: "suvoga-academia",
  legalName: "SuVoGa Escuela y Centro de Masajes",
  publicName: "SuVoGa Escuela y Centro de Masajes",
  shortName: "SuVoGa",
  description: "Formación técnica y talleres especializados.",
  locale: "es-DO",
  timezone: "America/La_Paz",
  currency: "DOP",
  country: "República Dominicana",
  contact: {
    email: contactConfig.email,
    phoneDisplay: contactConfig.phoneDisplay,
    whatsappNumber: contactConfig.whatsappNumber,
    location: contactConfig.location,
    hours: contactConfig.hours,
  },
  social: contactConfig.social,
  facilitatorDefaults: {
    verified: false,
    provisionalPhoto: true,
  },
  organization: {
    name: "SuVoGa Academia",
    type: "Academia de formación profesional",
  },
} as const;

export type AcademyConfig = typeof academyConfig;
