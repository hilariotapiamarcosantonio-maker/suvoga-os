import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, UserRound } from "lucide-react";
import { facilitators, getCoursesForFacilitator } from "@/data/facilitators";
import { SectionHeading } from "@/components/suvoga/SectionHeading";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";

export const metadata: Metadata = {
  title: "Facilitadores | SuVoGa Academia",
  description:
    "Conoce los perfiles docentes vinculados a los programas de SuVoGa Academia.",
  alternates: { canonical: "/facilitadores" },
  openGraph: {
    title: "Facilitadores | SuVoGa Academia",
    description: "Perfiles docentes y programas impartidos en SuVoGa Academia.",
    url: "/facilitadores",
    type: "website",
  },
};

export default function FacilitatorsPage() {
  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Equipo docente
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Facilitadores
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            Perfiles docentes vinculados a los programas publicados de SuVoGa Academia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Perfiles"
          title="Quién acompaña la formación"
          description="Mostramos únicamente información confirmada o marcada como pendiente de validación."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {facilitators.map((facilitator) => {
            const courses = getCoursesForFacilitator(facilitator.slug);
            return (
              <article
                key={facilitator.id}
                className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm shadow-[#0D3B22]/5"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#F6EFE2] text-[#0D3B22]">
                    <UserRound className="h-8 w-8" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22]">
                      {facilitator.name}
                    </h2>
                    {facilitator.role ? (
                      <p className="mt-1 text-sm text-[#6B6048]">{facilitator.role}</p>
                    ) : null}
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/35 bg-[#F6EFE2]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8D7530]">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {facilitator.verified ? "Perfil verificado" : "Datos por confirmar"}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#4E6658]">
                  Perfil docente en proceso de validación editorial. Se muestran los cursos
                  asociados por datos existentes del catálogo.
                </p>

                <div className="mt-5 rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8D7530]">
                    Cursos asociados
                  </p>
                  <p className="suvoga-serif mt-1 text-3xl font-semibold text-[#0D3B22]">
                    {courses.length}
                  </p>
                </div>

                <Link
                  href={`/facilitadores/${facilitator.slug}`}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-4 text-sm font-semibold text-[#FDFBF7] transition-colors hover:bg-[#145332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2"
                >
                  Ver perfil
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <SuvogaWhatsAppButton />
    </main>
  );
}
