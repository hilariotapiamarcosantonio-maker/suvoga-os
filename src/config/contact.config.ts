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
      label: "Instagram oficial próximamente",
      link: "https://instagram.com/suvoga.academia.placeholder",
      displayValue: "@suvoga.academia",
    },
    tiktok: {
      label: "TikTok oficial próximamente",
      link: "https://tiktok.com/@suvoga.academia.placeholder",
      displayValue: "@suvoga.academia",
    },
    facebook: {
      label: "Facebook oficial próximamente",
      link: "https://facebook.com/suvoga.academia.placeholder",
      displayValue: "SuVoGa Academia",
    },
  },
} as const;

export type ContactConfigSource = typeof contactConfig;
