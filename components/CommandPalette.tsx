"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((c) => !c);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const search = useCallback(() => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      setQuery("");
    }
  }, [query, router]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-xs border border-soft bg-card px-3 py-1.5 text-xs text-muted/50 transition-colors hover:border-accent hover:text-muted"
        aria-label="Open command palette (Cmd+K)"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="ml-4 rounded-xs border border-soft bg-paper px-1.5 py-0.5 text-[10px] text-muted/40">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-sm border border-soft bg-card shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Search articles"
            >
              <div className="flex items-center border-b border-soft px-4">
                <Search className="h-4 w-4 text-muted/50" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") search();
                    if (e.key === "Escape") setOpen(false);
                  }}
                  placeholder="Search articles..."
                  className="flex-1 bg-transparent px-3 py-4 text-sm text-ink outline-none placeholder:text-muted/30"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-7 w-7 place-items-center rounded-xs text-muted/50 hover:text-muted"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto p-2">
                {!query ? (
                  <div className="space-y-1">
                    <p className="px-3 py-2 text-xs font-medium text-muted/50">
                      <TrendingUp className="mr-1.5 inline h-3 w-3" />
                      Suggestions
                    </p>
                    {["AI", "design", "programming", "React", "Next.js"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          router.push(`/search?q=${encodeURIComponent(s)}`);
                          setOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xs px-3 py-2 text-sm text-muted transition-colors hover:bg-soft hover:text-ink"
                      >
                        <Search className="h-3.5 w-3.5 text-muted/40" />
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={search}
                    className="flex w-full items-center gap-3 rounded-xs px-3 py-3 text-sm text-muted transition-colors hover:bg-soft hover:text-ink"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-accent" />
                    Search for &ldquo;{query}&rdquo;
                  </button>
                )}
              </div>

              <div className="border-t border-soft px-4 py-2 text-[10px] text-muted/40">
                <span className="inline-flex items-center gap-2">
                  <kbd className="rounded-xs border border-soft bg-paper px-1 py-0.5">↑↓</kbd> Navigate
                  <kbd className="rounded-xs border border-soft bg-paper px-1 py-0.5">↵</kbd> Open
                  <kbd className="rounded-xs border border-soft bg-paper px-1 py-0.5">Esc</kbd> Close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
