"use client";

import { useState } from "react";
import {
  Droplets,
  FlaskConical,
  Flower2,
  GraduationCap,
  HandHeart,
  Leaf,
  Sparkles,
  Stethoscope,
  Store,
  type LucideIcon,
} from "lucide-react";
import {
  COURSE_VISUAL_FAMILIES,
  type CourseVisualFamily,
} from "@/data/course-visual-families";
import { resolveCover } from "@/lib/course-resource-utils";

const FAMILY_ICON: Record<CourseVisualFamily, LucideIcon> = {
  "masters-diplomados": GraduationCap,
  masoterapia: HandHeart,
  "drenaje-postoperatorio": Droplets,
  "estetica-aparatologia": Sparkles,
  "facial-cosmetologia": Flower2,
  "terapias-complementarias": Leaf,
  "cosmetica-artesanal": FlaskConical,
  emprendimiento: Store,
  "tecnica-sanitaria": Stethoscope,
};

type CourseCoverProps = {
  family: CourseVisualFamily;
  alt: string;
  eyebrow?: string;
  /** Full-resolution remote (Drive) cover, used on detail pages. */
  remoteUrl?: string;
  /** Lighter remote thumbnail, used on cards. */
  remoteThumbUrl?: string;
  /** Local repo image (existing per-course art) used as a middle fallback. */
  localSrc?: string;
  focalPosition?: string;
  variant?: "card" | "hero";
  className?: string;
  priority?: boolean;
};

/**
 * Premium editorial fallback — never a blank green rectangle. A family-tinted
 * gradient with a large low-opacity motif, the SuVoGa monogram, and the course
 * eyebrow, so a course without a definitive cover still looks intentional.
 */
function FamilyFallback({
  family,
  alt,
  eyebrow,
}: {
  family: CourseVisualFamily;
  alt: string;
  eyebrow?: string;
}) {
  const def = COURSE_VISUAL_FAMILIES[family];
  const Icon = FAMILY_ICON[family];
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(145deg, ${def.fallbackGradient[0]}, ${def.fallbackGradient[1]})`,
      }}
    >
      {/* Soft motif */}
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -right-4 h-40 w-40 opacity-[0.13]"
        style={{ color: def.accentSoft }}
        strokeWidth={1.25}
      />
      {/* Subtle top sheen */}
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <span className="inline-flex items-center gap-1.5 self-start rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ borderColor: `${def.accent}66`, color: def.accentSoft }}
        >
          <Icon aria-hidden="true" className="h-3.5 w-3.5" />
          {def.publicName}
        </span>
        <div>
          {eyebrow ? (
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">{eyebrow}</p>
          ) : null}
          <p className="suvoga-serif mt-0.5 text-sm font-semibold text-white/90">SuVoGa Academia</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Resolves the best available cover: remote (Drive) → local image → premium
 * editorial fallback. Broken remote/local images fall back gracefully at
 * runtime via onError. Lazy by default; pass `priority` for above-the-fold use.
 */
export function CourseCover({
  family,
  alt,
  eyebrow,
  remoteUrl,
  remoteThumbUrl,
  localSrc,
  focalPosition = "center",
  variant = "card",
  className = "",
  priority = false,
}: CourseCoverProps) {
  const [failed, setFailed] = useState(false);

  const cover = resolveCover({
    remoteUrl: variant === "card" ? remoteThumbUrl || remoteUrl : remoteUrl || remoteThumbUrl,
    localSrc,
    alt,
  });

  if (failed || cover.kind === "fallback") {
    return (
      <div className={className}>
        <FamilyFallback family={family} alt={alt} eyebrow={eyebrow} />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element -- covers come from Google Drive at runtime; next/image remote optimization is configured but a plain img keeps the onError fallback simple and avoids per-file domain coupling */}
      <img
        src={cover.src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
        style={{ objectPosition: focalPosition }}
      />
    </div>
  );
}
