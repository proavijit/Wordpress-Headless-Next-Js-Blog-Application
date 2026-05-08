import Image from "next/image";
import Link from "next/link";
import BlogSection from "@/components/BlogSection";
import HeroSection from "@/components/HeroSection";
import CardVariants from "@/components/CardVariants";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getAllPosts, getAllTags, getAllCategories } from "@/lib/posts";

export const revalidate = 3600;

export default async function Home() {
  const [posts, tags, categories] = await Promise.all([
    getAllPosts(),
    getAllTags(),
    getAllCategories(),
  ]);

  const featured = posts.slice(0, 5);
  const editorPicks = posts.slice(5, 9);
  const trending = posts.slice(0, 8);
  const latest = posts;

  return (
    <main id="main-content">
      {/* Premium Hero with Carousel */}
      <HeroSection featured={featured} latest={latest} />

      {/* Editor Picks Section */}
      {editorPicks.length > 0 && (
        <Reveal>
          <section className="relative border-b border-soft/50 bg-paper px-6 py-16 sm:px-8 lg:px-10">
            <div className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-accent/40 to-transparent" />
            <div className="mx-auto max-w-7xl">
              <div className="flex items-end justify-between border-b border-soft/20 pb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent/50">Curated for you</span>
                  <h2 className="mt-1 text-lg font-medium text-ink">Editor&apos;s Picks</h2>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-medium text-muted/60 transition-colors hover:text-accent">
                  View all <svg aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </Link>
              </div>
              <Stagger className="mt-6 grid gap-5 md:grid-cols-2">
                {editorPicks.map((post) => (
                  <StaggerItem key={post.databaseId}>
                    <CardVariants post={post} variant="editorial" />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        </Reveal>
      )}

      {/* Trending Section */}
      <Reveal>
        <section className="border-b border-soft/50 bg-paper px-6 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2 mb-8">
              <svg aria-hidden="true" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              <h2 className="text-sm font-medium text-ink">Trending Now</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trending.slice(0, 4).map((post, i) => {
                const image = post.featuredImage?.node;
                const initials = post.author.node.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
                const category = post.categories.nodes[0];
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                    <article className="flex items-center gap-4 rounded-sm border border-soft/20 bg-card/30 p-4 transition-all duration-normal hover:border-accent/20 hover:bg-card hover:shadow-sm">
                      <span className="text-3xl font-bold text-accent/20 tabular-nums leading-none transition-colors group-hover:text-accent/30">{String(i + 1).padStart(2, "0")}</span>
                      <div className="relative w-14 shrink-0 overflow-hidden rounded-xs bg-accent/5 aspect-square sm:w-16">
                        {image ? (
                          <Image src={image.sourceUrl} alt={image.altText} fill className="object-cover transition duration-slow group-hover:scale-[1.08]" sizes="64px" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs font-light text-accent/15">{initials}</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        {category && (
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent/70">{category.name}</span>
                        )}
                        <h3 className="mt-0.5 text-sm font-medium leading-snug text-ink line-clamp-2 transition-colors group-hover:text-accent">{post.title}</h3>
                        <p className="mt-1 text-[11px] text-muted/60">{post.readingTime?.replace(" min read", "m")}</p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Latest with Tag Filter */}
      <Reveal>
        <BlogSection posts={posts} tags={tags} />
      </Reveal>

      {/* Newsletter CTA */}
      <Reveal>
        <section className="bg-gradient-to-b from-paper to-accent/[0.02] px-6 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
              <svg aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Stay informed
            </div>
            <h2 className="mt-6 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Get the best articles delivered weekly
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted max-w-md mx-auto">
              Join {posts.length}+ readers. No spam, unsubscribe anytime.
            </p>
            <div className="mx-auto mt-8 flex max-w-sm gap-3">
              <label htmlFor="hero-email" className="sr-only">Email address</label>
              <input
                id="hero-email"
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-xs border border-soft bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/40 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="rounded-xs bg-accent px-5 py-2.5 text-sm font-medium text-white shrink-0">
                Subscribe
              </span>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
