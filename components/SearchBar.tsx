"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, useEffect, useRef, useCallback } from "react";
import { Search, X, Clock } from "lucide-react";

const RECENT_KEY = "sn-recent-searches";

function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecent(q: string) {
  const recent = getRecent().filter((x) => x !== q);
  recent.unshift(q);
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 5)));
}

export default function SearchBar({ initialQuery = "", autoFocus = false }: { initialQuery?: string; autoFocus?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [recent, setRecent] = useState<string[]>([]);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecent(getRecent());
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowRecent(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = useCallback(
    (q?: string) => {
      const term = (q || query).trim();
      if (!term) return;
      saveRecent(term);
      setRecent(getRecent());
      setShowRecent(false);
      router.push(`/search?q=${encodeURIComponent(term)}`);
    },
    [query, router],
  );

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    handleSubmit();
  }

  const clearInput = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <div ref={wrapperRef} className="relative" role="search">
      <form onSubmit={handleFormSubmit}>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowRecent(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setShowRecent(false);
              inputRef.current?.blur();
            }
          }}
          placeholder="Search articles..."
          className="w-full rounded-xs border border-soft bg-card py-3 pl-11 pr-10 text-sm text-ink placeholder:text-muted/50 transition duration-fast focus:border-accent focus:outline-hidden focus:ring-2 focus:ring-accent/20"
          autoComplete="off"
          aria-label="Search articles"
        />
        {query && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/50 hover:text-muted"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {showRecent && recent.length > 0 && !query && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-xs border border-soft bg-card shadow-lg z-10">
          <div className="flex items-center gap-2 px-4 pt-3 pb-1.5 text-xs font-medium text-muted/60">
            <Clock className="h-3 w-3" />
            Recent searches
          </div>
          {recent.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                handleSubmit(term);
              }}
              className="w-full px-4 py-2 text-left text-sm text-muted transition-colors hover:bg-soft hover:text-ink"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
