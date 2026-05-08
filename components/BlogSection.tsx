"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { WPCardPost, Tag } from "@/types/blog";
import BlogCard from "./BlogCard";
import TagFilter from "./TagFilter";

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

  const filteredPosts = useMemo(() => {
    if (activeTag === "All") return posts;
    return posts.filter((post) =>
      post.tags.nodes.some((t) => t.name === activeTag),
    );
  }, [activeTag, posts]);

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

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.databaseId} post={post} priority={index === 0} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted">
            No articles found for this topic.
          </p>
        )}
      </div>
    </section>
  );
}
