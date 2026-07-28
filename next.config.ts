import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
