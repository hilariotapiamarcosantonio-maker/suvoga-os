export type ContactChannel = {
  label: string;
  link: string;
  displayValue: string;
};

export type ContactConfig = {
  whatsapp: ContactChannel;
  instagram: ContactChannel;
  tiktok: ContactChannel;
  facebook: ContactChannel;
  correo: string;
  ubicacion: string;
  horario: string;
};

export const contactInfo: ContactConfig = {
  whatsapp: {
    label: "WhatsApp oficial próximamente",
    link: "https://wa.me/18090000000", // Will be replaced with real number link
    displayValue: "+1 (809) 000-0000",
  },
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
  correo: "contacto@suvoga.com",
  ubicacion: "Santo Domingo, República Dominicana",
  horario: "Lunes a Sábado: 9:00 AM - 6:00 PM (Hora Local)",
};
