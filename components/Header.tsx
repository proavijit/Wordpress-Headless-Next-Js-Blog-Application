"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "./CommandPalette";

type NavLink = { label: string; href: string };

const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Journal", href: "/blog" },
  { label: "Search", href: "/search" },
];

export default function Header({ navLinks = defaultNavLinks }: { navLinks?: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("sn-store");
    let isDark = false;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        isDark = parsed?.state?.theme === "dark";
      } catch {}
    } else {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, [setDarkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const toggleTheme = useCallback(() => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }, [darkMode]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-normal ${
        scrolled
          ? "border-b border-soft bg-paper/90 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-paper/95"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-medium text-ink transition hover:text-accent"
          onClick={closeMenu}
        >
          <span className="grid h-8 w-8 place-items-center rounded-xs bg-accent text-xs font-medium text-white">
            SN
          </span>
          <span className="text-base tracking-tight">Signal Notes</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-normal text-muted transition duration-fast hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-fast hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <CommandPalette />
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-xs text-muted transition duration-fast hover:text-ink hover:bg-soft focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mounted && (darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((c) => !c)}
            className="grid h-9 w-9 place-items-center rounded-xs text-muted transition duration-fast hover:text-ink hover:bg-soft focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-soft bg-paper md:hidden"
          >
            <div className="px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-xs px-3 py-3 text-sm font-normal text-muted transition duration-fast hover:text-ink hover:bg-soft"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
