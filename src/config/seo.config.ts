import { academyConfig } from "./academy.config";
import { brandingConfig } from "./branding.config";

export const seoConfig = {
  fallbackSiteUrl: "https://suvoga-os-tjaa.vercel.app",
  defaultTitle: `${brandingConfig.productName} | Masoterapia, estética y bienestar`,
  defaultDescription: academyConfig.description,
  siteName: brandingConfig.productName,
  locale: academyConfig.locale,
  openGraphImage: brandingConfig.openGraphImage,
} as const;

export type SeoConfig = typeof seoConfig;
