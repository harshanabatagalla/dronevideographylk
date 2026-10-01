import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { footage } from "@/lib/content";
import { products } from "@/lib/shop";
import { services, servicePath, SERVICES_PATH } from "@/lib/services";
import { PERMIT_PATH, RULES_PATH, RULES_REVIEWED } from "@/lib/drone-rules";

/**
 * lastModified is the date the page content last changed in a meaningful way,
 * not the build time. Update the constant when you change a page's content.
 */
const SITE_UPDATED = "2026-09-28";
const SHOP_UPDATED = "2026-09-21";
const CREDITS_UPDATED = "2026-09-23";

const abs = (path: string) => `${site.url}${path}`;
const photo = (id: string) => footage.find((f) => f.id === id);
const photoUrls = (ids: string[]) =>
  ids.map((id) => photo(id)?.poster).filter((p): p is string => Boolean(p)).map(abs);

export default function sitemap(): MetadataRoute.Sitemap {
  const allPhotos = footage.map((f) => abs(f.poster));

  const core: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: SITE_UPDATED, images: allPhotos.slice(0, 6) },
    { url: abs(SERVICES_PATH), lastModified: SITE_UPDATED },
    { url: abs(RULES_PATH), lastModified: RULES_REVIEWED },
    { url: abs(PERMIT_PATH), lastModified: RULES_REVIEWED },
    { url: abs("/locations"), lastModified: SITE_UPDATED, images: allPhotos },
    { url: abs("/portfolio"), lastModified: SITE_UPDATED, images: allPhotos },
    { url: abs("/fleet"), lastModified: SITE_UPDATED },
    { url: abs("/shop"), lastModified: SHOP_UPDATED },
    { url: abs("/contact"), lastModified: SITE_UPDATED },
    { url: abs("/credits"), lastModified: CREDITS_UPDATED },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: abs(servicePath(s.slug)),
    lastModified: SITE_UPDATED,
    images: photoUrls(s.photos),
  }));

  // /fleet/<slug> pages are noindex (thin spec cards), so they stay out of the sitemap.
  const shopPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: abs(`/shop/${p.slug}`),
    lastModified: SHOP_UPDATED,
    ...(p.image ? { images: [abs(p.image)] } : {}),
  }));

  return [...core, ...servicePages, ...shopPages];
}
