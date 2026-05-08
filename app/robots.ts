import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/api/"],
    },
    sitemap: "https://signal-notes.example.com/sitemap.xml",
  };
}
