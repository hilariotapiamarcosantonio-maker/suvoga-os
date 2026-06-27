import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, HelpCircle } from "lucide-react";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";
import { brandingConfig } from "@/config/branding.config";

export const metadata: Metadata = {
  title: `Política de Cookies | ${brandingConfig.productName}`,
  description: `Transparencia sobre el uso de cookies y tecnologías de almacenamiento en ${brandingConfig.productName}.`,
  alternates: { canonical: "/politica-de-cookies" },
  openGraph: {
    title: `Política de Cookies | ${brandingConfig.productName}`,
    description: "Conoce el estado y la configuración de las cookies en nuestro sitio.",
    url: "/politica-de-cookies",
    type: "website",
  },
};

export default function PoliticaCookiesPage() {
  return (
    <main className="bg-[#FDFBF7] text-[#0D3B22]">
      {/* HERO */}
      <section className="border-b border-[#D4AF37]/20 bg-gradient-to-br from-[#072515] to-[#124026] text-[#FDFBF7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-xs font-semibold text-[#EAE2D0] transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Uso transparente de datos
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Política de Cookies
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            Queremos ser claros y transparentes sobre las tecnologías de almacenamiento e identificación que empleamos en nuestro portal web.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm sm:p-10 space-y-8">

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              1. Tecnologías y Cookies Utilizadas
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Actualmente no se han detectado herramientas de analítica o publicidad en este sitio web. El sitio puede utilizar almacenamiento o tecnologías estrictamente necesarias para su funcionamiento, tales como la persistencia de sesión temporal o variables operativas en el navegador destinadas a agilizar el flujo de navegación y garantizar la seguridad.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-[#C5A028] shrink-0" />
              2. Cookies de Terceros y Recursos Externos
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Al visualizar videos de YouTube integrados en algunas fichas de cursos, utilizamos configuraciones avanzadas que restringen la colocación de cookies de seguimiento (ej. cargando los recursos desde dominios sin cookies como <code className="bg-[#F6EFE2] px-1.5 py-0.5 rounded text-xs">youtube-nocookie.com</code>) para maximizar la privacidad de nuestros estudiantes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              3. Configuración y Control del Navegador
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Puedes deshabilitar o bloquear el almacenamiento de cookies técnicas y datos locales mediante las opciones de configuración de tu navegador de internet. Ten en cuenta que si deshabilitas todas las tecnologías necesarias, es posible que el rendimiento o ciertas características del portal se vean limitados.
            </p>
          </div>

          <div className="border-t border-[#D4AF37]/20 pt-6 text-xs text-[#8A7D69]">
            Última actualización: Junio de 2026. SuVoGa Escuela y Centro de Masajes.
          </div>

        </div>
      </section>
      <SuvogaWhatsAppButton />
    </main>
  );
}
