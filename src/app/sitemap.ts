import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { drones } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/fleet", "/portfolio", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const droneRoutes = drones.map((d) => ({
    url: `${site.url}/fleet/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...droneRoutes];
}
