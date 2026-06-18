import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { Instagram } from "@/components/suvoga/BrandIcons";
import { contactInfo } from "@/data/contact";
import { ContactForm } from "@/components/suvoga/ContactForm";
import { SectionHeading } from "@/components/suvoga/SectionHeading";
import { Reveal } from "@/components/suvoga/Reveal";

export const metadata: Metadata = {
  title: "Contacto y orientación | SuVoGa Academia",
  description:
    "Solicita orientación académica en SuVoGa Academia. Escríbenos por WhatsApp, Instagram o correo y te ayudamos a elegir tu formación.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto y orientación | SuVoGa Academia",
    description: "Orientación académica personalizada para elegir tu programa.",
    url: "/contacto",
    type: "website",
  },
};

const faqs = [
  {
    q: "¿Cómo reservo mi cupo?",
    a: "Cada programa se asegura con el anticipo de reserva indicado en su página. El anticipo no es reembolsable ni transferible a otro curso, y se descuenta del precio total.",
  },
  {
    q: "¿Cuántas personas hay por grupo?",
    a: "Los grupos son reducidos —máximo 12 estudiantes— para garantizar práctica supervisada y atención personalizada.",
  },
  {
    q: "¿Las clases son presenciales?",
    a: "La mayoría de los talleres son presenciales y prácticos. Algunos programas incluyen modalidad teórica complementaria; revisa cada ficha para ver su modalidad.",
  },
  {
    q: "¿La certificación tiene aval?",
    a: "Sí. Los certificados están avalados por SuVoGa y por la asociación profesional correspondiente, según el programa.",
  },
];

export default function ContactoPage() {
  const channels = [
    {
      icon: MessageCircle,
      label: contactInfo.whatsapp.label,
      value: contactInfo.whatsapp.displayValue,
      href: contactInfo.whatsapp.link,
      external: true,
    },
    {
      icon: Instagram,
      label: contactInfo.instagram.label,
      value: contactInfo.instagram.displayValue,
      href: contactInfo.instagram.link,
      external: true,
    },
    {
      icon: Mail,
      label: "Correo electrónico",
      value: contactInfo.correo,
      href: `mailto:${contactInfo.correo}`,
      external: false,
    },
  ];

  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Contacto y orientación
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Hablemos de tu formación
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            ¿Tienes dudas sobre un programa, fechas o formas de pago? Te
            orientamos para que elijas con confianza.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* Channels + logistics */}
        <Reveal>
          <div>
            <SectionHeading eyebrow="Canales directos" title="Escríbenos" />
            <div className="mt-8 space-y-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0D3B22]/5 text-[#C5A028]">
                    <channel.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#0D3B22]">{channel.label}</span>
                    <span className="block truncate text-xs text-[#6B6048]">{channel.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-[#D4AF37]/20 bg-white p-5 shadow-sm sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A028]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8D7530]">Ubicación</p>
                  <p className="mt-1 text-sm text-[#4E6658]">{contactInfo.ubicacion}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A028]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8D7530]">Horario</p>
                  <p className="mt-1 text-sm text-[#4E6658]">{contactInfo.horario}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading eyebrow="Formulario" title="Solicita orientación" />
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-[#F6EFE2]/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading eyebrow="Preguntas frecuentes" title="Antes de inscribirte" align="center" />
          </Reveal>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.04}>
                <details className="group rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-[#0D3B22]">
                    {faq.q}
                    <span className="text-[#C5A028] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#4E6658]">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
