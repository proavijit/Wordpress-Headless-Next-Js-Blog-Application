"use client";

import { useCallback, useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }, []);

  return (
    <button
      type="button"
      onClick={copyLink}
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-xs border border-soft bg-card px-4 py-2 text-xs font-medium text-muted transition duration-fast hover:border-accent hover:text-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <svg
        aria-hidden="true"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M10 13a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 0 0-7.1-7.1L11 4.9" />
        <path d="M14 11a5 5 0 0 0-7.1 0l-2.1 2.1a5 5 0 0 0 7.1 7.1l1.1-1.1" />
      </svg>
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
