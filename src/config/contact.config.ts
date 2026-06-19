export const contactConfig = {
  phoneDisplay: "829-838-9185",
  whatsappNumber: "18298389185",
  email: "asnamatem@gmail.com",
  defaultWhatsAppMessage:
    "Hola, deseo recibir orientación sobre los programas de SuVoGa Academia.",
  location: "Santo Domingo, República Dominicana",
  hours: "Lunes a Sábado: 9:00 AM - 6:00 PM (Hora Local)",
  social: {
    instagram: {
      label: "Instagram oficial pendiente de confirmar",
      displayValue: "Pendiente de confirmar",
    },
    tiktok: {
      label: "TikTok oficial pendiente de confirmar",
      displayValue: "Pendiente de confirmar",
    },
    facebook: {
      label: "Facebook oficial pendiente de confirmar",
      displayValue: "Pendiente de confirmar",
    },
  },
} as const;

export type ContactConfigSource = typeof contactConfig;
