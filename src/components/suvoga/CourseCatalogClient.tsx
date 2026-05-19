"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { CalendarDays, GraduationCap, Sparkles, Users } from "lucide-react";
import { suvogaCourses } from "@/data/courses";
import { InscriptionModal } from "@/components/suvoga/InscriptionModal";

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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={gridVariants}
      >
        {courses.map((course) => {
          const Icon = typeIcon(course.tipo);

          return (
            <motion.article
              key={course.idServicio}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group flex min-h-[330px] flex-col rounded-3xl border border-[#D4AF37]/30 bg-white p-5 text-[#0D3B22] shadow-sm shadow-[#0D3B22]/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/70 hover:shadow-xl hover:shadow-[#D4AF37]/20"
            >
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/curso/${course.idServicio}`}
                  aria-label={`Ver detalles de ${course.nombre}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#FDFBF7] text-[#0D3B22] transition-colors duration-300 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <Icon className="h-5 w-5" />
                </Link>
                <span className="rounded-full border border-[#D4AF37]/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0D3B22]/55 transition-colors duration-300 group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 group-hover:text-[#8D7530]">
                  {course.category || "General"}
                </span>
              </div>

              <Link
                href={`/curso/${course.idServicio}`}
                className="mt-5 block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
              >
                <h3 className="suvoga-serif text-2xl font-semibold leading-tight text-[#0D3B22] transition-colors hover:text-[#145332]">
                {course.nombre}
                </h3>
              </Link>
              <p className="mt-3 line-clamp-3 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] font-sans text-sm leading-6 text-[#0D3B22]/70">
                {course.description}
              </p>

              <div className="mt-auto space-y-3 pt-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-[#0D3B22]/10 bg-[#0D3B22]/[0.03] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B6048]">
                      Precio
                    </p>
                    <p className="mt-1 font-semibold text-[#0D3B22]">
                      {priceLabel(course.precioTotal)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#FDFBF7] p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8D7530]">
                      Anticipo
                    </p>
                    <p className="mt-1 font-semibold text-[#0D3B22]">
                      {formatDop(course.montoAnticipo || 1000)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-[#D4AF37]/20 pt-4 text-sm text-[#4E6658]">
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0D3B22]" />
                    {course.cuposTotales || 12} cupos
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#0D3B22]" />
                    Abierto
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCourse(course)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#0D3B22] px-4 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                >
                  Inscribirse hoy
                </button>
                <Link
                  href={`/curso/${course.idServicio}`}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-white px-4 text-sm font-semibold text-[#0D3B22] transition-colors hover:border-[#D4AF37]/70 hover:bg-[#FDFBF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                >
                  Ver Detalles
                </Link>
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
