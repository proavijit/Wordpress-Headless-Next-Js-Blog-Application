"use client";

import { useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

export default function PostContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pres = ref.current.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      pre.classList.add("relative", "group");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "copy-btn absolute top-2 right-2 z-10 grid h-7 w-7 place-items-center rounded-xs bg-white/10 text-white/60 opacity-0 transition-all duration-fast group-hover:opacity-100 hover:bg-white/20 hover:text-white";
      btn.setAttribute("aria-label", "Copy code");
      const icon = document.createElement("span");
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
      btn.appendChild(icon);
      const code = pre.querySelector("code");
      btn.addEventListener("click", async () => {
        const text = code?.textContent || "";
        await navigator.clipboard.writeText(text);
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => {
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
        }, 1500);
      });
      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose prose-base max-w-3xl prose-headings:font-medium prose-headings:text-ink prose-p:text-muted prose-p:leading-7 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-pre:bg-ink prose-pre:text-paper prose-pre:border prose-pre:border-soft prose-img:rounded-xs prose-code:bg-accent/8 prose-code:text-accent prose-code:px-1 prose-code:py-0.5 prose-code:rounded-xs prose-code:text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


