import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { brand } from "@/lib/brand";
import { buildWhatsAppLink, suvogaContact } from "@/lib/suvoga-contact";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Cursos", href: "/cursos" },
  { label: "Historias", href: "/historias" },
  { label: "Comunidad", href: "/comunidad" },
  { label: "Contacto", href: "/contacto" },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="w-full max-w-full overflow-hidden border-t border-[#D4AF37]/35 bg-[#0D3B22] py-12 text-[#FDFBF7] md:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="suvoga-serif text-2xl font-semibold text-white">{brand.productName}</h3>
            <p className="max-w-xs text-xs leading-relaxed text-[#EAE2D0]">{brand.tagline}</p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${contactInfo.correo}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#D4AF37]/25 bg-white/5 px-3.5 py-2 text-xs font-semibold text-[#D4AF37] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.correo}
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#D4AF37]/25 bg-white/5 px-3.5 py-2 text-xs font-semibold text-[#D4AF37] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                {suvogaContact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Navegación</h4>
            <ul className="-mx-1 space-y-1 text-sm text-[#EAE2D0]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center rounded-lg px-1 transition-colors hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy note */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">La academia</h4>
            <p className="text-xs leading-relaxed text-[#EAE2D0]">
              Formación profesional en masoterapia, estética y bienestar. Los programas son
              de cupos reducidos (máximo 12 estudiantes) y las admisiones se confirman con la
              reserva del anticipo correspondiente.
            </p>
            <p className="text-[11px] leading-relaxed text-[#8A7D69]">
              Nuestro canal oficial de Instagram se habilitará próximamente.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-[10px] text-[#8A7D69] sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {brand.productName}. Todos los derechos reservados.
          </p>
          <Link
            href="/admin"
            className="flex min-h-11 items-center px-1 hover:text-[#D4AF37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:rounded-lg"
          >
            Acceso Administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
}
