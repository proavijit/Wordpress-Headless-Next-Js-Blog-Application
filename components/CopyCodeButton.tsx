"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <button
      type="button"
      onClick={copy}
      className="absolute top-2 right-2 z-10 grid h-7 w-7 place-items-center rounded-xs bg-white/10 text-white/60 opacity-0 transition-all duration-fast group-hover:opacity-100 hover:bg-white/20 hover:text-white"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
