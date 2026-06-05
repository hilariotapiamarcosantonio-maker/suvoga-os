import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Sparkles,
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

  const bgImageRelativePath = `/images/courses/${course.idServicio.toLowerCase()}.png`;
  const bgImagePath = path.join(process.cwd(), "public", bgImageRelativePath);
  const hasBgImage = fs.existsSync(bgImagePath);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0D3B22]">
      <section
        className="relative bg-[#0D3B22] text-[#FDFBF7] overflow-hidden bg-cover bg-center"
        style={
          hasBgImage
            ? {
                backgroundImage: `linear-gradient(rgba(13, 59, 34, 0.88), rgba(13, 59, 34, 0.96)), url(${bgImageRelativePath})`,
              }
            : undefined
        }
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al catálogo
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                {course.category}
              </div>
              <h1 className="suvoga-serif mt-7 text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
                {course.nombre}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#EAE2D0] sm:text-lg">
                {course.description}
              </p>
            </div>

            <div className="rounded-3xl border border-[#D4AF37]/30 bg-white/[0.06] p-5 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Reserva clara
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                    Precio
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {priceLabel(course.precioTotal)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                    Cupos
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {course.cuposTotales || 12}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8 lg:py-16">
        <div className="space-y-6">
          <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
              Sobre este curso
            </p>
            <h2 className="suvoga-serif mt-3 text-4xl font-semibold leading-tight text-[#0D3B22]">
              Una formación práctica para elevar tu servicio.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#4E6658]">
              {course.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                <GraduationCap className="h-5 w-5 text-[#C5A028]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                  Categoría
                </p>
                <p className="mt-1 font-semibold text-[#0D3B22]">
                  {course.category}
                </p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                <Clock3 className="h-5 w-5 text-[#C5A028]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                  Duración
                </p>
                <p className="mt-1 font-semibold text-[#0D3B22]">
                  {duration}
                </p>
              </div>
              <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                <CalendarDays className="h-5 w-5 text-[#C5A028]" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
                  Modalidad
                </p>
                <p className="mt-1 font-semibold text-[#0D3B22]">
                  Práctica guiada
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22]">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
                  Lo que aprenderás
                </p>
                <h2 className="suvoga-serif mt-2 text-3xl font-semibold leading-tight text-[#0D3B22]">
                  Herramientas para atender con técnica y presencia.
                </h2>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {learningItems.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-[#0D3B22]/10 bg-[#FDFBF7] p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0D3B22]" />
                  <p className="text-sm leading-6 text-[#4E6658]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <CourseLandingSignup course={course} />
      </section>
    </main>
  );
}
