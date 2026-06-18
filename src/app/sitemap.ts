import type { MetadataRoute } from "next";
import { suvogaCourses } from "@/data/courses";
import { absoluteSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteSiteUrl("/"),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...suvogaCourses.map((course) => ({
      url: absoluteSiteUrl(`/curso/${course.slug || course.idServicio}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
