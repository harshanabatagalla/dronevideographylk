import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { drones } from "@/lib/content";
import { products } from "@/lib/shop";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/fleet", "/portfolio", "/shop", "/contact", "/credits"].map((path) => ({
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

  const shopRoutes = products.map((p) => ({
    url: `${site.url}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...droneRoutes, ...shopRoutes];
}
