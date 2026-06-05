"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { InscriptionModal } from "./InscriptionModal";
import type { SuvogaServicio } from "@/lib/crm-data/get-suvoga-data";

type CourseHeroCTAProps = {
  course: SuvogaServicio;
};

export function CourseHeroCTA({ course }: CourseHeroCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-8 text-base font-semibold text-[#0D3B22] shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#C5A028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D3B22]"
      >
        Reservar mi cupo
        <ArrowRight className="h-5 w-5" />
      </button>

      <InscriptionModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
