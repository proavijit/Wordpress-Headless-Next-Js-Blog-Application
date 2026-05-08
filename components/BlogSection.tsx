"use client";

import { useCallback, useMemo, useSyncExternalStore, useState, useEffect } from "react";
import type { WPCardPost, Tag } from "@/types/blog";
import BlogCard from "./BlogCard";
import TagFilter from "./TagFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BlogSectionProps = {
  posts: WPCardPost[];
  tags: Tag[];
};

function subscribeToUrlChanges(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener("hashchange", onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener("hashchange", onStoreChange);
  };
}

function getUrlTag() {
  if (typeof window === "undefined") return "All";
  return new URLSearchParams(window.location.search).get("tag") || "All";
}

export default function BlogSection({ posts, tags }: BlogSectionProps) {
  const urlTag = useSyncExternalStore(subscribeToUrlChanges, getUrlTag, () => "All");
  const tagNames = ["All", ...tags.map((t) => t.name)];
  const activeTag = tagNames.includes(urlTag) ? urlTag : "All";
  const postsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTag]);

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) =>
      post.tags.nodes.some((t) => t.name === activeTag),
    );
  }, [activeTag, posts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    document.getElementById("blog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleTagChange = useCallback((tag: string) => {
    const url = new URL(window.location.href);
    if (tag === "All") {
      url.searchParams.delete("tag");
    } else {
      url.searchParams.set("tag", tag);
    }
    url.hash = "blog";
    window.history.pushState(null, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="bg-paper px-6 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
              Latest entries
            </p>
            <h2
              id="blog-heading"
              className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl"
            >
              Read the journal
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-muted">
            Browse concise, practical articles by topic.
          </p>
        </div>

        <div className="mt-8">
          <TagFilter tags={tagNames} activeTag={activeTag} onChange={handleTagChange} />
        </div>

        {filteredPosts.length > 0 ? (
          <>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post, index) => (
                <BlogCard key={post.databaseId} post={post} priority={index === 0} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Pagination">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xs text-xs text-muted transition-colors hover:bg-accent/10 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xs text-xs font-medium transition-colors ${
                      page === currentPage
                        ? "bg-accent text-white shadow-xs"
                        : "text-muted hover:bg-accent/10 hover:text-accent"
                    }`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xs text-xs text-muted transition-colors hover:bg-accent/10 hover:text-accent disabled:pointer-events-none disabled:opacity-30"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </>
        ) : (
          <p className="mt-16 text-center text-sm text-muted">
            No articles found for this topic.
          </p>
        )}
      </div>
    </section>
  );
}
