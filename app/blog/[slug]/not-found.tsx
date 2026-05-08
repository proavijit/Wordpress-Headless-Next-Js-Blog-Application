import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main id="main-content" className="grid min-h-[60vh] place-items-center bg-paper px-6 py-20 text-center sm:px-8 lg:px-10">
      <div className="max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          Article not found
        </p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-ink">
          We could not find that post.
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Browse the latest articles or choose a different topic from the blog list.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex rounded-xs bg-accent px-6 py-3 text-sm font-medium text-on-dark transition duration-fast hover:bg-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          Back to Journal
        </Link>
      </div>
    </main>
  );
}
