"use client";

import { useState } from "react";
import { Check, ChevronDown, Layers } from "lucide-react";
import type { SyllabusModule } from "@/lib/course-presentation";

type CourseSyllabusProps = {
  modules: SyllabusModule[];
};

export function CourseSyllabus({ modules }: CourseSyllabusProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    modules.length ? { [modules[0].id]: true } : {}
  );

  if (!modules.length) return null;

  const allOpen = modules.every((m) => open[m.id]);

  function toggle(id: string) {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  }
  function setAll(value: boolean) {
    setOpen(Object.fromEntries(modules.map((m) => [m.id, value])));
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D3B22]">
          <Layers className="h-4 w-4 text-[#C5A028]" />
          {modules.length} {modules.length === 1 ? "módulo" : "módulos"} de contenido
        </p>
        <button
          type="button"
          onClick={() => setAll(!allOpen)}
          className="rounded-full border border-[#D4AF37]/35 px-4 py-1.5 text-xs font-semibold text-[#0D3B22] transition-colors hover:bg-[#0D3B22]/5"
        >
          {allOpen ? "Contraer todo" : "Expandir todo"}
        </button>
      </div>

      <div className="space-y-3">
        {modules.map((module) => {
          const isOpen = Boolean(open[module.id]);
          return (
            <div
              key={module.id}
              className="overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-white shadow-sm shadow-[#0D3B22]/5"
            >
              <button
                type="button"
                onClick={() => toggle(module.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-[#0D3B22]/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 sm:px-5"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0D3B22] text-sm font-bold text-[#F4E6BE]">
                  {module.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug text-[#0D3B22]">
                    {module.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#8D7530]">
                    {module.itemCount} {module.itemCount === 1 ? "tema" : "temas"}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#C5A028] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen ? (
                <div className="border-t border-[#D4AF37]/20 px-4 pb-5 pt-4 sm:px-5">
                  <div className="space-y-4">
                    {module.groups.map((group, gi) => (
                      <div key={gi}>
                        {group.heading ? (
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8D7530]">
                            {group.heading}
                          </p>
                        ) : null}
                        <ul className="space-y-2">
                          {group.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-2.5 text-sm leading-6 text-[#4E6658]">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A028]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
