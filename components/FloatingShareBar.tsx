"use client";

import { useEffect, useState, useCallback } from "react";
import { Link2, Check, Heart } from "lucide-react";

type Props = {
  title: string;
  url: string;
};

export default function FloatingShareBar({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyLink = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [url]);

  const like = useCallback(() => {
    setLiked((c) => !c);
    setLikeCount((c) => c + (liked ? -1 : 1));
  }, [liked]);

  if (!scrolled) return null;

  return (
    <nav className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex" aria-label="Share article">
      <button
        type="button"
        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank", "noopener")}
        className="grid h-9 w-9 place-items-center rounded-full border border-soft bg-card text-muted transition-colors hover:border-accent hover:text-accent"
        aria-label="Share on Twitter"
      >
        <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </button>

      <button
        type="button"
        onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank", "noopener")}
        className="grid h-9 w-9 place-items-center rounded-full border border-soft bg-card text-muted transition-colors hover:border-accent hover:text-accent"
        aria-label="Share on LinkedIn"
      >
        <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </button>

      <button
        type="button"
        onClick={copyLink}
        className="grid h-9 w-9 place-items-center rounded-full border border-soft bg-card text-muted transition-colors hover:border-accent hover:text-accent"
        aria-label={copied ? "Copied" : "Copy link"}
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
      </button>

      <div className="h-px w-6 bg-soft" />

      <button
        type="button"
        onClick={like}
        className={`grid h-9 w-9 place-items-center rounded-full border transition-colors ${
          liked ? "border-accent bg-accent/10 text-accent" : "border-soft bg-card text-muted hover:border-accent hover:text-accent"
        }`}
        aria-label={liked ? "Unlike" : "Like"}
      >
        <Heart className={`h-4 w-4 ${liked ? "fill-accent" : ""}`} />
      </button>
      {likeCount > 0 && <span className="text-[10px] text-muted">{likeCount}</span>}
    </nav>
  );
}
