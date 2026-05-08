"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const documentHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress =
          documentHeight > 0
            ? Math.min(scrollTop / documentHeight, 1)
            : 0;

        setProgress(nextProgress);
      });
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-16 z-40 h-0.5 w-full origin-left bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-accent/60 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
