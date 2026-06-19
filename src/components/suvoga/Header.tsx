"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { Menu, X, Leaf, MessageCircle, ArrowRight } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { brand } from "@/lib/brand";
import { headerNavigationLinks } from "@/config/navigation.config";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = headerNavigationLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Animation variants
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1], // premium ease-out
      },
    },
  };

  const containerVariants: Variants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-[#D4AF37]/20 bg-[#FDFBF7]/90 backdrop-blur-xl shadow-sm"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 md:gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
        >
          <span className="inline-flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-xl md:rounded-2xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] shadow-sm shadow-[#0D3B22]/5 transition-colors group-hover:bg-[#F7F1E7]">
            <Leaf className="h-4 w-4 md:h-5 md:w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="suvoga-serif text-lg md:text-2xl font-semibold tracking-normal text-[#0D3B22]">
              {brand.productName}
            </span>
            <span className="mt-0.5 md:mt-1 text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A7D69]">
              {brand.navigationTagline}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links + CTA (grouped so spacing never collapses at md) */}
        <div className="hidden md:flex items-center gap-4 md:gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-xs font-semibold uppercase tracking-widest transition-colors relative py-1 group ${
                isActive(link.href) ? "text-[#C5A028]" : "text-[#0D3B22] hover:text-[#C5A028]"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          {/* Desktop CTA Button — explicit left margin guarantees breathing room from "Contacto" at md */}
          <Link
            href="/cursos"
            onClick={(e) => handleLinkClick(e, "/cursos")}
            className="ml-2 inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl border border-[#D4AF37]/35 bg-[#0D3B22] px-5 text-sm font-semibold text-[#FDFBF7] shadow-sm shadow-[#0D3B22]/10 transition-colors hover:bg-[#145332] md:ml-4 lg:ml-2"
          >
            Ver cursos
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-white text-[#0D3B22] shadow-sm transition-colors hover:bg-[#F7F1E7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 focus-visible:ring-offset-2"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 flex h-screen w-full flex-col justify-between bg-[#0D3B22] p-6 text-[#FDFBF7]"
          >
            {/* Header row inside menu */}
            <div className="flex items-center justify-between">
              {/* Logo in light colors */}
              <Link
                href="/"
                onClick={(e) => handleLinkClick(e, "/")}
                className="group inline-flex items-center gap-2 rounded-2xl"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white shadow-sm transition-colors">
                  <Leaf className="h-4 w-4" />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="suvoga-serif text-lg font-semibold tracking-normal text-white">
                    {brand.productName}
                  </span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                    {brand.navigationTagline}
                  </span>
                </span>
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white shadow-sm transition-colors hover:bg-white/20"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Menu Stack */}
            <motion.div
              variants={containerVariants}
              className="my-auto flex flex-col items-center gap-8 py-10"
            >
              {navLinks.map((link) => (
                <motion.div key={link.label} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="suvoga-serif text-3xl font-medium tracking-wide text-white transition-colors hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <Link
                  href={contactInfo.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="suvoga-serif text-3xl font-medium tracking-wide text-[#D4AF37] hover:text-[#C5A028] flex items-center gap-2"
                >
                  <MessageCircle className="h-6 w-6" />
                  WhatsApp
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom Menu Action Drawer */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 border-t border-white/10 pt-6"
            >
              <Link
                href="/#cursos-disponibles"
                onClick={(e) => handleLinkClick(e, "/#cursos-disponibles")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#D4AF37] text-sm font-bold text-[#0D3B22] shadow-lg shadow-[#D4AF37]/10 transition-transform active:scale-98"
              >
                <span>Ver cursos disponibles</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={contactInfo.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                <span>Hablar por WhatsApp</span>
              </a>
              <p className="text-center text-[10px] tracking-widest uppercase text-[#8A7D69] mt-2">
                {brand.productName} · Experiencia académica
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
