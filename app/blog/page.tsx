import Link from "next/link";
import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Sidebar from "@/components/Sidebar";
import { getPostsPage, getAllCategories } from "@/lib/posts";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Journal",
  description: "Browse all articles on Signal Notes — AI, programming, design, and more.",
};

const PAGE_SIZE = 9;

type Props = {
  searchParams?: Promise<{ after?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const after = params?.after || undefined;

  const [{ posts, pageInfo }, categories] = await Promise.all([
    getPostsPage(PAGE_SIZE, after),
    getAllCategories(),
  ]);

  return (
    <main id="main-content" className="bg-paper px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              All articles
            </p>
            <h1 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Journal
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted">
            All articles across {categories.length} categories.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="rounded-xs border border-soft bg-card px-4 py-2 text-xs font-medium text-muted transition duration-fast hover:border-accent hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
              >
                {cat.name}
                {cat.count != null && (
                  <span className="ml-1 text-muted/60">
                    ({cat.count})
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {posts.map((post, index) => (
              <BlogCard key={post.databaseId} post={post} priority={index < 3 && !after} />
            ))}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <Sidebar trending={posts} categories={categories} />
            </div>
          </aside>
        </div>

        {posts.length === 0 && (
          <p className="mt-20 text-center text-sm text-muted">
            No articles found. Check back soon.
          </p>
        )}

        <div className="mt-12 flex items-center justify-center gap-4">
          {after && (
            <Link
              href="/blog"
              className="rounded-xs border border-soft bg-card px-5 py-2.5 text-sm font-medium text-muted transition duration-fast hover:border-accent hover:text-accent"
            >
              Previous
            </Link>
          )}
          {pageInfo.hasNextPage && (
            <Link
              href={`/blog?after=${pageInfo.endCursor}`}
              className="rounded-xs border border-soft bg-card px-5 py-2.5 text-sm font-medium text-muted transition duration-fast hover:border-accent hover:text-accent"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
