"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

export default function BookmarkButton({ postId }: { postId: number }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("sn-store");
      if (!raw) return;
      const bookmarks: number[] = JSON.parse(raw)?.state?.bookmarks || [];
      setIsBookmarked(bookmarks.includes(postId));
    } catch {}
  }, [postId]);

  const toggle = () => {
    try {
      const raw = window.localStorage.getItem("sn-store");
      const data: any = raw ? JSON.parse(raw) : {};
      const bm: number[] = data?.state?.bookmarks || [];
      const next = bm.includes(postId)
        ? bm.filter((id: number) => id !== postId)
        : [...bm, postId];
      data.state = { ...data.state, bookmarks: next };
      window.localStorage.setItem("sn-store", JSON.stringify(data));
      setIsBookmarked(next.includes(postId));
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
      className="text-muted/50 transition-colors duration-fast hover:text-accent"
      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
    >
      <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? "fill-accent text-accent" : ""}`} />
    </button>
  );
}
