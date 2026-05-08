import type { NextConfig } from "next";

const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://mellowhair.s6-tastewp.com`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' blob: data: https://mellowhair.s6-tastewp.com https://*.wp.com https://gravatar.com`,
  `font-src 'self' data:`,
  `connect-src 'self' https://mellowhair.s6-tastewp.com`,
  `frame-ancestors 'none'`,
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mellowhair.s6-tastewp.com",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/feed.xml",
        headers: [
          { key: "Content-Type", value: "application/atom+xml; charset=utf-8" },
          { key: "Cache-Control", value: "s-maxage=3600, stale-while-revalidate" },
        ],
      },
    ];
  },
  serverExternalPackages: [],
};

export default nextConfig;
