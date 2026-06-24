export const brandingConfig = {
  logoText: "SuVoGa Escuela y Centro de Masajes",
  isoType: "leaf",
  productName: "SuVoGa Escuela y Centro de Masajes",
  parentBrand: "SuVoGa",
  workspaceName: "DB Cursos",
  navigationTagline: "Masoterapia · Estética · Bienestar",
  tagline: "Formación técnica y talleres especializados.",
  description:
    "Infraestructura operativa para organizar catalogo, pacientes, inscripciones y anticipos.",
  colors: {
    forest: "#0D3B22",
    forestDeep: "#072515",
    gold: "#D4AF37",
    goldMuted: "#C5A028",
    cream: "#FDFBF7",
    linen: "#F6EFE2",
  },
  typography: {
    sans: "Inter",
    serif: "Cormorant Garamond",
  },
  radii: {
    control: "1rem",
    panel: "1.5rem",
  },
  shadows: {
    soft: "0 10px 30px rgba(13, 59, 34, 0.08)",
  },
  footer: {
    developerCredit: {
      enabled: true,
      headline: "Desarrollado por Marcos Hilario",
      descriptor: "Arquitectura Digital de Alto Rendimiento",
      lumaPremiumLabel: "Luma Premium",
      links: {
        marcosHilario: "https://marcoshilario.com",
        lumaPremium: "https://lumapremium.com",
      },
    },
  },
  favicon: "/favicon.ico",
  openGraphImage: "",
} as const;

export type BrandingConfig = typeof brandingConfig;
