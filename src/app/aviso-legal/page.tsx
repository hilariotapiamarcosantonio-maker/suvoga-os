import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";
import { brandingConfig } from "@/config/branding.config";

export const metadata: Metadata = {
  title: `Aviso Legal | ${brandingConfig.productName}`,
  description: `Información legal obligatoria que identifica al titular del portal y regula las condiciones de uso de ${brandingConfig.productName}.`,
  alternates: { canonical: "/aviso-legal" },
  openGraph: {
    title: `Aviso Legal | ${brandingConfig.productName}`,
    description: "Información de titularidad del sitio y exclusión de responsabilidades.",
    url: "/aviso-legal",
    type: "website",
  },
};

export default function AvisoLegalPage() {
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
            Identificación de titularidad
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Aviso Legal
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            En cumplimiento de las normas de transparencia del comercio electrónico, detallamos los datos informativos del portal web.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm sm:p-10 space-y-8">

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              1. Titularidad del Sitio
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              El portal web accesible bajo la dirección actual está operado bajo la marca y nombre público comercial de **SuVoGa Escuela y Centro de Masajes**.
            </p>
            <p className="text-sm leading-7 text-[#4E6658]">
              Nuestros canales de comunicación oficiales son:
            </p>
            <ul className="list-disc pl-6 text-sm text-[#4E6658] space-y-2">
              <li>Correo electrónico principal: <a href="mailto:asnamatem@gmail.com" className="underline hover:text-[#145332]">asnamatem@gmail.com</a></li>
              <li>WhatsApp de atención: <a href="https://wa.me/18298389185" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#145332]">829-838-9185</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              2. Finalidad del Portal
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Este sitio web tiene como única finalidad la difusión informativa y de promoción comercial de los cursos prácticos, talleres y certificaciones impartidas en el centro de capacitación corporal **SuVoGa**, facilitando a los interesados el envío de solicitudes de inscripción y consultas de orientación.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <Mail className="h-6 w-6 text-[#C5A028] shrink-0" />
              3. Propiedad Intelectual y Uso de Contenidos
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Todos los contenidos de esta web —incluyendo logotipos, textos de programas, diseños, imágenes optimizadas y material docente— son propiedad intelectual de SuVoGa. Se prohíbe de forma expresa su copia, reproducción, distribución pública o comercial sin la debida autorización por escrito del titular del centro.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              4. Limitación de Responsabilidad y Enlaces Externos
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              SuVoGa no se responsabiliza del uso indebido de la información publicada en este sitio web. Asimismo, en caso de incluirse enlaces hipervínculos a sitios de terceros, SuVoGa carece de control editorial sobre dichos sitios externos y excluye cualquier responsabilidad sobre sus contenidos o políticas de privacidad correspondientes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              5. Derecho a la Actualización
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              El centro de masajes se reserva el derecho exclusivo de realizar modificaciones, actualizaciones, correcciones o suspensiones temporales de los contenidos de la web, incluyendo temarios de cursos y precios, en cualquier momento y sin requerir previo aviso.
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
