"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Instagram, Facebook } from "@/components/suvoga/BrandIcons";
import { contactInfo } from "@/data/contact";

export function Footer() {
  return (
    <footer className="border-t border-[#D4AF37]/35 bg-[#0D3B22] text-[#FDFBF7] py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10">
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <h3 className="suvoga-serif text-2xl font-semibold text-white">SuVoGa OS</h3>
            <p className="text-xs text-[#EAE2D0] leading-relaxed max-w-xs">
              Formación técnica premium en masajes y estética corporal. Espacio diseñado para el éxito y la práctica de spa consciente.
            </p>
            <div className="flex flex-row flex-wrap lg:flex-col gap-2.5 pt-1">
              <Link
                href={contactInfo.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#C5A028] bg-white/5 border border-[#D4AF37]/25 hover:bg-white/10 rounded-xl px-3.5 py-2 transition-all shadow-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </Link>
              <Link
                href={contactInfo.instagram.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#C5A028] bg-white/5 border border-[#D4AF37]/25 hover:bg-white/10 rounded-xl px-3.5 py-2 transition-all shadow-sm"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </Link>
            </div>
          </div>

          {/* Column 2: Contact Channels */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Canales de Contacto</h4>
            <ul className="space-y-3 text-xs text-[#EAE2D0]">
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="block font-medium text-white">{contactInfo.whatsapp.label}</span>
                  <span className="text-[10px] text-[#8A7D69]">{contactInfo.whatsapp.displayValue}</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="block font-medium text-white">{contactInfo.instagram.label}</span>
                  <span className="text-[10px] text-[#8A7D69]">{contactInfo.instagram.displayValue}</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <div>
                  <span className="block font-medium text-white">{contactInfo.facebook.label}</span>
                  <span className="text-[10px] text-[#8A7D69]">{contactInfo.facebook.displayValue}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Location and Schedule */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Ubicación y Horario</h4>
            <ul className="space-y-3 text-xs text-[#EAE2D0]">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Zona / Ubicación</span>
                  <span className="block text-[11px] leading-relaxed">{contactInfo.ubicacion}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Horario de Atención</span>
                  <span className="block text-[11px] leading-relaxed">{contactInfo.horario}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-white">Correo Electrónico</span>
                  <a href={`mailto:${contactInfo.correo}`} className="hover:underline text-[11px] text-[#D4AF37]">
                    {contactInfo.correo}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Información Académica</h4>
            <p className="text-[11px] text-[#EAE2D0] leading-relaxed">
              Los programas son de cupos reducidos (máximo 12 alumnos). Las admisiones se confirman mediante la reserva del anticipo correspondiente.
            </p>
            <p className="text-[10px] text-[#8D7530]/80 border-l border-[#D4AF37]/35 pl-3 mt-2">
              Estructura lista para cargar enlaces de contacto y redes sociales oficiales de la academia.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#8A7D69]">
          <p>&copy; {new Date().getFullYear()} SuVoGa Academia. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:underline hover:text-[#D4AF37]">Acceso Administrativo</Link>
            <span>|</span>
            <span className="italic">SuVoGa OS 2.0 - High-Ticket Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
