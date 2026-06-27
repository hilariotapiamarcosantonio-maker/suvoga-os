import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck, HelpCircle, Lock } from "lucide-react";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";
import { brandingConfig } from "@/config/branding.config";

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${brandingConfig.productName}`,
  description: `Términos y condiciones legales que regulan el acceso y el uso de los servicios de ${brandingConfig.productName}.`,
  alternates: { canonical: "/terminos-y-condiciones" },
  openGraph: {
    title: `Términos y Condiciones | ${brandingConfig.productName}`,
    description: "Normas de uso del sitio, propiedad intelectual y responsabilidades.",
    url: "/terminos-y-condiciones",
    type: "website",
  },
};

export default function TerminosCondicionesPage() {
  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      {/* HERO */}
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-xs font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Términos del servicio
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Términos y Condiciones
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            Conoce las condiciones legales generales que rigen la utilización de nuestra plataforma web y la contratación de nuestras formaciones.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm sm:p-10 space-y-8">

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-[#C5A028] shrink-0" />
              1. Finalidad e Información Académica
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Este sitio web tiene un propósito informativo y educativo, diseñado para dar a conocer los cursos, talleres y programas en masoterapia, estética y técnicas corporales dictados por **SuVoGa**. Si bien nos esforzamos por mantener los contenidos, programas curriculares y fechas de inicio debidamente actualizados, toda la información está sujeta a cambios y reajustes de planificación docente.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              2. Inscripciones y Precios
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              La admisión a nuestras formaciones está condicionada a la disponibilidad de cupos y se confirma de manera efectiva una vez recibido el anticipo de reserva. Todos los precios de los cursos y materiales están sujetos a confirmación directa con el centro al momento de la matrícula. El envío de una solicitud a través del sitio web no constituye una reserva automática de cupo.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-[#C5A028] shrink-0" />
              3. Responsabilidad del Estudiante
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Es responsabilidad del estudiante o interesado proveer información verídica, exacta y completa en todos los campos de los formularios de contacto y matrícula. El estudiante se compromete a cumplir con las normas operativas, de respeto e higiene del centro docente.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <Lock className="h-6 w-6 text-[#C5A028] shrink-0" />
              4. Propiedad Intelectual
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Todos los contenidos alojados en esta plataforma web, incluyendo textos descriptivos, imágenes, esquemas, logotipos, materiales didácticos de estudio y el diseño del sitio, son propiedad exclusiva de **SuVoGa** o cuentan con sus debidas licencias operativas. Queda estrictamente prohibida la copia, reproducción, distribución, venta o redistribución de estos materiales sin la previa autorización explícita por escrito de los titulares.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              5. Relación con la Política de Reservación
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Los procesos de reserva, cancelación, reprogramación y inasistencia están condicionados en su totalidad a lo dispuesto en nuestra{" "}
              <Link href="/politica-de-reservacion" className="font-semibold text-[#0D3B22] underline decoration-[#D4AF37] hover:text-[#145332]">
                Política de Reservación
              </Link>
              , la cual el estudiante declara conocer y aceptar de manera íntegra al realizar una reserva de cupo.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-[#C5A028] shrink-0" />
              6. Contacto Oficial
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Para coordinar tu matrícula, aclarar dudas de los términos del servicio o enviar consultas directas, puedes comunicarte a través de nuestros canales autorizados:
            </p>
            <ul className="list-disc pl-6 text-sm text-[#4E6658] space-y-2">
              <li>Correo oficial: <a href="mailto:asnamatem@gmail.com" className="underline hover:text-[#145332]">asnamatem@gmail.com</a></li>
              <li>WhatsApp de atención: <a href="https://wa.me/18298389185" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#145332]">829-838-9185</a></li>
            </ul>
          </div>

          <div className="border-t border-[#D4AF37]/20 pt-6 text-xs text-[#8A7D69]">
            Última actualización: Junio de 2026. SuVoGa Escuela y Centro de Masajes.
          </div>

        </div>
      </section>
      <SuvogaWhatsAppButton />
    </main>
  );
}
