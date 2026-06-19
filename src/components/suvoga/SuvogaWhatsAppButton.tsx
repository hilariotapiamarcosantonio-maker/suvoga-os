"use client";

import { brandingConfig } from "@/config/branding.config";
import { buildWhatsAppLink } from "@/lib/suvoga-contact";

type SuvogaWhatsAppButtonProps = {
  /** Optional contextual message, e.g. mentioning the current course. */
  message?: string;
};

/**
 * Official WhatsApp brand glyph (speech bubble + phone handset), inlined as a
 * local SVG. lucide-react ships only a generic "message" icon, which is not
 * instantly recognizable as WhatsApp — this is the real mark. Filled with
 * currentColor so the parent controls contrast; the handset reads as negative
 * space cut out of the bubble.
 */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.358.101 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.945-5.358 11.948-11.893a11.821 11.821 0 00-3.421-8.452" />
    </svg>
  );
}

/**
 * Global floating "concierge digital" entry point to WhatsApp. Uses the
 * official, owner-approved number from src/lib/suvoga-contact.ts, so it always
 * links to a real channel.
 *
 * Visual: dark premium green bubble (#073B2A) with a 2px #25D366 border, a soft
 * green glow, a subtle inner ring, and the white WhatsApp glyph centered. The
 * glyph stays pinned on the left in a fixed square, so it remains visible both
 * collapsed (circular) and expanded. On desktop, hover/focus reveals the
 * "Concierge digital" label to the right; on mobile the button stays circular.
 * Accessible: 58–60px touch target, safe-area offset, visible focus ring, and
 * reduced-motion handling. No invasive pulsing. Public pages only.
 */
export function SuvogaWhatsAppButton({ message }: SuvogaWhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Escribir por WhatsApp a ${brandingConfig.productName}`}
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex h-[58px] w-[58px] items-center overflow-hidden rounded-full border-2 border-[#25D366] bg-[#073B2A] text-white shadow-[0_8px_28px_rgba(37,211,102,0.30),inset_0_0_0_1.5px_rgba(37,211,102,0.22)] transition-[width] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] motion-reduce:transition-none md:bottom-6 md:right-6 md:h-[60px] md:w-[60px] md:hover:w-[232px] md:focus-visible:w-[232px]"
    >
      {/* Fixed square keeps the glyph centered when collapsed and pinned-left when expanded */}
      <span className="flex h-full w-[54px] shrink-0 items-center justify-center md:w-[56px]">
        <WhatsAppGlyph className="h-[30px] w-[30px]" />
      </span>
      <span className="whitespace-nowrap pr-5 text-xs font-semibold uppercase tracking-[0.14em] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
        Concierge digital
      </span>
    </a>
  );
}
