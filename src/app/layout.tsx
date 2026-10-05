import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { OG_IMAGE } from "@/lib/seo";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
// Only used for small labels, so it is not preloaded and does not compete with the
// body and heading fonts before first paint. "optional" means a late arrival is not
// swapped in on that view (no layout shift); it is cached for the next page.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Draw into the notch / Dynamic Island area; the CSS below keeps content clear of it.
  viewportFit: "cover",
  themeColor: "#0b1f2a",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Drone Videography in Sri Lanka | ${site.brand}`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brand,
    locale: site.locale,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.brand }],
  },
  robots: { index: true, follow: true },
  // Bing Webmaster Tools ownership. Keep it: removing it unverifies the site.
  // Google Search Console uses public/googleaf12489d0f5c6473.html instead.
  verification: { other: { "msvalidate.01": "E06646EA0B55FE09D02AFBD41FFD3174" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream" suppressHydrationWarning>{children}</body>
    </html>
  );
}
