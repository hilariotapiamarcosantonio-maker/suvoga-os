import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, BookOpen, MessageCircle, UserRound } from "lucide-react";
import {
  facilitators,
  findFacilitatorBySlug,
  getCoursesForFacilitator,
} from "@/data/facilitators";
import { CourseCard } from "@/components/suvoga/CourseCard";
import { SectionHeading } from "@/components/suvoga/SectionHeading";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";
import { buildWhatsAppLink } from "@/lib/suvoga-contact";
import { brandingConfig } from "@/config/branding.config";

type FacilitatorPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return facilitators.map((facilitator) => ({ slug: facilitator.slug }));
}

export function generateMetadata({ params }: FacilitatorPageProps): Metadata {
  const facilitator = findFacilitatorBySlug(params.slug);
  if (!facilitator) return { title: `Facilitadora no encontrada | ${brandingConfig.productName}` };

  return {
    title: `${facilitator.name} | Facilitadores | ${brandingConfig.productName}`,
    description: `Perfil docente de ${facilitator.name} en ${brandingConfig.productName}.`,
    alternates: { canonical: `/facilitadores/${facilitator.slug}` },
    openGraph: {
      title: `${facilitator.name} | ${brandingConfig.productName}`,
      description: `Cursos asociados a ${facilitator.name}.`,
      url: `/facilitadores/${facilitator.slug}`,
      type: "profile",
    },
  };
}

export default function FacilitatorPage({ params }: FacilitatorPageProps) {
  const facilitator = findFacilitatorBySlug(params.slug);
  if (!facilitator) notFound();

  const courses = getCoursesForFacilitator(facilitator.slug);

  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            href="/facilitadores"
            className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-xs font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a facilitadores
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] border border-[#D4AF37]/35 bg-[#F6EFE2] shadow-2xl shadow-black/30">
              {facilitator.photoUrl && !facilitator.provisionalPhoto ? (
                <Image
                  src={facilitator.photoUrl}
                  alt={facilitator.photoAlt || facilitator.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 rounded-[1.5rem] border border-[#D4AF37]/30 bg-white/70 text-center">
                  <UserRound className="h-20 w-20 text-[#8D7530]" />
                  <p className="suvoga-serif mt-4 text-2xl font-semibold">{facilitator.name}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8D7530]">
                    Foto pendiente
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Perfil docente
              </p>
              <h1 className="suvoga-serif mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {facilitator.name}
              </h1>
              {facilitator.role ? (
                <p className="mt-4 text-lg text-[#EAE2D0]">{facilitator.role}</p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#F4E6BE]">
                  <BadgeCheck className="h-4 w-4 text-[#D4AF37]" />
                  {facilitator.verified ? "Perfil verificado" : "Datos por confirmar"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#F4E6BE]">
                  <BookOpen className="h-4 w-4 text-[#D4AF37]" />
                  {courses.length} programas publicados
                </span>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#EAE2D0]">
                Este perfil se mantiene sobrio hasta recibir biografía, credenciales y
                fotografía confirmadas por la propietaria.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/cursos"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#D4AF37] px-6 text-sm font-semibold text-[#0D3B22] transition-colors hover:bg-[#C5A028]"
                >
                  Ver programas
                </Link>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  Consultar orientación
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Cursos impartidos"
          title="Programas asociados"
          description={`Listado derivado del catálogo publicado de ${brandingConfig.productName}.`}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.idServicio} course={course} />
          ))}
        </div>
      </section>
      <SuvogaWhatsAppButton />
    </main>
  );
}
