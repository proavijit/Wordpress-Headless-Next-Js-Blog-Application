import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://signal-notes.example.com";

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  try {
    const data = await getAllSlugs();

    const postEntries: MetadataRoute.Sitemap = data.posts.nodes.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const categoryEntries: MetadataRoute.Sitemap = data.categories.nodes.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const authorEntries: MetadataRoute.Sitemap = data.users.nodes.map((user) => ({
      url: `${baseUrl}/author/${user.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

    const pageEntries: MetadataRoute.Sitemap = data.pages.nodes.map((p) => ({
      url: `${baseUrl}/page/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

    return [...staticEntries, ...postEntries, ...categoryEntries, ...authorEntries, ...pageEntries];
  } catch {
    return staticEntries;
  }
}
