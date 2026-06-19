export const brandingConfig = {
  logoText: "SuVoGa Academia",
  isoType: "leaf",
  productName: "SuVoGa Academia",
  parentBrand: "SuVoGa",
  workspaceName: "DB Cursos",
  tagline: "Formación profesional en masoterapia, estética y bienestar.",
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
      descriptor: "Arquitectura Digital de Alto Rendimiento · Luma Premium",
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
