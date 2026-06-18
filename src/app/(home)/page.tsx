import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  Layers,
  Leaf,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { suvogaCourses } from "@/data/courses";
import { brand } from "@/lib/brand";
import { courseCategory, selectFeatured } from "@/lib/course-presentation";
import { CourseCard } from "@/components/suvoga/CourseCard";
import { SectionHeading } from "@/components/suvoga/SectionHeading";
import { SiteCTA } from "@/components/suvoga/SiteCTA";
import { Reveal } from "@/components/suvoga/Reveal";
import { studentTestimonials } from "@/data/testimonials";

const featured = selectFeatured(suvogaCourses, 6);

const categoryCounts = (() => {
  const counts = new Map<string, number>();
  for (const course of suvogaCourses) {
    const cat = courseCategory(course);
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
})();

const steps = [
  {
    icon: Sparkles,
    title: "Elige tu programa",
    text: "Explora el catálogo, revisa el temario completo y descubre qué formación se ajusta a tu meta profesional.",
  },
  {
    icon: CalendarCheck,
    title: "Reserva tu cupo",
    text: "Aparta tu lugar con el anticipo. Los grupos son reducidos —máximo 12 personas— para una práctica cuidada.",
  },
  {
    icon: GraduationCap,
    title: "Aprende practicando",
    text: "Clases presenciales con técnica real en cabina, materiales incluidos y acompañamiento directo de la facilitadora.",
  },
  {
    icon: Award,
    title: "Certifícate y ejerce",
    text: "Recibe tu certificado avalado y herramientas concretas para ofrecer servicios profesionales de bienestar.",
  },
];

const benefits = [
  { icon: Users, title: "Grupos reducidos", text: "Máximo 12 estudiantes por cohorte para atención personalizada." },
  { icon: ShieldCheck, title: "Certificación avalada", text: "Diplomas respaldados por la academia y la asociación profesional." },
  { icon: Layers, title: "Práctica real", text: "Formación sobre camilla, con materiales y equipos profesionales." },
  { icon: HeartHandshake, title: "Acompañamiento", text: "Mentoría cercana durante y después de tu formación." },
];

export default function HomePage() {
  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      {/* 1. Hero institucional */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#072515] via-[#0D3B22] to-[#124026] text-[#FDFBF7]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              {brand.productName}
            </span>
            <h1 className="suvoga-serif mt-7 text-4xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Forma tus manos. <span className="text-[#E9Cf7c]">Transforma vidas.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#EAE2D0] sm:text-lg">
              Formación profesional en masoterapia, estética y bienestar: una
              experiencia educativa serena, técnica y profundamente humana.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cursos"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#0D3B22] shadow-lg transition-transform hover:scale-[1.02]"
              >
                Explorar cursos
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Solicitar orientación
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-3">
              {[
                [`${suvogaCourses.length}`, "programas"],
                ["12", "cupos por grupo"],
                ["100%", "práctica real"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-[#D4AF37]/25 bg-white/5 p-4 backdrop-blur-sm">
                  <dt className="suvoga-serif text-3xl font-semibold text-white">{value}</dt>
                  <dd className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/35 bg-[#0D3B22]/40 p-2.5 shadow-2xl shadow-black/45">
              <img
                src="/images/courses/cur-001.png"
                alt="Formación profesional en SuVoGa Academia"
                className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-[#D4AF37]/40 bg-[#FDFBF7] px-5 py-4 text-[#0D3B22] shadow-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8D7530]">Certificación</p>
              <p className="suvoga-serif text-lg font-semibold">Aval profesional</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mensaje principal */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A028]">
            Una academia, un oficio con propósito
          </p>
          <p className="suvoga-serif mt-5 text-2xl font-medium leading-snug text-[#0D3B22] sm:text-3xl lg:text-4xl">
            En SuVoGa Academia formamos terapeutas y profesionales del bienestar
            con técnica rigurosa, sensibilidad humana y la confianza para ejercer
            con excelencia.
          </p>
        </Reveal>
      </section>

      {/* 3. Seis cursos destacados */}
      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selección académica"
              title="Cursos destacados"
              description="Una muestra de nuestra formación. El catálogo completo reúne 38 programas publicados."
            />
            <Link
              href="/cursos"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#0D3B22]/20 px-5 py-2.5 text-sm font-semibold text-[#0D3B22] transition-colors hover:border-[#D4AF37]/60 hover:bg-[#0D3B22]/5 sm:self-auto"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course, i) => (
            <Reveal key={course.idServicio} delay={i * 0.05}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Categorías principales */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Áreas de formación"
            title="Explora por categoría"
            description="Encuentra el camino que mejor acompaña tu vocación profesional."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCounts.map(([category, count], i) => (
            <Reveal key={category} delay={i * 0.04}>
              <Link
                href={`/cursos?categoria=${encodeURIComponent(category)}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-md"
              >
                <span>
                  <span className="suvoga-serif block text-lg font-semibold text-[#0D3B22] transition-colors group-hover:text-[#145332]">
                    {category}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#6B6048]">
                    {count} {count === 1 ? "programa" : "programas"}
                  </span>
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D3B22]/5 text-[#C5A028] transition-colors group-hover:bg-[#0D3B22] group-hover:text-[#F4E6BE]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. Cómo funciona la formación */}
      <section className="bg-[#0D3B22] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Cómo funciona"
              title="Tu camino en cuatro pasos"
              description="Un proceso claro, cuidado y profesional, desde la elección hasta la certificación."
              tone="light"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-[#D4AF37]/25 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#0D3B22]">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="suvoga-serif text-3xl font-semibold text-white/15">0{i + 1}</span>
                  </div>
                  <h3 className="suvoga-serif mt-5 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#EAE2D0]">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Beneficios */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Por qué SuVoGa"
            title="Beneficios de estudiar con nosotros"
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-[#D4AF37]/25 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D3B22]/5 text-[#C5A028]">
                  <benefit.icon className="h-6 w-6" />
                </span>
                <h3 className="suvoga-serif mt-4 text-lg font-semibold text-[#0D3B22]">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4E6658]">{benefit.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 7. Tres testimonios destacados */}
      <section className="bg-[#F6EFE2]/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Historias reales"
              title="Lo que viven nuestras alumnas"
              description="Experiencias de quienes han transformado su vocación en profesión."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {studentTestimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.06}>
                <figure className="flex h-full flex-col rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm">
                  <Quote className="h-8 w-8 text-[#D4AF37]/30" />
                  <blockquote className="mt-3 flex-1 text-sm italic leading-7 text-[#4E6658]">
                    “{t.comentario}”
                  </blockquote>
                  <div className="mt-5 flex items-center gap-1 text-[#D4AF37]">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <figcaption className="mt-3 border-t border-[#D4AF37]/15 pt-3">
                    <span className="block text-sm font-bold text-[#0D3B22]">{t.nombre}</span>
                    <span className="block text-xs text-[#8D7530]">{t.curso}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/historias"
              className="inline-flex items-center gap-2 rounded-full border border-[#0D3B22]/20 bg-white px-6 py-3 text-sm font-semibold text-[#0D3B22] transition-colors hover:border-[#D4AF37]/60"
            >
              Ver más historias
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Presentación de la comunidad */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <div className="grid items-center gap-10 rounded-[2rem] border border-[#D4AF37]/25 bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Comunidad SuVoGa"
                title="No terminas el curso: empiezas a pertenecer"
                description="Al formarte con nosotros entras a una comunidad de terapeutas que sigue creciendo: acompañamiento, actualización y oportunidades de desarrollo profesional."
              />
              <Link
                href="/comunidad"
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#0D3B22] px-6 py-3 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332]"
              >
                Conocer la comunidad
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: HeartHandshake, label: "Acompañamiento continuo" },
                { icon: GraduationCap, label: "Actualización profesional" },
                { icon: Users, label: "Red de terapeutas" },
                { icon: Award, label: "Certificación con respaldo" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-5">
                  <item.icon className="h-6 w-6 text-[#C5A028]" />
                  <p className="mt-3 text-sm font-semibold leading-5 text-[#0D3B22]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 9 + 10. CTA explorar cursos / solicitar orientación */}
      <SiteCTA />
    </main>
  );
}
