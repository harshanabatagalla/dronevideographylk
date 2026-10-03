import type { Metadata } from "next";
import { site } from "./site";

/** Raster share image. SVG og:images are ignored by Facebook, WhatsApp and most chat apps. */
export const OG_IMAGE = "/og-image.jpg";

/**
 * Join whole sentences into a meta description that stays within what Google
 * shows (about 160 characters). Later sentences are dropped, never cut mid word.
 */
export function fitDescription(sentences: string[], max = 158): string {
  let out = "";
  for (const s of sentences) {
    const next = out ? `${out} ${s}` : s;
    if (next.length > max && out) break;
    out = next;
  }
  return out;
}

/**
 * Build consistent page metadata (title, description, Open Graph, Twitter,
 * canonical). Every public page uses this so titles and canonicals never drift.
 */
export function pageMetadata({
  title,
  description = site.description,
  path = "/",
  image = OG_IMAGE,
  type = "website",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${site.brand}`;

  return {
    // Absolute, so the root layout's "%s | brand" template doesn't add the brand twice.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.brand,
      title: fullTitle,
      description,
      locale: site.locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

const BUSINESS_ID = `${site.url}#business`;

/**
 * The business, referenced by id from every other schema block. `sameAs` lists
 * the business's own social profiles, so search engines tie the site, the Google
 * Business Profile and those accounts to one business.
 */
export function localBusinessJsonLd(sameAs: string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.brand,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}${OG_IMAGE}`,
    logo: `${site.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    knowsAbout: [
      "Drone videography",
      "Aerial photography",
      "Sri Lanka drone regulations",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Site name markup, so Google shows the brand name instead of the bare domain. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    name: site.brand,
    alternateName: site.name,
    url: site.url,
    publisher: { "@id": BUSINESS_ID },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}

export function serviceJsonLd({
  name,
  serviceType,
  description,
  path,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: `${site.url}${path}`,
    image: `${site.url}${OG_IMAGE}`,
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: site.brand, url: site.url },
    publisher: { "@id": BUSINESS_ID },
  };
}

/** JSON-LD for a video (helps footage appear in Google video results). */
export function videoJsonLd({
  name,
  description,
  thumbnailUrl,
  youtubeId,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  youtubeId?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: "2026-01-01T00:00:00+05:30",
    ...(youtubeId
      ? {
          embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
          contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
        }
      : {}),
  };
}

/** Renders a JSON-LD script tag. `<` is escaped so page text can never close the tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
