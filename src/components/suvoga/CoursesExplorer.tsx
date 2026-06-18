"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { SuvogaServicio } from "@/lib/crm-data/get-suvoga-data";
import {
  courseCategory,
  courseModality,
  durationBucket,
  durationHours,
  selectFeatured,
} from "@/lib/course-presentation";
import { CourseCard } from "@/components/suvoga/CourseCard";

type CoursesExplorerProps = {
  courses: SuvogaServicio[];
  categories: string[];
  modalities: string[];
  initialCategory?: string;
};

type SortKey = "relevancia" | "precio-asc" | "precio-desc" | "duracion" | "nombre";
const PAGE_SIZE = 9;

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "relevancia", label: "Relevancia" },
  { value: "nombre", label: "Nombre (A-Z)" },
  { value: "precio-asc", label: "Precio (menor a mayor)" },
  { value: "precio-desc", label: "Precio (mayor a menor)" },
  { value: "duracion", label: "Duración" },
];

const DURATIONS = ["Todas", "Corta", "Media", "Extensa"] as const;

export function CoursesExplorer({
  courses,
  categories,
  modalities,
  initialCategory = "Todas",
}: CoursesExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [modality, setModality] = useState("Todas");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("Todas");
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const featured = useMemo(() => selectFeatured(courses, 3), [courses]);

  const hasActiveFilters =
    query.trim() !== "" ||
    category !== "Todas" ||
    modality !== "Todas" ||
    duration !== "Todas";

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = courses.filter((course) => {
      if (category !== "Todas" && courseCategory(course) !== category) return false;
      if (modality !== "Todas" && courseModality(course) !== modality) return false;
      if (duration !== "Todas" && durationBucket(course) !== duration) return false;
      if (needle) {
        const haystack = `${course.nombre} ${course.description} ${courseCategory(course)}`.toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "nombre":
          return a.nombre.localeCompare(b.nombre, "es");
        case "precio-asc":
          return (a.precioTotal || Infinity) - (b.precioTotal || Infinity);
        case "precio-desc":
          return (b.precioTotal || 0) - (a.precioTotal || 0);
        case "duracion":
          return durationHours(a) - durationHours(b);
        default:
          return (a.orden_destacado ?? 99) - (b.orden_destacado ?? 99);
      }
    });
    return list;
  }, [courses, query, category, modality, duration, sort]);

  const shown = filtered.slice(0, visible);

  function resetFilters() {
    setQuery("");
    setCategory("Todas");
    setModality("Todas");
    setDuration("Todas");
    setVisible(PAGE_SIZE);
  }

  return (
    <div>
      {/* Featured strip (only when browsing without filters) */}
      {!hasActiveFilters ? (
        <div className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px flex-1 bg-[#D4AF37]/25" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
              Cursos destacados
            </span>
            <span className="h-px flex-1 bg-[#D4AF37]/25" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.idServicio} course={course} featured />
            ))}
          </div>
        </div>
      ) : null}

      {/* Controls */}
      <div className="sticky top-16 z-30 -mx-4 mb-8 border-y border-[#D4AF37]/20 bg-[#FDFBF7]/95 px-4 py-4 backdrop-blur-md md:top-20">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8D7530]" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder="Buscar curso, técnica o categoría..."
              className="h-12 w-full rounded-2xl border border-[#D4AF37]/35 bg-white pl-11 pr-4 text-sm text-[#0D3B22] outline-none transition-all placeholder:text-[#9A927F] focus:border-[#0D3B22] focus:ring-1 focus:ring-[#0D3B22]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Filtrar por categoría"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              className="h-10 rounded-xl border border-[#D4AF37]/35 bg-white px-3 text-xs font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
            >
              <option value="Todas">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              aria-label="Filtrar por modalidad"
              value={modality}
              onChange={(e) => {
                setModality(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              className="h-10 rounded-xl border border-[#D4AF37]/35 bg-white px-3 text-xs font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
            >
              <option value="Todas">Toda modalidad</option>
              {modalities.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select
              aria-label="Filtrar por duración"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value as (typeof DURATIONS)[number]);
                setVisible(PAGE_SIZE);
              }}
              className="h-10 rounded-xl border border-[#D4AF37]/35 bg-white px-3 text-xs font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>{d === "Todas" ? "Toda duración" : `Duración ${d.toLowerCase()}`}</option>
              ))}
            </select>

            <select
              aria-label="Ordenar"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="ml-auto h-10 rounded-xl border border-[#D4AF37]/35 bg-white px-3 text-xs font-medium text-[#0D3B22] outline-none focus:border-[#0D3B22]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>Ordenar: {o.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-xs font-medium text-[#4E6658]">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#C5A028]" />
              {filtered.length} {filtered.length === 1 ? "curso" : "cursos"}
              {hasActiveFilters ? " filtrados" : " disponibles"}
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 px-3 py-1.5 text-xs font-semibold text-[#0D3B22] transition-colors hover:bg-[#0D3B22]/5"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-[#D4AF37]/40 bg-white/60 px-6 py-14 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0D3B22]/5 text-[#C5A028]">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="suvoga-serif mt-5 text-xl font-semibold text-[#0D3B22]">
            No encontramos cursos con esos criterios
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#6B6048]">
            Ajusta la búsqueda o limpia los filtros para ver todo el catálogo de formación.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-[#0D3B22] px-6 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332]"
          >
            Ver todos los cursos
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((course) => (
              <CourseCard key={course.idServicio} course={course} />
            ))}
          </div>

          {visible < filtered.length ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#0D3B22]/20 bg-white px-8 text-sm font-semibold text-[#0D3B22] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:shadow-md"
              >
                Ver más cursos ({filtered.length - visible} restantes)
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
