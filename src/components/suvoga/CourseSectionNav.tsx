"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

type CourseSectionNavProps = {
  sections: Section[];
};

/** Sticky in-page navigation with scroll-spy for the course detail page. */
export function CourseSectionNav({ sections }: CourseSectionNavProps) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(id);
  }

  if (!sections.length) return null;

  return (
    <nav
      aria-label="Secciones del curso"
      className="sticky top-16 z-30 border-y border-[#D4AF37]/20 bg-[#FDFBF7]/95 backdrop-blur-md md:top-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex gap-1 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleClick(e, section.id)}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#0D3B22] text-[#FDFBF7]"
                      : "text-[#4E6658] hover:bg-[#0D3B22]/5 hover:text-[#0D3B22]"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
