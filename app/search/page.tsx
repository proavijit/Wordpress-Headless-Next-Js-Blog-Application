import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { searchPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles on Signal Notes.",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let posts: { title: string; slug: string; excerpt: string; date: string; author: { node: { name: string } }; featuredImage?: { node: { sourceUrl: string; altText: string } } | null; categories: { nodes: { name: string; slug: string }[] } }[] = [];
  let totalResults = 0;

  if (query) {
    const result = await searchPosts(query);
    posts = result.nodes;
    totalResults = posts.length;
  }

  return (
    <main id="main-content" className="bg-paper px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          Search
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {query ? `Results for "${query}"` : "Search the journal"}
        </h1>

        <div className="mt-8">
          <SearchBar initialQuery={query} />
        </div>

        {query && (
          <p className="mt-4 text-sm text-muted">
            {totalResults > 0
              ? `${totalResults} article${totalResults !== 1 ? "s" : ""} found`
              : "No articles found. Try a different search term."}
          </p>
        )}

        {posts.length > 0 && (
          <div className="mt-8 space-y-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xs border border-soft bg-card p-6 transition duration-fast hover:border-accent/20"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-lg font-medium text-ink transition duration-fast hover:text-accent">
                    {post.title}
                  </h2>
                </Link>
                <div
                  className="mt-2 text-sm leading-7 text-muted empty:hidden"
                  dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                />
                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  <span>{post.author.node.name}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  {post.categories.nodes.length > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{post.categories.nodes[0].name}</span>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {!query && (
          <p className="mt-8 text-sm text-muted">
            Enter a search term above to find articles.
          </p>
        )}
      </div>
    </main>
  );
}
