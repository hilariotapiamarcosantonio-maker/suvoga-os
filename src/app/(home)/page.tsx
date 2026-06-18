import { Leaf, Sparkles } from "lucide-react";
import { CourseCatalogClient } from "@/components/suvoga/CourseCatalogClient";
import { SocialProofSection } from "@/components/suvoga/SocialProofSection";
import { suvogaCourses } from "@/data/courses";
import { brand } from "@/lib/brand";

const featuredCourses = suvogaCourses.slice(0, 3);

export default function HomePage() {
  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      <section className="bg-[#0D3B22] text-[#FDFBF7]">
        <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              {brand.productName}
            </div>
            <h1 className="suvoga-serif mt-7 text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Formación profesional en masoterapia, estética y bienestar.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#EAE2D0] sm:text-lg">
              Cursos de masaje, estética corporal y terapias de bienestar en
              una experiencia educativa serena, técnica y profundamente humana.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                [`${suvogaCourses.length}`, "programas"],
                ["12", "cupos cuidados"],
                ["100%", "enfoque practico"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#D4AF37]/25 bg-white/5 p-4 shadow-sm backdrop-blur-sm"
                >
                  <p className="suvoga-serif text-3xl font-semibold text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#D4AF37]/30 bg-white/[0.06] p-5 shadow-sm backdrop-blur-sm">
            <div className="rounded-2xl border border-white/10 bg-[#FDFBF7] p-6 text-[#0D3B22] shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white text-[#C5A028]">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="suvoga-serif mt-6 text-3xl font-semibold leading-tight">
                Ritual academico, estructura profesional.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#4E6658]">
                Cada curso se presenta con cupos medidos, anticipo claro y una
                experiencia visual que respira calma desde el primer contacto.
              </p>
              <div className="mt-6 space-y-3 border-t border-[#D4AF37]/20 pt-5">
                {featuredCourses.map((course) => (
                  <div
                    key={course.idServicio}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[#D4AF37]/20 bg-white p-3"
                  >
                    <span className="text-sm font-semibold text-[#0D3B22]">
                      {course.nombre}
                    </span>
                    <span className="shrink-0 rounded-full bg-[#0D3B22] px-3 py-1 text-xs font-semibold text-[#FDFBF7]">
                      {course.cuposTotales || 12} cupos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cursos-disponibles" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 scroll-mt-16 md:scroll-mt-20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A028]">
              Catalogo academico
            </p>
            <h2 className="suvoga-serif mt-3 text-4xl font-semibold leading-tight text-[#0D3B22] sm:text-5xl">
              Cursos disponibles
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#4E6658]">
            Una seleccion pensada para estudiantes que buscan tecnica,
            presencia y herramientas reales para ejercer en bienestar.
          </p>
        </div>

        <CourseCatalogClient />
      </section>

      {/* Social Proof and trust sections */}
      <SocialProofSection />
    </main>
  );
}
