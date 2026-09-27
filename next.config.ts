import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fleet drones were renamed; keep the old links working.
  async redirects() {
    return [
      { source: "/fleet/skymaster-pro", destination: "/fleet/dji-air-3", permanent: true },
      { source: "/fleet/cinema-drone", destination: "/fleet/dji-air-3", permanent: true },
      { source: "/fleet/coastal-cruiser", destination: "/fleet/dji-mini-2", permanent: true },
      { source: "/fleet/compact-drone", destination: "/fleet/dji-mini-2", permanent: true },
      { source: "/fleet/summit-explorer", destination: "/fleet/dji-mavic-4-pro", permanent: true },
      { source: "/fleet/long-range-6k-drone", destination: "/fleet/dji-mavic-4-pro", permanent: true },
      { source: "/fleet/dji-mavic-2-pro", destination: "/fleet", permanent: true },
    ];
  },
  images: {
    // Allow optimized remote images. Replace/extend with your CDN (Bunny,
    // Cloudflare R2, Cloudinary) when wiring real media in Phase 2.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Supabase Storage (admin-uploaded media)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
