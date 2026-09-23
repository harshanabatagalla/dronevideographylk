import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
    default: `${site.brand} | Drone Videography in Sri Lanka`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "drone videography Sri Lanka",
    "aerial videography Sri Lanka",
    "drone photography Sri Lanka",
    "aerial wedding film Sri Lanka",
    "hire drone pilot Sri Lanka",
    "Sigiriya drone",
    "Ella drone footage",
    "Mirissa aerial",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brand,
    locale: site.locale,
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: site.brand }],
  },
  robots: { index: true, follow: true },
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
