"use client";

import { useState } from "react";
import { clsx } from "clsx";
import type { Heading } from "@/types/blog";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="not-prose">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xs border border-soft bg-card px-4 py-3 text-sm font-medium text-ink transition duration-fast hover:bg-accent/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 lg:hidden"
      >
        <span className="flex items-center gap-2">
          <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          On this page
        </span>
        <svg
          aria-hidden="true"
          className={clsx("h-3.5 w-3.5 transition-transform duration-fast", isOpen && "rotate-180")}
          fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className={clsx("mt-2 lg:mt-0", isOpen ? "block" : "hidden lg:block")}>
        <div className="rounded-xs border border-soft bg-card p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.1em] text-muted">
            On this page
          </p>
          <ul className="space-y-2">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={clsx(
                    "block text-sm transition duration-fast hover:text-accent focus-visible:outline-hidden focus-visible:text-accent",
                    h.level === 3 && "pl-4",
                    "text-muted",
                  )}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
