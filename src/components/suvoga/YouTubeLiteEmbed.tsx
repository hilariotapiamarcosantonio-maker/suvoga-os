"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { youTubeId } from "@/lib/course-presentation";

type YouTubeLiteEmbedProps = {
  url?: string;
  title: string;
};

/**
 * Lightweight YouTube facade: shows a thumbnail and only loads the privacy-
 * enhanced iframe on click. Renders nothing when there is no valid video.
 */
export function YouTubeLiteEmbed({ url, title }: YouTubeLiteEmbedProps) {
  const id = youTubeId(url);
  const [active, setActive] = useState(false);

  if (!id) return null;

  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#0D3B22] shadow-sm">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`Video de presentación: ${title}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Reproducir video de presentación de ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <img
            src={thumb}
            alt={`Vista previa del video de ${title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D4AF37] text-[#0D3B22] shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-7 w-7 fill-current" />
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-semibold text-white drop-shadow">
            Ver presentación del curso
          </span>
        </button>
      )}
    </div>
  );
}
