import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { contactInfo } from "@/data/contact";

type SiteCTAProps = {
  title?: string;
  description?: string;
};

/** Closing call-to-action band: explore courses + request orientation. */
export function SiteCTA({
  title = "Da el primer paso en tu formación profesional",
  description = "Explora el catálogo completo o conversa con nuestro equipo para elegir el programa ideal para ti.",
}: SiteCTAProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/35 bg-[#0D3B22] px-6 py-12 text-center text-[#FDFBF7] shadow-xl sm:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14),transparent_60%)]" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="suvoga-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#EAE2D0] sm:text-base">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/cursos"
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#0D3B22] shadow-lg transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D3B22] sm:w-auto"
            >
              Explorar cursos
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D3B22] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5 text-[#D4AF37]" />
              Solicitar orientación
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-[#8A7D69]">{contactInfo.horario}</p>
        </div>
      </div>
    </section>
  );
}
