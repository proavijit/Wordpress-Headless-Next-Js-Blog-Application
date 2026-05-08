import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ slug: tag.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getAllTags();
  const tag = tags.find((t) => t.slug === slug);
  if (!tag) return {};
  return {
    title: `#${tag.name} — Articles`,
    description: `Browse all articles tagged with ${tag.name}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tags = await getAllTags();
  const tag = tags.find((t) => t.slug === slug);
  if (!tag) notFound();

  const posts = await getPostsByTag(slug);

  return (
    <main id="main-content" className="bg-paper px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted transition duration-fast hover:text-ink"
        >
          &larr; Back to Journal
        </Link>
        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
            Tag
          </p>
          <h1 className="mt-1.5 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            #{tag.name}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {tag.count ?? posts.length} article{tag.count !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.databaseId} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="mt-20 text-center text-sm text-muted">
            No articles with this tag yet.
          </p>
        )}
      </div>
    </main>
  );
}
