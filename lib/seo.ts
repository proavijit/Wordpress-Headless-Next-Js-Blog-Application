import type { Metadata } from "next";
import type { WPPost, Category, Author } from "@/types/blog";

export function postToMetadata(post: WPPost): Metadata {
  const title = post.title;
  const description = post.excerpt?.replace(/<[^>]*>/g, "");
  const image = post.featuredImage?.node.sourceUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.node.name],
      images: image ? [{ url: image, alt: post.featuredImage?.node.altText || "" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function categoryToMetadata(category: Category): Metadata {
  return {
    title: `${category.name} — Articles`,
    description: `Browse all articles in the ${category.name} category.`,
    openGraph: {
      title: `${category.name} | Signal Notes`,
      description: `Browse all articles in the ${category.name} category.`,
    },
  };
}

export function authorToMetadata(author: Author): Metadata {
  return {
    title: `${author.name} — Articles`,
    description: `Browse all articles by ${author.name}.`,
    openGraph: {
      title: `${author.name} | Signal Notes`,
      description: `Browse all articles by ${author.name}.`,
    },
  };
}
