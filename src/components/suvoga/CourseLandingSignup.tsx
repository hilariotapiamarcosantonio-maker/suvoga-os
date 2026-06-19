"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, CreditCard, Users } from "lucide-react";
import { InscriptionModal } from "@/components/suvoga/InscriptionModal";
import { brand } from "@/lib/brand";
import type { SuvogaServicio } from "@/lib/crm-data/get-suvoga-data";

type CourseLandingSignupProps = {
  course: SuvogaServicio;
};

function formatDop(value: number) {
  return new Intl.NumberFormat("es-DO", {
    style: "currency",
    currency: "DOP",
    maximumFractionDigits: 0,
  }).format(value);
}

function priceLabel(value: number) {
  return value > 0 ? formatDop(value) : "";
}

export function CourseLandingSignup({ course }: CourseLandingSignupProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasPublicPrice = course.precioTotal > 0;

  return (
    <>
      <aside className="sticky top-6 rounded-3xl border border-[#D4AF37]/30 bg-white p-5 text-[#0D3B22] shadow-xl shadow-[#0D3B22]/10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8D7530]">
          Separar cupo
        </p>
        {hasPublicPrice ? (
          <div className="mt-5 rounded-2xl border border-[#0D3B22]/10 bg-[#FDFBF7] p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B6048]">
            Inversión
          </p>
          <p className="suvoga-serif mt-2 text-4xl font-semibold leading-none text-[#0D3B22]">
            {priceLabel(course.precioTotal)}
          </p>
          </div>
        ) : null}

        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] px-4 py-3">
            <span className="inline-flex items-center gap-2 text-[#4E6658]">
              <CreditCard className="h-4 w-4 text-[#C5A028]" />
              Anticipo
            </span>
            <strong className="text-[#0D3B22]">
              {formatDop(course.montoAnticipo || 1000)}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] px-4 py-3">
            <span className="inline-flex items-center gap-2 text-[#4E6658]">
              <Users className="h-4 w-4 text-[#C5A028]" />
              Cupos
            </span>
            <strong className="text-[#0D3B22]">
              {course.cuposTotales || 12} disponibles
            </strong>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#D4AF37]/20 bg-[#FDFBF7] px-4 py-3">
            <span className="inline-flex items-center gap-2 text-[#4E6658]">
              <CalendarDays className="h-4 w-4 text-[#C5A028]" />
              Fecha
            </span>
            <strong className="text-[#0D3B22] text-right">
              {course.fechaTexto || "Próxima fecha por anunciar"}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#0D3B22] px-6 text-base font-semibold text-[#FDFBF7] shadow-lg shadow-[#0D3B22]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#145332] hover:shadow-xl hover:shadow-[#0D3B22]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Inscribirse Hoy
          <ArrowRight className="h-5 w-5" />
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-[#6B6048]">
          Tu solicitud se guarda en {brand.productName} para que el equipo confirme cupo y
          anticipo.
        </p>
      </aside>

      <InscriptionModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
