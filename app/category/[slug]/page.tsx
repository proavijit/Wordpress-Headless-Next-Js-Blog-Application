import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByCategory, getAllCategories } from "@/lib/posts";
import { categoryToMetadata } from "@/lib/seo";
import BlogCard from "@/components/BlogCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return categoryToMetadata(cat);
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPostsByCategory(slug);
  if (!result) notFound();

  const { category, posts } = result;

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
            Category
          </p>
          <h1 className="mt-1.5 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              {category.description}
            </p>
          )}
          <p className="mt-2 text-sm text-muted">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.databaseId} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-20 text-center text-sm text-muted">
            No articles in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
