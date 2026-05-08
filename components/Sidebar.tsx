"use client";

import Link from "next/link";
import { TrendingUp, Clock, Sparkles, Mail } from "lucide-react";
import type { WPCardPost, Category } from "@/types/blog";

type Props = {
  trending?: WPCardPost[];
  categories?: Category[];
  toc?: { id: string; text: string; level: number }[];
  type?: "post" | "blog";
};

export default function Sidebar({ trending, categories, toc, type = "blog" }: Props) {
  return (
    <aside className="space-y-8" aria-label="Sidebar">
      {/* Table of Contents (on post pages) */}
      {type === "post" && toc && toc.length > 0 && (
        <div className="rounded-sm border border-soft/50 bg-card/50 p-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-muted">On this page</h3>
          <nav className="mt-3 space-y-1.5">
            {toc.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`block text-xs transition-colors duration-fast hover:text-accent ${
                  heading.level === 3 ? "pl-3 text-muted/70" : "text-muted"
                }`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Trending Posts */}
      {trending && trending.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-muted">
            <TrendingUp className="h-3 w-3 text-accent" />
            Trending now
          </div>
          <div className="mt-4 space-y-0">
            {trending.slice(0, 5).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-3 border-b border-soft/30 py-3 last:border-0"
              >
                <span className="mt-0.5 text-xs font-medium text-muted/40 tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium leading-snug text-ink transition-colors group-hover:text-accent line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted">
                    {post.readingTime?.replace(" min read", "m")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-muted">Categories</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="rounded-full border border-soft bg-card px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {cat.name}
                {cat.count != null && <span className="ml-1 text-muted/50">({cat.count})</span>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      <div className="rounded-sm border border-accent/15 bg-accent/[0.03] p-5">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-medium text-ink">Newsletter</h3>
        </div>
        <p className="mt-2 text-xs leading-6 text-muted">
          Get the latest posts delivered to your inbox.
        </p>
        <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter signup">
          <label htmlFor="sidebar-email" className="sr-only">Email</label>
          <input
            id="sidebar-email"
            type="email"
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-xs border border-soft bg-card px-3 py-2 text-xs text-ink outline-none transition-colors placeholder:text-muted/40 focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            className="rounded-xs bg-accent px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Join
          </button>
        </form>
      </div>

      {/* AI Recommendations Placeholder */}
      <div className="rounded-sm border border-soft/30 bg-card/30 p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-medium text-ink">AI Picks</h3>
        </div>
        <p className="mt-2 text-xs leading-6 text-muted">
          Personalized recommendations powered by AI.
        </p>
        <div className="mt-3 space-y-2">
          <div className="h-3 rounded-full bg-accent/8 animate-shimmer w-4/5" />
          <div className="h-3 rounded-full bg-accent/8 animate-shimmer w-3/5" />
          <div className="h-3 rounded-full bg-accent/8 animate-shimmer w-5/6" />
        </div>
      </div>
    </aside>
  );
}
