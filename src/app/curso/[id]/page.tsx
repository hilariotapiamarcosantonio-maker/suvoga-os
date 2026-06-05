import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  Clock3,
  Sparkles,
  Video,
  Download,
  Check,
  ShieldCheck,
  UserCheck,
  FileText,
  BookOpen,
} from "lucide-react";
import { suvogaCourses } from "@/data/courses";
import { CourseLandingSignup } from "@/components/suvoga/CourseLandingSignup";

type CoursePageProps = {
  params: {
    id: string;
  };
};

const learningItems = [
  "Protocolos profesionales para ejecutar la técnica con seguridad.",
  "Criterios de atención, postura y ritmo para una experiencia premium.",
  "Secuencia práctica para llevar el aprendizaje al servicio real.",
  "Bases de comunicación para orientar al cliente antes y después de la sesión.",
];

function formatDop(value: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);
}

function priceLabel(value: number) {
  return value > 0 ? formatDop(value) : "A consultar";
}

function durationLabel(description: string) {
  const match = description.match(/(\d+\s+clases?)/i);
  return match?.[1] ?? "Duración según calendario";
}

function findCourse(id: string) {
  const decodedId = decodeURIComponent(id);

  return suvogaCourses.find(
    (course) => course.idServicio.toLowerCase() === decodedId.toLowerCase()
  );
}

export function generateStaticParams() {
  return suvogaCourses.map((course) => ({
    id: course.idServicio,
  }));
}

export function generateMetadata({ params }: CoursePageProps) {
  const course = findCourse(params.id);

  if (!course) {
    return {
      title: "Curso no encontrado | SuVoGa",
    };
  }

  return {
    title: `${course.nombre} | SuVoGa Escuela de Masajes`,
    description: course.description,
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = findCourse(params.id);

  if (!course) {
    notFound();
  }

  const duration = durationLabel(course.description);

  // Resolving image paths
  const courseIdNum = parseInt(course.idServicio.replace("CUR-", ""), 10);
  const ext = (courseIdNum >= 18 && courseIdNum <= 25) ? "svg" : "png";
  const bgImageRelativePath = course.imagen_url || `/images/courses/${course.idServicio.toLowerCase()}.${ext}`;

  const heroStyle = bgImageRelativePath
    ? {
        backgroundImage: `linear-gradient(rgba(13, 59, 34, 0.88), rgba(13, 59, 34, 0.96)), url(${bgImageRelativePath})`,
      }
    : {
        backgroundImage: `linear-gradient(120deg, rgba(13, 59, 34, 0.95), rgba(13, 59, 34, 0.85))`,
      };

  // Fallbacks for standard items
  const includesList = course.incluye && course.incluye.length > 0 ? course.incluye : [];
  const forWhoList = course.para_quien_es && course.para_quien_es.length > 0 ? course.para_quien_es : [];
  const whatYouWillLearnList = course.que_aprenderas && course.que_aprenderas.length > 0 ? course.que_aprenderas : learningItems;

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0D3B22]">
      {/* Premium Hero Section */}
      <section
        className="relative bg-[#0D3B22] text-[#FDFBF7] overflow-hidden bg-cover bg-center"
        style={heroStyle}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D3B22]/60 to-[#0D3B22]/95 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded-lg px-2 py-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-center">
            <div className="max-w-4xl space-y-6 animate-fade-in-up">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#0D3B22]/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37] backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  {course.category}
                </span>
                {course.nivel && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <Award className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Nivel: {course.nivel}
                  </span>
                )}
                {course.certificado_incluido && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
                    Certificación Oficial
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="suvoga-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7.5xl">
                {course.nombre}
              </h1>

              {/* Subtitle */}
              {course.subtitulo_premium ? (
                <p className="max-w-3xl text-lg leading-relaxed text-[#EAE2D0] font-sans font-light">
                  {course.subtitulo_premium}
                </p>
              ) : (
                <p className="max-w-3xl text-lg leading-relaxed text-[#EAE2D0] font-sans font-light">
                  {course.description}
                </p>
              )}

              {/* Badges row */}
              <div className="flex flex-wrap gap-6 pt-4 text-sm text-[#EAE2D0]">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-[#D4AF37]" />
                  <span>{course.duracion || duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#D4AF37]" />
                  <span>{course.modalidad || "Práctica presencial"}</span>
                </div>
              </div>
            </div>

            {/* Sidebar Pricing & Call to Action (Hero Version) */}
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-white/[0.06] p-6 shadow-xl backdrop-blur-md space-y-6 animate-fade-in-up animation-delay-100">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-xs uppercase tracking-widest text-[#EAE2D0]">Reserva de Cupo</span>
                <span className="rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-3 py-0.5 text-xs font-semibold text-[#D4AF37]">
                  {course.cuposTotales} cupos
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Inversión</span>
                  <p className="mt-1 text-2xl font-bold text-white">{priceLabel(course.precioTotal)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Anticipo</span>
                  <p className="mt-1 text-2xl font-bold text-white">{formatDop(course.montoAnticipo)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:py-16">
        <div className="space-y-10">

          {/* YouTube Embed Video Section */}
          {course.youtube_url ? (
            <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                  <Video className="h-5 w-5 text-[#C5A028]" />
                </div>
                <h3 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">Video de Presentación</h3>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#D4AF37]/20 shadow-md">
                <iframe
                  src={course.youtube_url}
                  title={`Presentación del curso ${course.nombre}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </article>
          ) : (
            <article className="rounded-3xl border border-[#D4AF37]/10 bg-white/50 p-6 shadow-sm sm:p-8 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
              <Video className="h-10 w-10 text-[#C5A028]/50" />
              <div>
                <h4 className="suvoga-serif text-lg font-semibold text-[#0D3B22]/80">Video de Presentación</h4>
                <p className="text-sm text-[#6B6048] mt-1">El video de presentación está en proceso de edición y estará disponible próximamente.</p>
              </div>
            </article>
          )}

          {/* Syllabus Download Block */}
          {course.pdf_drive_url ? (
            <article className="rounded-3xl border border-[#D4AF37]/25 bg-[#0D3B22] text-[#FDFBF7] p-6 shadow-xl sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h3 className="suvoga-serif text-2xl font-semibold text-white">Plan de Estudios Completo</h3>
                <p className="text-sm text-[#EAE2D0] max-w-md">Descarga el PDF detallado con el temario completo, requisitos, políticas e información de egreso.</p>
              </div>
              <Link
                href={course.pdf_drive_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-2xl bg-[#D4AF37] px-6 text-sm font-semibold text-[#0D3B22] shadow-md hover:bg-[#C5A028] transition-all duration-300 hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" />
                Descargar Programa PDF
              </Link>
            </article>
          ) : (
            <article className="rounded-3xl border border-[#D4AF37]/15 bg-[#F5F0E5] p-6 shadow-sm sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="suvoga-serif text-xl font-semibold text-[#0D3B22]">Dossier Informativo</h3>
                <p className="text-sm text-[#6B6048]">El plan de estudios detallado en formato PDF estará disponible próximamente.</p>
              </div>
              <button
                disabled
                className="inline-flex h-12 shrink-0 items-center gap-2 rounded-2xl bg-[#0D3B22]/10 px-6 text-sm font-semibold text-[#0D3B22]/50 border border-[#0D3B22]/10 cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                PDF Disponible Pronto
              </button>
            </article>
          )}

          {/* Description Section */}
          <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
              Sobre esta formación
            </span>
            <h2 className="suvoga-serif mt-3 text-3xl font-semibold leading-tight text-[#0D3B22]">
              Una experiencia educativa técnica, profunda y consciente.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#4E6658]">
              {course.description}
            </p>
          </article>

          {/* Qué aprenderás Section */}
          <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                <BookOpen className="h-5 w-5 text-[#C5A028]" />
              </div>
              <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">
                Contenido Curricular: Qué aprenderás
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {whatYouWillLearnList.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-2xl border border-[#0D3B22]/10 bg-[#FDFBF7] p-5 hover:border-[#D4AF37]/50 transition-colors duration-300"
                >
                  <div className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0D3B22] text-[#FDFBF7] text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-6 text-[#4E6658]">{item}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Includes Section (if has inclusions) */}
          {includesList.length > 0 && (
            <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                  <FileText className="h-5 w-5 text-[#C5A028]" />
                </div>
                <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">
                  El Programa Incluye
                </h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {includesList.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-start p-3 bg-[#0D3B22]/[0.02] border border-[#0D3B22]/5 rounded-2xl"
                  >
                    <Check className="h-5 w-5 text-[#C5A028] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#4E6658] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Para quién es Section (if has target audience) */}
          {forWhoList.length > 0 && (
            <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                  <UserCheck className="h-5 w-5 text-[#C5A028]" />
                </div>
                <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">
                  ¿Para quién es esta formación?
                </h2>
              </div>
              <div className="mt-6 space-y-4">
                {forWhoList.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start border-b border-[#0D3B22]/5 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                    <span className="text-sm text-[#4E6658] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

        </div>

        {/* Dynamic Sidebar Enrollment Form */}
        <CourseLandingSignup course={course} />
      </section>
    </main>
  );
}
