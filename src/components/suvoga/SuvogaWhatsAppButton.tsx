"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type SuvogaWhatsAppButtonProps = {
  /** Optional contextual message, e.g. mentioning the current course. */
  message?: string;
};

/**
 * Global floating "concierge digital" entry point to WhatsApp. Renders
 * nothing in production when NEXT_PUBLIC_SUVOGA_WHATSAPP is not configured —
 * it never opens a fabricated number. In development, an inert placeholder
 * is shown instead so the missing configuration is obvious without risking
 * a fake link reaching a visitor.
 */
export function SuvogaWhatsAppButton({ message }: SuvogaWhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);

  if (!href) {
    if (process.env.NODE_ENV === "production") return null;
    return (
      <div
        aria-hidden="true"
        title="Configura NEXT_PUBLIC_SUVOGA_WHATSAPP para activar el botón de WhatsApp"
        className="pointer-events-none fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 select-none items-center justify-center rounded-full border-2 border-dashed border-[#8A7D69]/50 bg-white/70 px-1 text-center text-[9px] leading-tight text-[#8A7D69] md:bottom-6 md:right-6"
      >
        WhatsApp sin configurar
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp a SuVoGa Academia"
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#0D3B22] text-white shadow-lg shadow-[#0D3B22]/30 ring-1 ring-white/10 transition-[width] duration-300 ease-out hover:w-56 focus-visible:w-56 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 motion-reduce:transition-none md:bottom-6 md:right-6"
    >
      <span className="flex items-center gap-2.5 px-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#0D3B22] transition-transform duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none">
          <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
          Concierge digital
        </span>
      </span>
    </a>
  );
}
