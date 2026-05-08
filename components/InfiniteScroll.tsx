"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { RefreshCw } from "lucide-react";

type Props = {
  hasNextPage: boolean;
  onLoadMore: () => void;
  loading?: boolean;
  children: React.ReactNode;
};

export default function InfiniteScroll({ hasNextPage, onLoadMore, loading = false, children }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [manualLoading, setManualLoading] = useState(false);

  useEffect(() => {
    if (!hasNextPage || loading) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !loading) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, loading, onLoadMore]);

  const handleManualLoad = useCallback(() => {
    setManualLoading(true);
    onLoadMore();
    setTimeout(() => setManualLoading(false), 1000);
  }, [onLoadMore]);

  return (
    <>
      {children}

      <div ref={sentinelRef} className="mt-8">
        {loading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        )}

        {hasNextPage && !loading && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleManualLoad}
              disabled={manualLoading}
              className="inline-flex items-center gap-2 rounded-xs border border-soft bg-card px-6 py-3 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${manualLoading ? "animate-spin" : ""}`} />
              Load more articles
            </button>
          </div>
        )}

        {!hasNextPage && (
          <p className="mt-12 text-center text-xs text-muted/60">
            You&apos;ve reached the end. Check back for new articles.
          </p>
        )}
      </div>
    </>
  );
}
