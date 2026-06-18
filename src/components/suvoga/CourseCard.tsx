import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Layers } from "lucide-react";
import type { SuvogaServicio } from "@/lib/crm-data/get-suvoga-data";
import {
  courseCategory,
  courseDurationText,
  courseHref,
  courseImage,
  courseModality,
  formatDop,
  priceLabel,
} from "@/lib/course-presentation";
import { getCourseVisualIdentity } from "@/data/course-visual-identities";
import { COURSE_VISUAL_FAMILIES } from "@/data/course-visual-families";
import { CourseCover } from "./CourseCover";

type CourseCardProps = {
  course: SuvogaServicio;
  featured?: boolean;
};

/**
 * Compact catalog card. Shows only summary fields and links to the full
 * program page by slug — never the full course content. Uses the per-course
 * visual identity for a family eyebrow, a confirmed primary benefit, and a
 * premium cover (remote thumbnail → local image → editorial fallback).
 */
export function CourseCard({ course, featured = false }: CourseCardProps) {
  const href = courseHref(course);
  const identity = getCourseVisualIdentity(course.sourceId || course.idServicio);
  const family = identity?.family;
  const familyName = family ? COURSE_VISUAL_FAMILIES[family].publicName : courseCategory(course);
  const eyebrow = identity?.eyebrow ?? courseCategory(course);
  const primaryBenefit = identity?.primaryBenefit;
  const modality = courseModality(course);
  const duration = courseDurationText(course.duracion) || "Según calendario";
  const hasPublicPrice = course.precioTotal > 0;

  // Pending covers have no unique local art → force the editorial fallback
  // instead of repeating the shared placeholder image.
  const localSrc = identity?.coverStatus === "pending" ? undefined : courseImage(course);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] shadow-sm shadow-[#0D3B22]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/70 hover:shadow-xl hover:shadow-[#D4AF37]/15">
      <Link href={href} className="relative block aspect-[16/10] w-full overflow-hidden">
        <CourseCover
          family={family ?? "masoterapia"}
          alt={identity?.coverAlt ?? course.nombre}
          eyebrow={eyebrow}
          remoteUrl={identity?.coverImageUrl}
          remoteThumbUrl={identity?.coverThumbnailUrl}
          localSrc={localSrc}
          focalPosition={identity?.focalPosition}
          variant="card"
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D3B22]/55 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-[#D4AF37]/40 bg-[#0D3B22]/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F4E6BE] backdrop-blur-sm">
          {familyName}
        </span>
        {featured ? (
          <span className="absolute right-3 top-3 rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0D3B22]">
            Destacado
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link
          href={href}
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70"
        >
          <h3 className="suvoga-serif line-clamp-2 text-lg font-semibold leading-snug text-[#0D3B22] transition-colors group-hover:text-[#145332]">
            {course.nombre}
          </h3>
        </Link>

        {primaryBenefit ? (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#4E6658]">{primaryBenefit}</p>
        ) : null}

        <dl className="mt-4 space-y-2 text-xs text-[#4E6658]">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 shrink-0 text-[#C5A028]" />
            <dt className="sr-only">Duración</dt>
            <dd className="truncate">{duration}</dd>
          </div>
          {modality !== "Por definir" ? (
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 shrink-0 text-[#C5A028]" />
              <dt className="sr-only">Modalidad</dt>
              <dd className="truncate">{modality}</dd>
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-[#C5A028]" />
            <dt className="sr-only">Próxima fecha</dt>
            <dd className="truncate">{course.fechaTexto || "Próxima fecha por anunciar"}</dd>
          </div>
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#D4AF37]/20 pt-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8D7530]">
              {hasPublicPrice ? "Inversión" : "Anticipo"}
            </p>
            <p className="mt-0.5 text-sm font-bold text-[#0D3B22]">
              {hasPublicPrice ? priceLabel(course.precioTotal) : formatDop(course.montoAnticipo || 1000)}
            </p>
          </div>
          {hasPublicPrice ? (
            <div className="text-right">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8D7530]">
                Anticipo
              </p>
              <p className="mt-0.5 text-sm font-bold text-[#0D3B22]">
                {formatDop(course.montoAnticipo || 1000)}
              </p>
            </div>
          ) : null}
        </div>

        <Link
          href={href}
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-4 text-sm font-semibold text-[#FDFBF7] shadow-sm transition-colors hover:bg-[#145332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Ver programa
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
