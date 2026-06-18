import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Infinity as InfinityIcon,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/suvoga/SectionHeading";
import { SiteCTA } from "@/components/suvoga/SiteCTA";
import { Reveal } from "@/components/suvoga/Reveal";

export const metadata: Metadata = {
  title: "Comunidad SuVoGa | SuVoGa Academia",
  description:
    "Formarte en SuVoGa Academia es entrar a una comunidad de terapeutas: acompañamiento, desarrollo profesional, certificación y continuidad después del curso.",
  alternates: { canonical: "/comunidad" },
  openGraph: {
    title: "Comunidad SuVoGa | SuVoGa Academia",
    description: "Acompañamiento y desarrollo profesional que continúa después del curso.",
    url: "/comunidad",
    type: "website",
  },
};

const pillars = [
  {
    icon: HeartHandshake,
    title: "Acompañamiento cercano",
    text: "Resolvemos dudas y guiamos tu práctica durante y después de la formación, con mentoría directa de la facilitadora.",
  },
  {
    icon: GraduationCap,
    title: "Desarrollo profesional",
    text: "Acceso a nuevas formaciones, técnicas y actualizaciones para que tu oferta de servicios siga creciendo.",
  },
  {
    icon: Award,
    title: "Certificación con respaldo",
    text: "Diplomas avalados por la academia y la asociación profesional, que dan confianza a ti y a tus clientes.",
  },
  {
    icon: InfinityIcon,
    title: "Continuidad después del curso",
    text: "El aprendizaje no termina el último día: seguimos acompañando tu camino como terapeuta.",
  },
];

const benefits = [
  { icon: Users, text: "Red de terapeutas y profesionales del bienestar." },
  { icon: BookOpen, text: "Material y protocolos de referencia para tu práctica." },
  { icon: Sparkles, text: "Prioridad e información temprana de nuevos talleres." },
  { icon: Award, text: "Respaldo profesional para presentarte ante tus clientes." },
];

export default function ComunidadPage() {
  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Comunidad SuVoGa
          </p>
          <h1 className="suvoga-serif mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Más que una academia, un lugar al que pertenecer
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            Estudiar en SuVoGa significa sumarte a una comunidad que acompaña tu
            crecimiento profesional mucho más allá del aula.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Qué significa pertenecer"
            title="Lo que sostiene a nuestra comunidad"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.05}>
              <div className="flex h-full gap-5 rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm sm:p-7">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0D3B22]/5 text-[#C5A028]">
                  <pillar.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="suvoga-serif text-xl font-semibold text-[#0D3B22]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4E6658]">{pillar.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#0D3B22] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Beneficios de comunidad"
              title="Lo que recibes al formar parte"
              tone="light"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.text} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-2xl border border-[#D4AF37]/25 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#0D3B22]">
                    <benefit.icon className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-medium leading-6 text-[#EAE2D0]">{benefit.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-12 text-center">
              <Link
                href="/cursos"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 py-3.5 text-sm font-semibold text-[#0D3B22] shadow-lg transition-transform hover:scale-[1.02]"
              >
                Formar parte de SuVoGa
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteCTA
        title="Comienza tu camino con nosotros"
        description="Elige tu programa o conversa con el equipo para encontrar tu mejor punto de partida."
      />
    </main>
  );
}
