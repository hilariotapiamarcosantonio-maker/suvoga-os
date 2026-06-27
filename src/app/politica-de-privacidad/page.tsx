import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Database, Eye } from "lucide-react";
import { SuvogaWhatsAppButton } from "@/components/suvoga/SuvogaWhatsAppButton";
import { brandingConfig } from "@/config/branding.config";

export const metadata: Metadata = {
  title: `Política de Privacidad | ${brandingConfig.productName}`,
  description: `Conoce cómo tratamos, protegemos y gestionamos tus datos personales en ${brandingConfig.productName}.`,
  alternates: { canonical: "/politica-de-privacidad" },
  openGraph: {
    title: `Política de Privacidad | ${brandingConfig.productName}`,
    description: "Información detallada sobre la recopilación y uso de datos personales.",
    url: "/politica-de-privacidad",
    type: "website",
  },
};

export default function PoliticaPrivacidadPage() {
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
            Privacidad garantizada
          </p>
          <h1 className="suvoga-serif mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Política de Privacidad
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#EAE2D0]">
            En SuVoGa respetamos tu privacidad y nos comprometemos a proteger la información personal que compartes con nosotros.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-[#D4AF37]/25 bg-white p-6 shadow-sm sm:p-10 space-y-8">

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#C5A028] shrink-0" />
              1. Datos que Recopilamos
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              A través de nuestros formularios web de contacto y reservas, recopilamos la siguiente información personal necesaria para la gestión operativa:
            </p>
            <ul className="list-disc pl-6 text-sm text-[#4E6658] space-y-2">
              <li>Nombre completo.</li>
              <li>Número de teléfono (WhatsApp).</li>
              <li>Dirección de correo electrónico.</li>
              <li>Curso o taller de interés.</li>
              <li>Mensaje o consulta específica.</li>
              <li>Fecha y hora de la solicitud.</li>
              <li>Canal preferido de contacto (WhatsApp o correo electrónico).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <Database className="h-6 w-6 text-[#C5A028] shrink-0" />
              2. Finalidad del Tratamiento de Datos
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Los datos proporcionados se utilizan de manera exclusiva para las siguientes finalidades académicas y administrativas:
            </p>
            <ul className="list-disc pl-6 text-sm text-[#4E6658] space-y-2">
              <li>Responder de forma personalizada a tus consultas y solicitudes de orientación.</li>
              <li>Gestionar los registros de admisión, confirmación de cupos y reservas.</li>
              <li>Garantizar el debido seguimiento académico y administrativo durante tu formación.</li>
              <li>Establecer comunicación directa por medio de correo electrónico, teléfono o WhatsApp para coordinaciones del curso.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <Eye className="h-6 w-6 text-[#C5A028] shrink-0" />
              3. Proveedores de Servicios Terceros
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Para la correcta operación técnica del sitio y de la base de datos de la academia, utilizamos infraestructura de proveedores de confianza:
            </p>
            <ul className="list-disc pl-6 text-sm text-[#4E6658] space-y-2">
              <li><strong>Google Sheets:</strong> Como base de datos principal para el almacenamiento de consultas e inscripciones.</li>
              <li><strong>Google Drive:</strong> Para alojar documentos informativos y portadas de cursos.</li>
              <li><strong>Vercel:</strong> Como proveedor de alojamiento web de la aplicación.</li>
              <li><strong>WhatsApp:</strong> Para comunicaciones directas, notificaciones rápidas y soporte académico.</li>
              <li><strong>YouTube:</strong> Para la reproducción e integración de videos explicativos externos en las fichas de cursos.</li>
            </ul>
            <p className="text-xs text-[#6B6048] italic">
              Nota: El sistema no cuenta actualmente con un proveedor de envío masivo de correos activo. En caso de integrarse uno en el futuro, se actualizará debidamente esta política.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="suvoga-serif text-2xl font-semibold text-[#0D3B22] flex items-center gap-3">
              <Mail className="h-6 w-6 text-[#C5A028] shrink-0" />
              4. Ejercicio de tus Derechos sobre tus Datos
            </h2>
            <p className="text-sm leading-7 text-[#4E6658]">
              Tienes derecho a consultar, rectificar, actualizar o solicitar la eliminación definitiva de tus datos personales de nuestros registros en cualquier momento. Para ejercer estos derechos, ponte en contacto enviando una solicitud formal a nuestra dirección oficial de correo electrónico:
            </p>
            <p className="mt-2 text-sm font-semibold text-[#0D3B22]">
              <a href="mailto:asnamatem@gmail.com" className="underline decoration-[#D4AF37] hover:text-[#145332]">
                asnamatem@gmail.com
              </a>
            </p>
          </div>

          <div className="border-t border-[#D4AF37]/20 pt-6 text-xs text-[#8A7D69]">
            Última actualización: Junio de 2026. SuVoGa Escuela y Centro de Masajes se reserva el derecho de actualizar esta política para reflejar cambios en nuestras prácticas operativas o normativas.
          </div>

        </div>
      </section>
      <SuvogaWhatsAppButton />
    </main>
  );
}
