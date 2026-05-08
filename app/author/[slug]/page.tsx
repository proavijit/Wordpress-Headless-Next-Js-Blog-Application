import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByAuthor, getAllAuthors } from "@/lib/posts";
import { authorToMetadata } from "@/lib/seo";
import BlogCard from "@/components/BlogCard";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const authors = await getAllAuthors();
  const author = authors.find((a) => a.slug === slug);
  if (!author) return {};
  return authorToMetadata(author);
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPostsByAuthor(slug);
  if (!result) notFound();

  const { author, posts } = result;

  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main id="main-content" className="bg-paper px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted transition duration-fast hover:text-ink"
        >
          &larr; Back to Journal
        </Link>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="h-16 w-16 rounded-full bg-accent/15 grid shrink-0 place-items-center text-sm font-medium text-accent">
            {initials}
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              Author
            </p>
            <h1 className="mt-1.5 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              {author.name}
            </h1>
            {author.description && (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                {author.description}
              </p>
            )}
            <p className="mt-2 text-sm text-muted">
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.databaseId} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <p className="mt-20 text-center text-sm text-muted">
            No articles by this author yet.
          </p>
        )}
      </div>
    </main>
  );
}
