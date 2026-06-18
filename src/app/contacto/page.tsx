import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { ContactForm } from "@/components/suvoga/ContactForm";
import { SectionHeading } from "@/components/suvoga/SectionHeading";
import { Reveal } from "@/components/suvoga/Reveal";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";

export const metadata: Metadata = {
  title: "Contacto y orientación | SuVoGa Academia",
  description:
    "Solicita orientación académica en SuVoGa Academia. Cuéntanos tu objetivo y te ayudamos a elegir tu formación en masoterapia, estética y bienestar.",
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
            ¿Tienes dudas sobre un programa, fechas o formas de pago? Cuéntanos qué
            buscas y te orientamos para que elijas con confianza.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-20">
        {/* Intro + email */}
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Orientación académica"
              title="Estamos para ayudarte"
              description="Completa el formulario con tu consulta y nuestro equipo te responderá para guiarte en la elección de tu programa."
            />

            <a
              href={`mailto:${contactInfo.correo}`}
              className="group mt-8 flex items-center gap-4 rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0D3B22]/5 text-[#C5A028]">
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[#0D3B22]">Correo electrónico</span>
                <span className="block truncate text-xs text-[#6B6048]">{contactInfo.correo}</span>
              </span>
            </a>

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#0D3B22]/[0.03] p-5">
              <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A028]" />
              <p className="text-xs leading-6 text-[#4E6658]">
                Nuestros canales oficiales de WhatsApp e Instagram se habilitarán muy pronto.
                Mientras tanto, el formulario es la vía directa para recibir orientación.
              </p>
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
                    <span className="text-lg leading-none text-[#C5A028] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[#4E6658]">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <SuvogaWhatsAppButton />
    </main>
  );
}
