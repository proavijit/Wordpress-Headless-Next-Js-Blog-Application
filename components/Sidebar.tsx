"use client";

import Link from "next/link";
import type { Heading } from "@/types/blog";
import type { WPCardPost } from "@/types/blog";
import type { Category } from "@/types/blog";

type SidebarProps =
  | {
      type?: "default";
      trending?: WPCardPost[];
      categories?: Category[];
    }
  | {
      type: "post";
      toc?: Heading[];
      trending?: WPCardPost[];
    };

export default function Sidebar(props: SidebarProps) {
  const trending = "trending" in props ? props.trending : undefined;
  const categories =
    "categories" in props && props.categories ? props.categories : undefined;
  const toc = "toc" in props ? props.toc : undefined;

  return (
    <aside className="space-y-8">
      {toc && toc.length > 0 && (
        <div className="rounded-xs border border-soft bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-ink">On this page</h3>
          <nav className="space-y-1.5">
            {toc.map((h) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={`block text-xs leading-relaxed text-muted transition hover:text-accent ${
                  h.level === 3 ? "pl-3" : ""
                }`}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {trending && trending.length > 0 && (
        <div className="rounded-xs border border-soft bg-card p-5">
          <h3 className="mb-4 text-sm font-semibold text-ink">Trending</h3>
          <ol className="space-y-3">
            {trending.slice(0, 5).map((post, i) => (
              <li key={post.databaseId} className="flex gap-3">
                <span className="mt-0.5 text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs leading-snug text-muted transition hover:text-accent"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}

      {categories && categories.length > 0 && (
        <div className="rounded-xs border border-soft bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-ink">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="rounded-xs bg-soft px-3 py-1.5 text-xs text-muted transition hover:text-accent hover:bg-accent/10"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xs border border-soft bg-card p-5">
        <h3 className="mb-2 text-sm font-semibold text-ink">Newsletter</h3>
        <p className="mb-3 text-xs text-muted">
          Get the latest posts delivered to your inbox.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="rounded-xs border border-soft bg-paper px-3 py-2 text-xs text-ink placeholder:text-muted focus:outline-hidden focus:ring-2 focus:ring-accent/50"
          />
          <button
            type="submit"
            className="rounded-xs bg-accent px-3 py-2 text-xs font-medium text-white transition hover:bg-accent-hover"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
