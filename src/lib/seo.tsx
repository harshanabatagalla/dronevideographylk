import type { Metadata } from "next";
import { site } from "./site";

/**
 * Build consistent, SEO-first page metadata (title, description, Open Graph,
 * Twitter, canonical). SEO is the project's #1 priority, so every page uses this.
 */
export function pageMetadata({
  title,
  description = site.description,
  path = "/",
  image = "/og-default.svg",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle =
    path === "/" ? `${site.brand} — Cinematic Drone Videography in Sri Lanka` : `${title} | ${site.brand}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
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

/** JSON-LD structured data for the local business (rich results). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}#business`,
    name: site.brand,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/og-default.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    sameAs: Object.values(site.socials),
    priceRange: "$$",
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

/** Renders a JSON-LD script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
