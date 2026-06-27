import type { MetadataRoute } from "next";
import { suvogaCourses } from "@/data/courses";
import { facilitators } from "@/data/facilitators";
import { absoluteSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/cursos", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/historias", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/comunidad", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/contacto", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/facilitadores", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/politica-de-privacidad", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/politica-de-cookies", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/terminos-y-condiciones", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/politica-de-reservacion", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/aviso-legal", changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteSiteUrl(page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...suvogaCourses.map((course) => ({
      url: absoluteSiteUrl(`/curso/${course.slug || course.idServicio}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...facilitators.map((facilitator) => ({
      url: absoluteSiteUrl(`/facilitadores/${facilitator.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
