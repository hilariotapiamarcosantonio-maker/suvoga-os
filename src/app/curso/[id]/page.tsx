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
import { CourseHeroCTA } from "@/components/suvoga/CourseHeroCTA";

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

  // Fallbacks for standard items
  const includesList = course.incluye && course.incluye.length > 0 ? course.incluye : [];
  const forWhoList = course.para_quien_es && course.para_quien_es.length > 0 ? course.para_quien_es : [];
  const whatYouWillLearnList = course.que_aprenderas && course.que_aprenderas.length > 0 ? course.que_aprenderas : learningItems;

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0D3B22]">
      {/* Premium Split Hero Section */}
      <section className="relative bg-gradient-to-br from-[#072515] via-[#0D3B22] to-[#124026] text-[#FDFBF7] overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Background Decorative Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded-lg px-2 py-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          {/* Two-Column Split Layout */}
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Information & Main Details */}
            <div className="space-y-6 lg:col-span-7">
              {/* Badges Row */}
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
              <h1 className="suvoga-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                {course.nombre}
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl text-lg leading-relaxed text-[#EAE2D0] font-sans font-light">
                {course.subtitulo_premium || course.description}
              </p>

              {/* Duration & Modality Row */}
              <div className="flex flex-wrap gap-6 pt-2 text-sm text-[#EAE2D0]">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 text-[#D4AF37]" />
                  <span>{course.duracion || duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#D4AF37]" />
                  <span>{course.modalidad || "Práctica presencial"}</span>
                </div>
              </div>

              {/* Investment & Availability Highlights */}
              <div className="grid grid-cols-3 gap-4 border-t border-b border-white/10 py-5 my-6 max-w-xl">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Inversión</span>
                  <p className="mt-1 text-xl font-bold text-white sm:text-2xl">{priceLabel(course.precioTotal)}</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Anticipo</span>
                  <p className="mt-1 text-xl font-bold text-white sm:text-2xl">{formatDop(course.montoAnticipo)}</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Cupos</span>
                  <p className="mt-1 text-xl font-bold text-white sm:text-2xl">{course.cuposTotales || 12} disponibles</p>
                </div>
              </div>

              {/* CTA Action Button */}
              <div className="pt-2">
                <CourseHeroCTA course={course} />
              </div>
            </div>

            {/* Right Column: Visual Course Image Frame */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none group overflow-hidden rounded-[2rem] border border-[#D4AF37]/35 bg-[#0D3B22]/40 p-2.5 shadow-2xl shadow-black/45">
                <div className="relative overflow-hidden rounded-[1.75rem] aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                  <img
                    src={bgImageRelativePath}
                    alt={course.nombre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Materials Section (Video & PDF Grid) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
            Material de apoyo
          </span>
          <h2 className="suvoga-serif mt-2 text-3xl font-semibold text-[#0D3B22]">
            Conoce el curso
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column: YouTube Video Embed */}
          <div className="h-full">
            {course.youtube_url ? (
              <div className="h-full flex flex-col justify-between rounded-3xl border border-[#D4AF37]/20 bg-white p-6 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                    <Video className="h-4 w-4 text-[#C5A028]" />
                  </div>
                  <h3 className="suvoga-serif text-lg font-semibold text-[#0D3B22]">
                    Video de Presentación
                  </h3>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#D4AF37]/10 shadow-sm">
                  <iframe
                    src={course.youtube_url}
                    title={`Presentación del curso ${course.nombre}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-dashed border-[#D4AF37]/30 bg-[#FDFBF7]/50 min-h-[240px]">
                <Video className="h-8 w-8 text-[#C5A028]/40 mb-3" />
                <h3 className="suvoga-serif text-lg font-semibold text-[#0D3B22]/80">
                  Video de Presentación
                </h3>
                <p className="text-xs text-[#6B6048] mt-1 max-w-xs leading-relaxed">
                  El video de presentación de esta técnica está en proceso de edición y estará disponible próximamente.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: PDF Download / Syllabus Info */}
          <div className="h-full">
            {course.pdf_drive_url ? (
              <div className="h-full flex flex-col justify-between rounded-3xl border border-[#D4AF37]/20 bg-[#0D3B22] p-6 shadow-md text-[#FDFBF7] min-h-[240px]">
                <div className="space-y-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-[#FDFBF7]">
                    <FileText className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="suvoga-serif text-xl font-semibold text-white">
                    Plan de Estudios Completo
                  </h3>
                  <p className="text-xs text-[#EAE2D0] leading-relaxed">
                    Descarga el temario oficial en PDF. Incluye el cronograma de clases, requisitos prácticos, normas de egreso y políticas académicas completas.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href={course.pdf_drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 text-sm font-semibold text-[#0D3B22] shadow-md hover:bg-[#C5A028] transition-all duration-300 hover:scale-[1.01]"
                  >
                    <Download className="h-4 w-4" />
                    Descargar Programa PDF
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-dashed border-[#0D3B22]/15 bg-[#F5F0E5] min-h-[240px]">
                <Download className="h-8 w-8 text-[#0D3B22]/30 mb-3" />
                <h3 className="suvoga-serif text-lg font-semibold text-[#0D3B22]">
                  Programa PDF del Curso
                </h3>
                <p className="text-xs text-[#6B6048] mt-1 max-w-xs leading-relaxed">
                  El dossier informativo con el temario extendido del curso estará disponible próximamente para su descarga.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Details Grid */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:py-12">
        {/* Left Column: Academic Content */}
        <div className="space-y-8">
          {/* Resumen del programa Section */}
          <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
              Resumen del programa
            </span>
            <h2 className="suvoga-serif mt-3 text-3xl font-semibold leading-tight text-[#0D3B22]">
              Una formación diseñada para el éxito práctico.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4E6658]">
              {course.description}
            </p>

            {/* 3 Key Benefits */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#FDFBF7] border border-[#0D3B22]/10 p-4">
                <h4 className="font-semibold text-sm text-[#0D3B22]">Práctica Intensiva Real</h4>
                <p className="text-xs text-[#6B6048] mt-1">
                  Clases prácticas guiadas sobre camilla con retroalimentación en tiempo real.
                </p>
              </div>
              <div className="rounded-2xl bg-[#FDFBF7] border border-[#0D3B22]/10 p-4">
                <h4 className="font-semibold text-sm text-[#0D3B22]">Grupos Exclusivos</h4>
                <p className="text-xs text-[#6B6048] mt-1">
                  Máximo 12 participantes para asegurar atención personalizada del facilitador.
                </p>
              </div>
              <div className="rounded-2xl bg-[#FDFBF7] border border-[#0D3B22]/10 p-4">
                <h4 className="font-semibold text-sm text-[#0D3B22]">Salida Laboral Premium</h4>
                <p className="text-xs text-[#6B6048] mt-1">
                  Técnicas y protocolos alineados a los estándares de spas de alta gama.
                </p>
              </div>
            </div>

            {/* Ideal para... */}
            <div className="mt-6 border-t border-[#0D3B22]/10 pt-5">
              <h4 className="font-semibold text-[#0D3B22] text-sm">Ideal para:</h4>
              <ul className="mt-2 grid gap-2 text-xs text-[#4E6658] sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  Principiantes que desean iniciar en la terapia de masajes.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  Profesionales de la salud y estética corporal.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  Emprendedores en el sector de bienestar y spa.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  Terapeutas que buscan certificar sus conocimientos.
                </li>
              </ul>
            </div>
          </article>

          {/* Mobile Reservation Card (Only Visible on Mobile/Tablet) */}
          <div className="block lg:hidden">
            <CourseLandingSignup course={course} />
          </div>

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

        {/* Right Column: Sticky Sidebar Reservation Card (Desktop Only) */}
        <div className="hidden lg:block">
          <CourseLandingSignup course={course} />
        </div>
      </section>
    </main>
  );
}
