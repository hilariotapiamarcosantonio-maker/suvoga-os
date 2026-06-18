import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Layers,
  ListChecks,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import {
  courseRecordToSuvogaServicio,
  findPublishedCourseRecord,
  suvogaCourses,
} from "@/data/courses";
import { CourseLandingSignup } from "@/components/suvoga/CourseLandingSignup";
import { CourseHeroCTA } from "@/components/suvoga/CourseHeroCTA";
import { CourseSyllabus } from "@/components/suvoga/CourseSyllabus";
import { CourseSectionNav } from "@/components/suvoga/CourseSectionNav";
import { CoursePdfResource } from "@/components/suvoga/CoursePdfResource";
import { YouTubeLiteEmbed } from "@/components/suvoga/YouTubeLiteEmbed";
import {
  cleanLabeledValue,
  cleanList,
  cleanText,
  courseCategory,
  courseImage,
  courseModality,
  formatDop,
  parseSyllabusModules,
  priceLabel,
  youTubeId,
} from "@/lib/course-presentation";

type CoursePageProps = {
  params: { id: string };
};

function normalizeRouteIdentifier(identifier: string) {
  return decodeURIComponent(identifier).trim().toLowerCase();
}

export function generateStaticParams() {
  return suvogaCourses.map((course) => ({ id: course.slug || course.idServicio }));
}

export function generateMetadata({ params }: CoursePageProps): Metadata {
  const record = findPublishedCourseRecord(params.id);
  if (!record) {
    return { title: "Curso no encontrado | SuVoGa Academia" };
  }

  const canonicalPath = `/curso/${record.slug}`;
  const isCanonical =
    normalizeRouteIdentifier(params.id) === normalizeRouteIdentifier(record.slug);
  const description =
    cleanText(record.publicCopy.description.value) ||
    record.publicCopy.subtitle ||
    record.title;

  return {
    title: `${record.title} | SuVoGa Academia`,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${record.title} | SuVoGa Academia`,
      description,
      url: canonicalPath,
      type: "article",
    },
    robots: isCanonical ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const record = findPublishedCourseRecord(params.id);
  if (!record) notFound();

  if (normalizeRouteIdentifier(params.id) !== normalizeRouteIdentifier(record.slug)) {
    permanentRedirect(`/curso/${record.slug}`);
  }

  const course = courseRecordToSuvogaServicio(record);
  const pc = record.publicCopy;

  // --- Clean and structure the source content ---------------------------------
  const objectiveList = cleanList(pc.objectives);
  const objective =
    objectiveList.find((s) => s.length > 45) || objectiveList[0] || cleanText(pc.description.value);

  const profile = (() => {
    const out: string[] = [];
    for (const raw of cleanList(pc.profile)) {
      if (raw === objective || /^capacitar/i.test(raw)) continue;
      const dirigido = raw.match(/^dirigido a:?\s*(.*)/i);
      if (dirigido) {
        out.push(
          ...dirigido[1]
            .split(/[,;]|\sy\s/)
            .map((x) => x.trim())
            .filter((x) => x.length > 2)
        );
      } else {
        out.push(raw);
      }
    }
    return Array.from(new Set(out));
  })();

  const requirements = cleanList(pc.requirements);
  const modules = parseSyllabusModules(pc.syllabusMarkdown);
  const learn = pc.competencies?.length
    ? cleanList(pc.competencies)
    : modules.slice(0, 8).map((m) => m.title);
  const materials = cleanList(pc.materials);
  const practices = cleanList(pc.practices);
  const indications = cleanList(pc.indications);
  const contraindications = cleanList(pc.contraindications);
  const certifications = cleanList(pc.certifications);
  const facilitator = cleanText(pc.facilitator);

  const duration = cleanLabeledValue(course.duracion);
  const modality = courseModality(course);
  const category = courseCategory(course);
  const hasPublicPrice = course.precioTotal > 0;
  const memberPrice = course.precioMiembros ?? 0;
  const reservationNote = cleanText(pc.pricing.reservation?.raw);
  const paymentPlan = cleanList(pc.pricing.paymentPlan);
  const hasVideo = Boolean(youTubeId(course.youtube_url));
  const hasPdf = Boolean(course.pdf_drive_url && /^https?:\/\//i.test(course.pdf_drive_url));

  // --- Build the sticky in-page navigation from what actually exists ----------
  const sections: { id: string; label: string }[] = [{ id: "descripcion", label: "Descripción" }];
  if (learn.length) sections.push({ id: "aprenderas", label: "Lo que aprenderás" });
  if (modules.length) sections.push({ id: "temario", label: "Temario" });
  if (practices.length || materials.length) sections.push({ id: "practicas", label: "Prácticas" });
  sections.push({ id: "inversion", label: "Inversión" });
  if (certifications.length || facilitator) sections.push({ id: "certificacion", label: "Certificación" });
  if (hasVideo || hasPdf) sections.push({ id: "recursos", label: "Recursos" });

  const sectionClass = "scroll-mt-32 md:scroll-mt-36";

  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#072515] via-[#0D3B22] to-[#124026] text-[#FDFBF7]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.1),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-xs font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#0D3B22]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F4E6BE]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {category}
                </span>
                {course.certificado_incluido ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Certificación
                  </span>
                ) : null}
                {record.requiresLegalReview ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F4E6BE]">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Contenido profesional
                  </span>
                ) : null}
              </div>

              <h1 className="suvoga-serif mt-5 text-3xl font-semibold leading-tight text-white sm:text-5xl">
                {course.nombre}
              </h1>
              {course.subtitulo_premium ? (
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#EAE2D0] sm:text-base">
                  {cleanText(course.subtitulo_premium)}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#EAE2D0] sm:text-sm">
                {duration ? (
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#D4AF37]" />
                    {duration}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#D4AF37]" />
                  {modality}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#D4AF37]" />
                  {course.fechaTexto || "Próxima fecha por anunciar"}
                </span>
              </div>

              <div className="mt-7 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3">
                {hasPublicPrice ? (
                  <div className="rounded-2xl border border-[#D4AF37]/25 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Inversión</p>
                    <p className="suvoga-serif mt-1 text-xl font-semibold text-white">{priceLabel(course.precioTotal)}</p>
                  </div>
                ) : null}
                {memberPrice > 0 ? (
                  <div className="rounded-2xl border border-[#D4AF37]/25 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Miembros</p>
                    <p className="suvoga-serif mt-1 text-xl font-semibold text-white">{formatDop(memberPrice)}</p>
                  </div>
                ) : null}
                <div className="rounded-2xl border border-[#D4AF37]/25 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Anticipo</p>
                  <p className="suvoga-serif mt-1 text-xl font-semibold text-white">{formatDop(course.montoAnticipo || 1000)}</p>
                </div>
              </div>

              <div className="mt-8">
                <CourseHeroCTA course={course} />
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-[#D4AF37]/35 bg-[#0D3B22]/40 p-2.5 shadow-2xl shadow-black/45">
                <img
                  src={courseImage(course)}
                  alt={course.nombre}
                  className="aspect-[4/3] w-full rounded-[1.75rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SECTION NAV */}
      <CourseSectionNav sections={sections} />

      {/* CONTENT */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:py-16">
        <div className="min-w-0 space-y-12">
          {/* Descripción */}
          <article id="descripcion" className={sectionClass}>
            <SectionTitle icon={Target} eyebrow="El programa" title="Descripción" />
            <p className="mt-5 text-base leading-8 text-[#4E6658]">{cleanText(pc.description.value) || objective}</p>
            {objective && objective !== cleanText(pc.description.value) ? (
              <div className="mt-6 rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8D7530]">Objetivo</p>
                <p className="mt-2 text-sm leading-7 text-[#4E6658]">{objective}</p>
              </div>
            ) : null}

            {(profile.length || requirements.length) ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {profile.length ? (
                  <InfoCard icon={UserCheck} title="Para quién es">
                    <BulletList items={profile} />
                  </InfoCard>
                ) : null}
                {requirements.length ? (
                  <InfoCard icon={ListChecks} title="Requisitos">
                    <BulletList items={requirements} />
                  </InfoCard>
                ) : null}
              </div>
            ) : null}
          </article>

          {/* Lo que aprenderás */}
          {learn.length ? (
            <article id="aprenderas" className={sectionClass}>
              <SectionTitle icon={GraduationCap} eyebrow="Resultados" title="Lo que aprenderás" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {learn.map((item, i) => (
                  <div key={i} className="flex gap-3 rounded-2xl border border-[#0D3B22]/10 bg-white p-4 shadow-sm">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0D3B22] text-[11px] font-bold text-[#F4E6BE]">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-6 text-[#4E6658]">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          {/* Temario */}
          {modules.length ? (
            <article id="temario" className={sectionClass}>
              <SectionTitle icon={ScrollText} eyebrow="Contenido" title="Temario" />
              <div className="mt-5">
                <CourseSyllabus modules={modules} />
              </div>
              {hasPdf ? (
                <div className="mt-6">
                  <CoursePdfResource url={course.pdf_drive_url} courseName={course.nombre} />
                </div>
              ) : null}
            </article>
          ) : null}

          {/* Prácticas, materiales, indicaciones */}
          {(practices.length || materials.length || indications.length || contraindications.length) ? (
            <article id="practicas" className={sectionClass}>
              <SectionTitle icon={Sparkles} eyebrow="Experiencia formativa" title="Prácticas y materiales" />
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {practices.length ? (
                  <InfoCard icon={Sparkles} title="Prácticas supervisadas">
                    <BulletList items={practices} />
                  </InfoCard>
                ) : null}
                {materials.length ? (
                  <InfoCard icon={Check} title="El programa incluye">
                    <BulletList items={materials} />
                  </InfoCard>
                ) : null}
              </div>

              {(indications.length || contraindications.length) ? (
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {indications.length ? (
                    <InfoCard icon={Check} title="Indicaciones">
                      <BulletList items={indications} />
                    </InfoCard>
                  ) : null}
                  {contraindications.length ? (
                    <InfoCard icon={ShieldAlert} title="Contraindicaciones" tone="warn">
                      <BulletList items={contraindications} tone="warn" />
                    </InfoCard>
                  ) : null}
                </div>
              ) : null}
            </article>
          ) : null}

          {/* Inversión */}
          <article id="inversion" className={sectionClass}>
            <SectionTitle icon={BadgeCheck} eyebrow="Plan de inversión" title="Inversión" />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {hasPublicPrice ? (
                <PriceCard label="Público general" value={priceLabel(course.precioTotal)} />
              ) : null}
              {memberPrice > 0 ? (
                <PriceCard label="Miembros ASNaMaTeM" value={formatDop(memberPrice)} />
              ) : null}
              <PriceCard label="Anticipo de reserva" value={formatDop(course.montoAnticipo || 1000)} highlight />
            </div>
            {paymentPlan.length ? (
              <div className="mt-5 rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8D7530]">Plan de pago</p>
                <BulletList items={paymentPlan} className="mt-3" />
              </div>
            ) : null}
            <p className="mt-4 text-xs leading-6 text-[#6B6048]">
              {reservationNote
                ? `${reservationNote}. `
                : "El anticipo no es reembolsable ni transferible a otro curso. "}
              Se descuenta del precio total del programa.
            </p>
          </article>

          {/* Certificación */}
          {(certifications.length || facilitator) ? (
            <article id="certificacion" className={sectionClass}>
              <SectionTitle icon={Award} eyebrow="Respaldo" title="Certificación" />
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {certifications.length ? (
                  <InfoCard icon={Award} title="Al finalizar recibes">
                    <BulletList items={certifications} />
                  </InfoCard>
                ) : null}
                {facilitator ? (
                  <div className="rounded-2xl border border-[#D4AF37]/25 bg-white p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8D7530]">Facilitadora</p>
                    <p className="suvoga-serif mt-2 text-lg font-semibold text-[#0D3B22]">{facilitator}</p>
                    <p className="mt-1 text-xs text-[#6B6048]">Directora de SuVoGa Escuela y Centro de Masajes</p>
                  </div>
                ) : null}
              </div>
              {record.requiresLegalReview ? (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#D4AF37]/35 bg-[#0D3B22]/[0.03] p-5">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A028]" />
                  <p className="text-xs leading-6 text-[#4E6658]">
                    Este programa aborda técnicas profesionales que pueden estar reguladas.
                    Está dirigido a personal autorizado y su ejercicio queda sujeto a la
                    legislación local; la formación no habilita por sí sola para ejercer
                    fuera del marco legal vigente.
                  </p>
                </div>
              ) : null}
            </article>
          ) : null}

          {/* Recursos */}
          {(hasVideo || hasPdf) ? (
            <article id="recursos" className={sectionClass}>
              <SectionTitle icon={ScrollText} eyebrow="Material de apoyo" title="Recursos" />
              <div className="mt-5 space-y-5">
                {hasVideo ? <YouTubeLiteEmbed url={course.youtube_url} title={course.nombre} /> : null}
                {hasPdf ? <CoursePdfResource url={course.pdf_drive_url} courseName={course.nombre} /> : null}
              </div>
            </article>
          ) : null}

          {/* Mobile reservation */}
          <div className="lg:hidden">
            <CourseLandingSignup course={course} />
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside className="hidden lg:block">
          <CourseLandingSignup course={course} />
        </aside>
      </section>

      {/* Related strip */}
      <section className="border-t border-[#D4AF37]/20 bg-[#F6EFE2]/50">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">Explora más formaciones</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#4E6658]">
            Descubre el catálogo completo de SuVoGa Academia y encuentra tu próximo paso profesional.
          </p>
          <Link
            href="/cursos"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-7 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332]"
          >
            <Users className="h-4 w-4" />
            Ver todos los cursos
          </Link>
        </div>
      </section>
    </main>
  );
}

// --- Small presentational helpers (server components) -------------------------

function SectionTitle({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white text-[#C5A028]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C5A028]">{eyebrow}</p>
        <h2 className="suvoga-serif text-2xl font-semibold leading-tight text-[#0D3B22]">{title}</h2>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  tone = "default",
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tone?: "default" | "warn";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        tone === "warn" ? "border-[#C9913A]/30 bg-[#FBF4E6]" : "border-[#D4AF37]/25 bg-white"
      }`}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-[#0D3B22]">
        <Icon className="h-4 w-4 text-[#C5A028]" />
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function BulletList({
  items,
  tone = "default",
  className = "",
}: {
  items: string[];
  tone?: "default" | "warn";
  className?: string;
}) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-[#4E6658]">
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone === "warn" ? "text-[#C9913A]" : "text-[#C5A028]"}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PriceCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-5 text-center shadow-sm ${
        highlight ? "border-[#0D3B22] bg-[#0D3B22] text-[#FDFBF7]" : "border-[#D4AF37]/25 bg-white text-[#0D3B22]"
      }`}
    >
      <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${highlight ? "text-[#D4AF37]" : "text-[#8D7530]"}`}>
        {label}
      </p>
      <p className="suvoga-serif mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
