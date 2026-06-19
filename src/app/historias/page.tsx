import type { Metadata } from "next";
import { Quote, Star } from "lucide-react";
import { studentTestimonials, googleReviews } from "@/data/testimonials";
import { graduatesList } from "@/data/graduates";
import { SectionHeading } from "@/components/suvoga/SectionHeading";
import { SiteCTA } from "@/components/suvoga/SiteCTA";
import { Reveal } from "@/components/suvoga/Reveal";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";
import { brandingConfig } from "@/config/branding.config";

export const metadata: Metadata = {
  title: `Historias y testimonios | ${brandingConfig.productName}`,
  description: `Experiencias de alumnas y egresadas de ${brandingConfig.productName}: resultados formativos y transformación profesional.`,
  alternates: { canonical: "/historias" },
  openGraph: {
    title: `Historias y testimonios | ${brandingConfig.productName}`,
    description: "Experiencias reales de quienes se han formado con nosotros.",
    url: "/historias",
    type: "website",
  },
};

export default function HistoriasPage() {
  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Historias SuVoGa
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Vocaciones que se vuelven profesión
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            Cada egresada lleva consigo una técnica cuidada y la confianza para
            ejercer. Estas son algunas de sus experiencias.
          </p>
        </div>
      </section>

      {/* Testimonios de alumnas */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonios"
            title="Experiencias de nuestras alumnas"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {studentTestimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm">
                <Quote className="h-8 w-8 text-[#D4AF37]/30" />
                <blockquote className="mt-3 flex-1 text-sm italic leading-7 text-[#4E6658]">
                  “{t.comentario}”
                </blockquote>
                <div className="mt-4 flex items-center gap-1 text-[#D4AF37]">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-3 flex items-center gap-3 border-t border-[#D4AF37]/15 pt-3">
                  {t.imagen_url ? (
                    <img src={t.imagen_url} alt={t.nombre} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                  ) : null}
                  <span>
                    <span className="block text-sm font-bold text-[#0D3B22]">{t.nombre}</span>
                    <span className="block text-xs text-[#8D7530]">{t.curso}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Egresadas destacadas */}
      <section className="bg-[#F6EFE2]/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Egresadas destacadas"
              title="Resultados formativos"
              description="Estudiantes que completaron su formación y avanzan en su práctica profesional."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {graduatesList.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center rounded-3xl border border-[#D4AF37]/25 bg-white p-6 text-center shadow-sm">
                  {g.imagen_url ? (
                    <img src={g.imagen_url} alt={g.nombre} loading="lazy" className="h-20 w-20 rounded-2xl object-cover" />
                  ) : null}
                  <h3 className="suvoga-serif mt-4 text-base font-bold text-[#0D3B22]">{g.nombre}</h3>
                  <p className="mt-1 text-xs text-[#8D7530]">{g.cursoCompletado}</p>
                  <span className="mt-3 inline-flex rounded-full bg-[#0D3B22]/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0D3B22]">
                    {g.estado}
                  </span>
                  <p className="mt-2 text-[11px] text-[#6B6048]">{g.cohorte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeading eyebrow="Reseñas" title="Lo que dicen de la academia" />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {googleReviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-7 text-[#4E6658]">
                  “{r.comentario}”
                </blockquote>
                <figcaption className="mt-4 border-t border-[#D4AF37]/15 pt-3">
                  <span className="block text-sm font-bold text-[#0D3B22]">{r.nombre}</span>
                  <span className="block text-xs text-[#8D7530]">{r.fuente} · {r.fecha}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteCTA
        title="Tu historia puede ser la próxima"
        description="Explora nuestros programas y comienza tu formación profesional en bienestar."
      />
      <SuvogaWhatsAppButton />
    </main>
  );
}
