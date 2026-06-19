import { contactConfig } from "@/config/contact.config";
import { buildWhatsAppLink, suvogaContact } from "@/lib/suvoga-contact";

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
    label: "Escríbenos por WhatsApp",
    link: buildWhatsAppLink(),
    displayValue: suvogaContact.phoneDisplay,
  },
  instagram: contactConfig.social.instagram,
  tiktok: contactConfig.social.tiktok,
  facebook: contactConfig.social.facebook,
  correo: suvogaContact.email,
  ubicacion: contactConfig.location,
  horario: contactConfig.hours,
};
