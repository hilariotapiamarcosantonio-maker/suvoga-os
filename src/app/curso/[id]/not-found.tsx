import Link from "next/link";
import { SearchX } from "lucide-react";
import { academyConfig } from "@/config/academy.config";

export default function CourseNotFound() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#0D3B22]">
      <section className="bg-[#0D3B22] px-4 py-20 text-[#FDFBF7] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white/5 text-[#D4AF37]">
            <SearchX className="h-7 w-7" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Curso no encontrado
          </p>
          <h1 className="suvoga-serif mt-4 text-5xl font-semibold leading-tight text-white sm:text-6xl">
            Esta formación no está disponible.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#EAE2D0]">
            Puede que el enlace haya cambiado o que el programa ya no forme
            parte del catálogo público de {academyConfig.shortName}.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37] px-6 text-sm font-semibold text-[#0D3B22] transition-colors hover:bg-[#C5A028]"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}
