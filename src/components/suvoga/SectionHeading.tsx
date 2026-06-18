import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

/** Consistent editorial section heading used across the public pages. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const titleColor = tone === "light" ? "text-white" : "text-[#0D3B22]";
  const descColor = tone === "light" ? "text-[#EAE2D0]" : "text-[#4E6658]";

  return (
    <div className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A028]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`suvoga-serif mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-sm leading-7 sm:text-base ${descColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
