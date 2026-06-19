import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/suvoga/Footer";
import { Header } from "@/components/suvoga/Header";
import { getSiteUrl } from "@/lib/site-url";
import { seoConfig } from "@/config/seo.config";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: "/",
    siteName: seoConfig.siteName,
    type: "website",
  },
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
          <Header />
          <main className="pt-16 md:pt-20 max-w-full overflow-x-clip">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
