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
  Quote,
} from "lucide-react";
import { suvogaCourses } from "@/data/courses";
import { CourseLandingSignup } from "@/components/suvoga/CourseLandingSignup";
import { CourseHeroCTA } from "@/components/suvoga/CourseHeroCTA";
import { studentTestimonials } from "@/data/testimonials";
import { graduatesList } from "@/data/graduates";
import { contactInfo } from "@/data/contact";
import { MessageCircle } from "lucide-react";
import { Instagram } from "@/components/suvoga/BrandIcons";


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
  const isRealVideo = course.youtube_url && !course.youtube_url.includes("dQw4w9WgXcQ");

  // Resolving image paths
  const courseIdNum = parseInt(course.idServicio.replace("CUR-", ""), 10);
  const ext = (courseIdNum >= 18 && courseIdNum <= 25) ? "svg" : "png";
  const bgImageRelativePath = course.imagen_url || `/images/courses/${course.idServicio.toLowerCase()}.${ext}`;

  // Fallbacks for standard items
  const includesList = course.incluye && course.incluye.length > 0 ? course.incluye : [];
  const forWhoList = course.para_quien_es && course.para_quien_es.length > 0 ? course.para_quien_es : [];
  const whatYouWillLearnList = course.que_aprenderas && course.que_aprenderas.length > 0 ? course.que_aprenderas : learningItems;

  // Find related testimonials or graduates for trust section
  const relatedTestimonial = studentTestimonials.find(
    (t) => t.curso.toLowerCase() === course.nombre.toLowerCase()
  );
  const relatedGraduate = graduatesList.find(
    (g) => g.cursoCompletado.toLowerCase() === course.nombre.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0D3B22]">
      {/* Premium Split Hero Section */}
      <section className="relative bg-gradient-to-br from-[#072515] via-[#0D3B22] to-[#124026] text-[#FDFBF7] overflow-hidden py-12 sm:py-16 lg:py-24">
        {/* Background Decorative Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded-lg px-2 py-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          {/* Two-Column Split Layout */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Information & Main Details */}
            <div className="space-y-5 lg:col-span-7">
              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#0D3B22]/60 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37] backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  {course.category}
                </span>
                {course.nivel && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#D4AF37]" />
                    Nivel: {course.nivel}
                  </span>
                )}
                {course.certificado_incluido && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#D4AF37]" />
                    Certificación Oficial
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="suvoga-serif text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {course.nombre}
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl text-sm sm:text-lg leading-relaxed text-[#EAE2D0] font-sans font-light">
                {course.subtitulo_premium || course.description}
              </p>

              {/* Mobile visual image - visible early on mobile, hidden on desktop */}
              <div className="block lg:hidden w-full my-5">
                <div className="relative w-full max-w-md mx-auto group overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-[#0D3B22]/40 p-2 shadow-2xl shadow-black/45">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-[16/10]">
                    <img
                      src={bgImageRelativePath}
                      alt={course.nombre}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Duration & Modality Row */}
              <div className="flex flex-wrap gap-5 pt-1 text-xs sm:text-sm text-[#EAE2D0]">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4.5 w-4.5 text-[#D4AF37]" />
                  <span>{course.duracion || duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4.5 w-4.5 text-[#D4AF37]" />
                  <span>{course.modalidad || "Práctica presencial"}</span>
                </div>
              </div>

              {/* Investment & Availability Highlights */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-b border-white/10 py-4 my-4 max-w-xl text-center sm:text-left">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Inversión</span>
                  <p className="mt-0.5 text-base font-bold text-white sm:text-2xl">{priceLabel(course.precioTotal)}</p>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Anticipo</span>
                  <p className="mt-0.5 text-base font-bold text-white sm:text-2xl">{formatDop(course.montoAnticipo)}</p>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">Cupos</span>
                  <p className="mt-0.5 text-base font-bold text-white sm:text-2xl">{course.cuposTotales || 12} libres</p>
                </div>
              </div>

              {/* CTA Action Button */}
              <div className="pt-2">
                <CourseHeroCTA course={course} />
              </div>
            </div>

            {/* Right Column: Visual Course Image Frame - Desktop Only */}
            <div className="hidden lg:flex lg:col-span-5 w-full justify-center">
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
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
            Material de apoyo
          </span>
          <h2 className="suvoga-serif mt-2 text-2xl sm:text-3xl font-semibold text-[#0D3B22]">
            Conoce el curso
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 w-full max-w-full min-w-0 overflow-hidden">
          {/* Left Column: YouTube Video Embed */}
          <div className="h-full w-full max-w-full min-w-0 overflow-hidden">
            {isRealVideo ? (
              <div className="h-full flex flex-col justify-between rounded-3xl border border-[#D4AF37]/20 bg-white p-5 sm:p-6 shadow-sm shadow-[#0D3B22]/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                    <Video className="h-4 w-4 text-[#C5A028]" />
                  </div>
                  <h3 className="suvoga-serif text-base sm:text-lg font-semibold text-[#0D3B22]">
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
              <div className="h-full flex flex-col items-center justify-center text-center p-5 sm:p-6 rounded-3xl border border-dashed border-[#D4AF37]/45 bg-[#0D3B22]/5 min-h-[220px] w-full max-w-full min-w-0 overflow-hidden">
                <Video className="h-7 w-7 text-[#C5A028] mb-3 shrink-0" />
                <h3 className="suvoga-serif text-base font-semibold text-[#0D3B22] max-w-full break-words text-balance">
                  Video de presentación próximamente
                </h3>
                <p className="text-[11px] text-[#6B6048] mt-2 max-w-xs leading-relaxed break-words text-balance">
                  El video explicativo sobre la metodología de esta cohorte estará disponible próximamente.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: PDF Download / Syllabus Info */}
          <div className="h-full w-full max-w-full min-w-0 overflow-hidden">
            {course.pdf_drive_url ? (
              <div className="h-full flex flex-col justify-between rounded-3xl border border-[#D4AF37]/20 bg-[#0D3B22] p-5 sm:p-6 shadow-md text-[#FDFBF7] min-h-[220px] w-full max-w-full min-w-0 overflow-hidden">
                <div className="space-y-3">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-[#FDFBF7]">
                    <FileText className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <h3 className="suvoga-serif text-lg sm:text-xl font-semibold text-white max-w-full break-words text-balance">
                    Plan de Estudios Completo
                  </h3>
                  <p className="text-xs text-[#EAE2D0] leading-relaxed break-words text-balance">
                    Descarga el temario oficial en PDF. Incluye el cronograma de clases, requisitos prácticos, normas de egreso y políticas académicas completas.
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href={course.pdf_drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-6 text-sm font-semibold text-[#0D3B22] shadow-md hover:bg-[#C5A028] transition-all duration-300 hover:scale-[1.01]"
                  >
                    <Download className="h-4 w-4" />
                    Ver temario del curso
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-5 sm:p-6 rounded-3xl border border-dashed border-[#D4AF37]/45 bg-[#0D3B22]/5 min-h-[220px] w-full max-w-full min-w-0 overflow-hidden">
                <Download className="h-7 w-7 text-[#C5A028] mb-3 shrink-0" />
                <h3 className="suvoga-serif text-base font-semibold text-[#0D3B22] max-w-full break-words text-balance">
                  Programa PDF disponible próximamente
                </h3>
                <p className="text-[11px] text-[#6B6048] mt-2 max-w-xs leading-relaxed break-words text-balance">
                  El dossier informativo y temario detallado de esta formación se encuentra en revisión académica.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Repeated CTA after supporting materials */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="rounded-3xl border border-[#D4AF37]/35 bg-[#0D3B22] p-6 sm:p-8 text-center text-[#FDFBF7] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />
          <h3 className="suvoga-serif text-xl sm:text-3xl font-semibold text-white leading-tight">
            Comienza tu formación en {course.nombre}
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-[#EAE2D0] max-w-xl mx-auto leading-relaxed">
            Reserva tu cupo hoy mismo para asegurar tu camilla y acompañamiento directo en esta cohorte de cupos reducidos.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-full sm:w-auto">
              <CourseHeroCTA course={course} />
            </div>
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#C5A028] transition-colors underline underline-offset-4 decoration-[#D4AF37]/30"
            >
              Explorar otros cursos
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Details Grid */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:py-12 w-full max-w-full overflow-hidden">
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

          {/* Confianza y resultados Section */}
          <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
                Seguridad y Calidad
              </span>
              <h2 className="suvoga-serif mt-2 text-3xl font-semibold text-[#0D3B22]">
                Confianza y resultados
              </h2>
            </div>

            {/* Trust Points Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#0D3B22]/[0.02] border border-[#0D3B22]/5">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0D3B22]">Cupos Limitados</h4>
                  <p className="text-[10px] text-[#6B6048] mt-0.5">Máximo 12 estudiantes por cohorte académica.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#0D3B22]/[0.02] border border-[#0D3B22]/5">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0D3B22]">Formación Práctica</h4>
                  <p className="text-[10px] text-[#6B6048] mt-0.5">Prácticas reales en cabina y camillas de spa.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#0D3B22]/[0.02] border border-[#0D3B22]/5">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0D3B22]">Certificación Oficial</h4>
                  <p className="text-[10px] text-[#6B6048] mt-0.5">Diploma oficial avalado por la academia SuVoGa.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#0D3B22]/[0.02] border border-[#0D3B22]/5">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0D3B22]">Acompañamiento</h4>
                  <p className="text-[10px] text-[#6B6048] mt-0.5">Mentoría directa del docente durante el aprendizaje.</p>
                </div>
              </div>
            </div>

            {/* Testimonial / Egresada Grid */}
            <div className="border-t border-[#0D3B22]/10 pt-6 grid gap-6 md:grid-cols-2">
              {/* Testimonio */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8D7530]">Experiencia en este programa</h4>
                {relatedTestimonial ? (
                  <div className="relative p-4 rounded-2xl bg-[#FDFBF7] border border-[#D4AF37]/20 shadow-sm">
                    <Quote className="absolute top-2 right-2 h-8 w-8 text-[#D4AF37]/10 pointer-events-none" />
                    <p className="text-xs italic leading-relaxed text-[#4E6658]">
                      &ldquo;{relatedTestimonial.comentario}&rdquo;
                    </p>
                    <div className="mt-3 flex items-center gap-2 pt-2 border-t border-[#0D3B22]/5">
                      <img src={relatedTestimonial.imagen_url} alt={relatedTestimonial.nombre} className="h-6 w-6 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold text-[#0D3B22] block leading-none">{relatedTestimonial.nombre}</span>
                        <span className="text-[9px] text-[#8D7530]">{relatedTestimonial.fuente}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FDFBF7]/50 border border-dashed border-[#0D3B22]/10 flex flex-col items-center justify-center text-center min-h-[120px]">
                    <span className="text-xs text-[#6B6048] italic">
                      Este espacio estará reservado para testimonios reales de alumnas de este programa.
                    </span>
                  </div>
                )}
              </div>

              {/* Egresada Destacada */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8D7530]">Egresada destacada</h4>
                {relatedGraduate ? (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#D4AF37]/20 shadow-sm">
                    <img src={relatedGraduate.imagen_url} alt={relatedGraduate.nombre} className="h-14 w-14 rounded-2xl object-cover border border-[#D4AF37]/30" />
                    <div>
                      <h5 className="suvoga-serif text-sm font-bold text-[#0D3B22]">{relatedGraduate.nombre}</h5>
                      <p className="text-[10px] text-[#8D7530] font-semibold">{relatedGraduate.cohorte}</p>
                      <span className="inline-flex items-center gap-1 rounded bg-[#0D3B22]/10 border border-[#0D3B22]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#0D3B22] mt-1.5">
                        {relatedGraduate.estado}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FDFBF7]/50 border border-dashed border-[#0D3B22]/10 flex flex-col items-center justify-center text-center min-h-[120px]">
                    <span className="text-xs text-[#6B6048] italic">
                      Próximamente se listarán perfiles destacados de egresadas de esta formación.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Contacto Directo Section */}
          <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
                ¿Tienes dudas sobre la inscripción o la academia?
              </span>
              <h2 className="suvoga-serif mt-2 text-2xl font-semibold text-[#0D3B22]">
                Ponte en contacto directo
              </h2>
              <p className="text-xs text-[#6B6048] mt-1 leading-relaxed">
                Estamos disponibles para ayudarte a elegir el mejor programa y resolver tus preguntas sobre horarios, pagos y certificación.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#0D3B22]/[0.02] border border-[#0D3B22]/5">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-[#0D3B22] block">Horario de Atención</span>
                  <span className="text-[#6B6048]">{contactInfo.horario}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#0D3B22]/[0.02] border border-[#0D3B22]/5">
                <div className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                <div className="text-xs text-[#6B6048]">
                  <span className="font-semibold text-[#0D3B22] block text-xs">Ubicación y Zona</span>
                  <span>{contactInfo.ubicacion}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={contactInfo.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D3B22] hover:text-[#C5A028] bg-[#FDFBF7] border border-[#D4AF37]/30 hover:bg-[#F7F1E7] rounded-xl px-4 py-2.5 transition-all shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-[#C5A028]" />
                Hablar por WhatsApp
              </a>
              <a
                href={contactInfo.instagram.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D3B22] hover:text-[#C5A028] bg-[#FDFBF7] border border-[#D4AF37]/30 hover:bg-[#F7F1E7] rounded-xl px-4 py-2.5 transition-all shadow-sm"
              >
                <Instagram className="h-4 w-4 text-[#C5A028]" />
                Ver Instagram
              </a>
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
