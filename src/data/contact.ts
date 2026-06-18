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

import { buildWhatsAppLink, suvogaContact } from "@/lib/suvoga-contact";

export const contactInfo: ContactConfig = {
  whatsapp: {
    label: "Escríbenos por WhatsApp",
    link: buildWhatsAppLink(),
    displayValue: suvogaContact.phoneDisplay,
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
  correo: suvogaContact.email,
  ubicacion: "Santo Domingo, República Dominicana",
  horario: "Lunes a Sábado: 9:00 AM - 6:00 PM (Hora Local)",
};
