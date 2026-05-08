"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, TrendingUp, ArrowRight } from "lucide-react";
import type { WPCardPost } from "@/types/blog";

type Props = {
  featured: WPCardPost[];
  latest: WPCardPost[];
};

export default function HeroSection({ featured, latest }: Props) {
  const [current, setCurrent] = useState(0);
  const posts = featured.slice(0, 5);

  const next = useCallback(() => setCurrent((c) => (c + 1) % posts.length), [posts.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + posts.length) % posts.length), [posts.length]);

  useEffect(() => {
    if (posts.length < 2) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, posts.length]);

  const hero = posts[current];
  if (!hero) return null;

  const secondary = posts.slice(0, 4).filter((_, i) => i !== current);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/[0.03] to-paper px-6 pt-8 pb-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <TrendingUp className="h-3 w-3" />
              Featured
            </span>
            <span className="text-xs text-muted">
              Editor&apos;s picks
            </span>
          </div>
          <div className="hidden gap-1 sm:flex">
            <button
              type="button"
              onClick={prev}
              className="grid h-8 w-8 place-items-center rounded-xs border border-soft text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label="Previous featured post"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="grid h-8 w-8 place-items-center rounded-xs border border-soft text-muted transition-colors hover:border-accent hover:text-accent"
              aria-label="Next featured post"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Main Featured Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={hero.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-sm"
            >
              <Link href={`/blog/${hero.slug}`} className="block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-accent/5 sm:aspect-[2/1] lg:aspect-[16/9]">
                  {hero.featuredImage?.node ? (
                    <Image
                      src={hero.featuredImage.node.sourceUrl}
                      alt={hero.featuredImage.node.altText}
                      fill
                      priority
                      className="object-cover transition duration-slow group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 56vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-5xl font-light text-accent/20">
                        {hero.author.node.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                    {hero.categories.nodes[0] && (
                      <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-medium text-white mb-3">
                        {hero.categories.nodes[0].name}
                      </span>
                    )}
                    <h2 className="text-xl font-medium leading-tight text-white sm:text-2xl lg:text-3xl max-w-2xl">
                      {hero.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-6 text-white/80 empty:hidden">
                      {hero.excerpt ? hero.excerpt.replace(/<[^>]*>/g, "") : ""}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-white/70">
                      <span>{hero.author.node.name}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={hero.date}>
                        {new Date(hero.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {hero.readingTime?.replace(" min read", "m")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Secondary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.slice(0, 3).map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 rounded-sm border border-soft/50 bg-card/50 p-3 transition-all duration-normal hover:border-accent/20 hover:bg-card hover:shadow-sm"
              >
                <div className="relative w-24 shrink-0 overflow-hidden rounded-xs bg-accent/5 sm:w-28">
                  {post.featuredImage?.node ? (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText}
                      fill
                      className="object-cover transition duration-slow group-hover:scale-[1.05]"
                      sizes="112px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-lg font-light text-accent/20">
                      {post.author.node.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-accent">
                    {post.categories.nodes[0]?.name || "Article"}
                  </p>
                  <h3 className="mt-1 text-sm font-medium leading-snug text-ink line-clamp-2 transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {post.readingTime?.replace(" min read", "m")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        {posts.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {posts.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-normal ${
                  i === current ? "w-8 bg-accent" : "w-1.5 bg-soft hover:bg-accent/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
