"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommandPalette from "./CommandPalette";
import type { Category } from "@/types/blog";

type NavLink = { label: string; href: string };

const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Journal", href: "/blog" },
  { label: "Search", href: "/search" },
];

export default function Header({
  navLinks = defaultNavLinks,
  categories = [],
}: {
  navLinks?: NavLink[];
  categories?: Category[];
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
    setMobileCatOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const toggleTheme = useCallback(() => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }, [darkMode]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) =>
            link.label === "Search" ? null : (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-xs px-3 py-2 text-sm font-normal transition duration-fast ${
                  isActive(link.href)
                    ? "text-accent after:absolute after:-bottom-1 after:left-3 after:right-3 after:h-px after:bg-accent"
                    : "text-muted hover:text-ink hover:bg-soft"
                }`}
              >
                {link.label}
              </Link>
            ),
          )}

          {categories.length > 0 && (
            <div ref={catRef} className="relative">
              <button
                type="button"
                onClick={() => setCatOpen((c) => !c)}
                onMouseEnter={() => setCatOpen(true)}
                className={`flex items-center gap-1 rounded-xs px-3 py-2 text-sm font-normal transition duration-fast ${
                  catOpen || pathname.startsWith("/category")
                    ? "text-accent"
                    : "text-muted hover:text-ink hover:bg-soft"
                }`}
                aria-expanded={catOpen}
                aria-haspopup="true"
              >
                Topics
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-fast ${
                    catOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.12 }}
                    onMouseLeave={() => setCatOpen(false)}
                    className="absolute left-0 top-full mt-1 w-52 rounded-xs border border-soft bg-paper/95 backdrop-blur-lg shadow-lg"
                    role="menu"
                  >
                    <div className="py-1.5">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          onClick={() => setCatOpen(false)}
                          role="menuitem"
                          className={`flex items-center justify-between rounded-xs px-3 py-2 text-sm transition duration-fast ${
                            pathname === `/category/${cat.slug}`
                              ? "text-accent bg-accent/5"
                              : "text-muted hover:text-ink hover:bg-soft"
                          }`}
                        >
                          <span>{cat.name}</span>
                          {cat.count != null && (
                            <span className="text-[11px] text-muted/50">
                              {cat.count}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
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
            <div className="px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center rounded-xs px-3 py-2.5 text-sm font-normal transition duration-fast ${
                    isActive(link.href)
                      ? "text-accent bg-accent/5"
                      : "text-muted hover:text-ink hover:bg-soft"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {categories.length > 0 && (
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setMobileCatOpen((c) => !c)}
                    className={`flex w-full items-center justify-between rounded-xs px-3 py-2.5 text-sm font-normal transition duration-fast ${
                      mobileCatOpen || pathname.startsWith("/category")
                        ? "text-accent bg-accent/5"
                        : "text-muted hover:text-ink hover:bg-soft"
                    }`}
                    aria-expanded={mobileCatOpen}
                  >
                    <span>Topics</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-fast ${
                        mobileCatOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileCatOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-3 border-l border-soft pl-3 py-1">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/category/${cat.slug}`}
                              onClick={closeMenu}
                              className={`flex items-center justify-between rounded-xs px-3 py-2 text-sm transition duration-fast ${
                                pathname === `/category/${cat.slug}`
                                  ? "text-accent bg-accent/5"
                                  : "text-muted hover:text-ink hover:bg-soft"
                              }`}
                            >
                              <span>{cat.name}</span>
                              {cat.count != null && (
                                <span className="text-[11px] text-muted/50">{cat.count}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
