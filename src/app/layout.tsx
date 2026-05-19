import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import { Leaf, ShieldCheck } from "lucide-react";
import "./globals.css";
import { brand } from "@/lib/brand";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${brand.productName} | Escuela premium de spa`,
  description:
    "SuVoGa OS organiza catalogo, cursos, inscripciones y calendario academico para una escuela de spa premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${cormorant.variable} suvoga-sans min-h-screen bg-[#FDFBF7] text-[#0D3B22] antialiased`}
      >
        <div className="min-h-screen bg-[#FDFBF7]">
          <header className="sticky top-0 z-50 border-b border-[#D4AF37]/20 bg-[#FDFBF7]/90 backdrop-blur-sm">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] shadow-sm shadow-[#0D3B22]/5 transition-colors group-hover:bg-[#F7F1E7]">
                  <Leaf className="h-5 w-5" />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="suvoga-serif text-2xl font-semibold tracking-normal text-[#0D3B22]">
                    SuVoGa OS
                  </span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A7D69]">
                    Escuela & Spa
                  </span>
                </span>
              </Link>

              <Link
                href="/admin"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/30 bg-[#0D3B22] px-4 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
              >
                <ShieldCheck className="h-4 w-4" />
                Acceso Admin
              </Link>
            </nav>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
