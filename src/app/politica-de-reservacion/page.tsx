import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, AlertCircle, ShieldCheck } from "lucide-react";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";
import { brandingConfig } from "@/config/branding.config";

export const metadata: Metadata = {
  title: `Política de Reservación | ${brandingConfig.productName}`,
  description: `Términos y condiciones para la reserva de cupos en los cursos y talleres de ${brandingConfig.productName}.`,
  alternates: { canonical: "/politica-de-reservacion" },
  openGraph: {
    title: `Política de Reservación | ${brandingConfig.productName}`,
    description: "Condiciones de reserva, reprogramación y política de reembolso.",
    url: "/politica-de-reservacion",
    type: "website",
  },
};

export default function PoliticaReservacionPage() {
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
            Condiciones de matrícula
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Política de Reservación
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            Infórmate sobre los términos aplicables para confirmar tu inscripción, asegurar tu cupo y solicitar cambios en nuestras formaciones.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm sm:p-10 space-y-8">

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              1. Naturaleza del Anticipo de Reserva
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Para garantizar la calidad de la formación práctica, los grupos en **SuVoGa Escuela y Centro de Masajes** están estrictamente limitados a un máximo de 12 estudiantes. Por esta razón, el anticipo o monto de reservación abonado para asegurar tu cupo en cualquier curso o taller **no es reembolsable**.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <Calendar className="h-6 w-6 text-[#C5A028] shrink-0" />
              2. Plazos e Inscripciones
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              La inscripción en cualquiera de nuestros programas académicos puede realizarse en cualquier fecha, siempre y cuando exista disponibilidad de cupos libres para el curso o taller elegido al momento del registro.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-[#C5A028] shrink-0" />
              3. Inasistencia y Pérdida de Reserva
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Si el estudiante no asiste a la formación programada en la fecha acordada, perderá la reserva del cupo y el importe correspondiente, salvo que haya notificado previamente al centro y presentado una justificación válida y constancia cuando corresponda.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <FileText className="h-6 w-6 text-[#C5A028] shrink-0" />
              4. Solicitudes de Cambios de Fecha
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Cualquier solicitud para reprogramar o cambiar de fecha tu participación en un curso o taller debe ser tramitada formalmente con un mínimo de **cinco (5) días hábiles de anticipación** a la fecha fijada para el inicio del programa.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-[#C5A028] shrink-0" />
              5. Situaciones de Emergencia
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              En caso de imprevistos fortuitos o situaciones de emergencia, el estudiante debe notificar inmediatamente a SuVoGa a través de los canales oficiales de contacto y enviar una justificación válida y constancia cuando corresponda para que el centro pueda evaluar de manera particular su situación.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              6. Transferibilidad de la Reserva
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              La reservación de cupo es estrictamente personal y **no puede ser transferida** a otra persona bajo ninguna circunstancia sin presentar una justificación válida y contar con la debida autorización por escrito del centro de masajes previa evaluación.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <Calendar className="h-6 w-6 text-[#C5A028] shrink-0" />
              7. Cancelaciones o Reprogramaciones por SuVoGa
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              En el caso eventual de que SuVoGa deba reprogramar, posponer o cancelar el inicio de un taller o programa debido a causas operativas o de fuerza mayor, el centro se pondrá en contacto directo con cada uno de los estudiantes afectados de forma individual para resolver, reprogramar y gestionar su caso de manera particular.
            </p>
          </div>

          <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#F6EFE2]/50 p-5 mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8D7530]">Nota Importante</p>
            <p className="mt-2 text-xs leading-6 text-[#6B6048]">
              Cada caso de excepción o solicitud de gracia fuera de lo estipulado en este documento será evaluado directamente por el centro. Estas condiciones se aplican sin perjuicio de los derechos que correspondan conforme a la legislación vigente.
            </p>
          </div>

        </div>
      </section>
      <SuvogaWhatsAppButton />
    </main>
  );
}
