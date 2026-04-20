import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const paths = [
    "",
    "/about",
    "/services",
    "/realisations",
    "/atelier",
    "/partenaires",
    "/devis",
    "/contact",
  ];
  const staticEntries = paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const projectEntries = projects.map((p) => ({
    url: `${base}/realisations/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));
  return [...staticEntries, ...projectEntries];
}
