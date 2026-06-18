import { Download, FileText } from "lucide-react";

type CoursePdfResourceProps = {
  url?: string;
  courseName: string;
};

function isValidPdfUrl(url?: string): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  // Guard against known placeholder/demo links that must never be surfaced.
  if (/1_[A-Z]\d{5}/.test(trimmed)) return false;
  return true;
}

/**
 * Premium "download program PDF" card. Renders nothing unless a real URL exists,
 * so no placeholders appear for courses without a PDF yet.
 */
export function CoursePdfResource({ url, courseName }: CoursePdfResourceProps) {
  if (!isValidPdfUrl(url)) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-3xl border border-[#D4AF37]/30 bg-[#0D3B22] p-5 text-[#FDFBF7] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] sm:p-6"
    >
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/5 text-[#D4AF37]">
        <FileText className="h-6 w-6" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
          Programa académico
        </span>
        <span className="suvoga-serif mt-0.5 block truncate text-base font-semibold text-white sm:text-lg">
          Descargar programa en PDF
        </span>
        <span className="mt-0.5 block truncate text-xs text-[#EAE2D0]">
          Temario completo de {courseName}
        </span>
      </span>
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37] text-[#0D3B22] transition-transform group-hover:scale-105">
        <Download className="h-5 w-5" />
      </span>
    </a>
  );
}
