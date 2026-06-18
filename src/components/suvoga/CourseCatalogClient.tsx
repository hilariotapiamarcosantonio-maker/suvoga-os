"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { CalendarDays, GraduationCap, Sparkles, Users } from "lucide-react";
import { suvogaCourses } from "@/data/courses";
import { InscriptionModal } from "@/components/suvoga/InscriptionModal";

import { useReducedMotion } from "framer-motion";

type Course = (typeof suvogaCourses)[number];

const DEMO_COURSES_STORAGE_KEY = "suvoga_demo_courses";
const demoCourseDescription =
  "Programa formativo de bienestar y técnica aplicada, creado para desarrollar habilidades profesionales con acompañamiento cercano.";

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.055,
    },
  },
};

function formatDop(value: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);
}

function priceLabel(value: number) {
  return value > 0 ? formatDop(value) : "";
}

function typeIcon(type: string) {
  return type.toLowerCase().includes("curso") ? GraduationCap : Sparkles;
}

function normalizeStoredCourses(value: unknown): Course[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const course = item as Partial<Course>;
      const idServicio = String(course.idServicio ?? "").trim();
      const nombre = String(course.nombre ?? "").trim();
      if (!idServicio || !nombre) return null;

      return {
        idServicio,
        nombre,
        tipo: String(course.tipo ?? "Curso"),
        category: String(course.category ?? "General").trim() || "General",
        description:
          String(course.description ?? demoCourseDescription).trim() ||
          demoCourseDescription,
        precioTotal: Number(course.precioTotal) || 0,
        montoAnticipo: Number(course.montoAnticipo) || 1000,
        cuposTotales: Number(course.cuposTotales) || 12,
      };
    })
    .filter((course): course is Course => Boolean(course));
}

function readDemoCourses() {
  if (typeof window === "undefined") return [];

  try {
    return normalizeStoredCourses(
      JSON.parse(window.localStorage.getItem(DEMO_COURSES_STORAGE_KEY) || "[]")
    );
  } catch {
    return [];
  }
}

function mergeCourses(baseCourses: Course[], demoCourses: Course[]) {
  const byId = new Map<string, Course>();

  [...baseCourses, ...demoCourses].forEach((course) => {
    byId.set(course.idServicio, course);
  });

  return Array.from(byId.values());
}

export function CourseCatalogClient() {
  const [courses, setCourses] = useState<Course[]>(suvogaCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  useEffect(() => {
    function syncDemoCourses() {
      setCourses(mergeCourses(suvogaCourses, readDemoCourses()));
    }

    syncDemoCourses();
    window.addEventListener("storage", syncDemoCourses);
    window.addEventListener("suvoga-demo-courses-updated", syncDemoCourses);

    return () => {
      window.removeEventListener("storage", syncDemoCourses);
      window.removeEventListener("suvoga-demo-courses-updated", syncDemoCourses);
    };
  }, []);

  return (
    <>
      <motion.div
        className="grid gap-6 sm:gap-4 md:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={gridVariants}
      >
        {courses.map((course) => {
          const Icon = typeIcon(course.tipo);
          const courseIdNum = parseInt(course.idServicio.replace("CUR-", ""), 10);
          const ext = (!isNaN(courseIdNum) && courseIdNum >= 18 && courseIdNum <= 25) ? "svg" : "png";
          const cardImageUrl = course.imagen_url || `/images/courses/${course.idServicio.toLowerCase()}.${ext}`;
          const courseHref = `/curso/${course.slug || course.idServicio}`;
          const hasPublicPrice = course.precioTotal > 0;

          return (
            <motion.article
              key={course.idServicio}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -5 }}
              whileTap={shouldReduceMotion ? { scale: 0.99 } : { scale: 0.97 }}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-white text-[#0D3B22] shadow-sm shadow-[#0D3B22]/5 transition-all duration-300 hover:border-[#D4AF37]/70 hover:shadow-xl hover:shadow-[#D4AF37]/20"
            >
              {/* Image Header */}
              <div className="relative w-full overflow-hidden h-[150px] sm:h-[180px] md:h-[200px] shrink-0">
                <img
                  src={cardImageUrl}
                  alt={course.nombre}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "linear-gradient(rgba(13, 59, 34, 0.12), rgba(13, 59, 34, 0.42))",
                  }}
                />
                
                {/* Badge Overlay */}
                {course.category ? (
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-[#0D3B22]/85 backdrop-blur-sm border border-[#D4AF37]/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                      {course.category}
                    </span>
                  </div>
                ) : null}
                
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-grow p-4 sm:p-5">
                <Link
                  href={courseHref}
                  className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <h3 className="suvoga-serif text-lg sm:text-xl font-semibold leading-tight text-[#0D3B22] transition-colors hover:text-[#145332]">
                    {course.nombre}
                  </h3>
                </Link>

                <p className="mt-3 line-clamp-3 overflow-hidden font-sans text-xs leading-relaxed text-[#4E6658] flex-grow">
                  {course.description}
                </p>

                <div className="mt-5 space-y-4">
                  <div className={`grid gap-2 text-xs ${hasPublicPrice ? "grid-cols-2" : "grid-cols-1"}`}>
                    {hasPublicPrice ? (
                      <div className="rounded-xl border border-[#0D3B22]/10 bg-[#0D3B22]/[0.03] p-2 sm:p-3 sm:rounded-2xl">
                        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B6048]">
                          Precio
                        </p>
                        <p className="mt-1 font-semibold text-[#0D3B22] text-xs sm:text-sm">
                          {priceLabel(course.precioTotal)}
                        </p>
                      </div>
                    ) : null}
                    <div className="rounded-xl border border-[#D4AF37]/25 bg-[#FDFBF7] p-2 sm:p-3 sm:rounded-2xl">
                      <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8D7530]">
                        Anticipo
                      </p>
                      <p className="mt-1 font-semibold text-[#0D3B22] text-xs sm:text-sm">
                        {formatDop(course.montoAnticipo || 1000)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#D4AF37]/20 pt-4 text-xs text-[#4E6658]">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Users className="h-4 w-4 text-[#0D3B22]" />
                      {course.cuposTotales || 12} cupos
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <CalendarDays className="h-4 w-4 text-[#0D3B22]" />
                      {course.fechaTexto || "Próxima fecha por anunciar"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCourse(course)}
                      className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#0D3B22] px-4 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                    >
                      Inscribirse hoy
                    </button>
                    <Link
                      href={courseHref}
                      className="inline-flex h-10 w-full items-center justify-center rounded-2xl text-xs sm:text-sm font-semibold text-[#0D3B22] underline underline-offset-4 decoration-[#D4AF37]/50 hover:text-[#145332] hover:decoration-[#D4AF37] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <InscriptionModal
        course={selectedCourse}
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
      />
    </>
  );
}
