import type { Metadata } from "next";
import { suvogaCourses } from "@/data/courses";
import { courseCategory, courseModality } from "@/lib/course-presentation";
import { CoursesExplorer } from "@/components/suvoga/CoursesExplorer";
import { SiteCTA } from "@/components/suvoga/SiteCTA";

export const metadata: Metadata = {
  title: "Catálogo de cursos | SuVoGa Academia",
  description:
    "Explora los 38 programas de formación en masoterapia, estética y bienestar de SuVoGa Academia. Filtra por categoría, modalidad y duración.",
  alternates: { canonical: "/cursos" },
  openGraph: {
    title: "Catálogo de cursos | SuVoGa Academia",
    description:
      "38 programas de formación profesional en masoterapia, estética y bienestar.",
    url: "/cursos",
    type: "website",
  },
};

const categories = Array.from(new Set(suvogaCourses.map(courseCategory))).sort((a, b) =>
  a.localeCompare(b, "es")
);
const modalities = Array.from(new Set(suvogaCourses.map(courseModality))).sort((a, b) =>
  a.localeCompare(b, "es")
);

type CoursesPageProps = {
  searchParams?: { categoria?: string };
};

export default function CoursesPage({ searchParams }: CoursesPageProps) {
  const requested = searchParams?.categoria;
  const initialCategory =
    requested && categories.includes(requested) ? requested : "Todas";

  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Catálogo académico
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Todos nuestros cursos
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            {suvogaCourses.length} programas de formación profesional en masoterapia,
            estética y bienestar. Busca, filtra y encuentra el camino ideal para ti.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <CoursesExplorer
          courses={suvogaCourses}
          categories={categories}
          modalities={modalities}
          initialCategory={initialCategory}
        />
      </section>

      <SiteCTA
        title="¿No sabes cuál elegir?"
        description="Cuéntanos tu objetivo y te ayudamos a encontrar el programa que mejor se adapta a ti."
      />
    </main>
  );
}
