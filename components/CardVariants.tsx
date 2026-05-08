import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUpRight, TrendingUp, Eye } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import type { WPCardPost } from "@/types/blog";

type Variant = "default" | "featured" | "horizontal" | "compact" | "editorial";

export default function CardVariants({ post, variant = "default", priority = false }: { post: WPCardPost; variant?: Variant; priority?: boolean }) {
  const image = post.featuredImage?.node;
  const initials = post.author.node.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const category = post.categories.nodes[0];

  switch (variant) {
    case "featured":
      return (
        <article className="group relative overflow-hidden rounded-sm bg-card/80 border border-soft/60 transition-all duration-normal hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5">
          <Link href={`/blog/${post.slug}`} className="block sm:flex">
            <div className="relative aspect-[16/9] sm:aspect-[4/3] sm:w-2/5 shrink-0 overflow-hidden bg-accent/5">
              {image ? (
                <Image src={image.sourceUrl} alt={image.altText} fill className="object-cover transition duration-slow group-hover:scale-[1.04]" sizes="(min-width: 640px) 40vw, 100vw" />
              ) : (
                <div className="flex h-full items-center justify-center"><span className="text-4xl font-light text-accent/20">{initials}</span></div>
              )}
              {category && (
                <span className="absolute left-3 top-3 rounded-full bg-white/90 dark:bg-ink/90 px-2.5 py-0.5 text-[11px] font-medium text-muted backdrop-blur-[4px]">
                  {category.name}
                </span>
              )}
            </div>
            <div className="flex-1 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="font-medium">{post.author.node.name}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
              </div>
              <h3 className="mt-2 text-lg font-medium leading-snug text-ink transition-colors group-hover:text-accent">{post.title}</h3>
              <div className="mt-2 text-sm leading-7 text-muted empty:hidden" dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} />
              <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime?.replace(" min read", "m")}</span>
              </div>
            </div>
          </Link>
        </article>
      );

    case "horizontal":
      return (
        <article className="group flex gap-4 rounded-sm border border-soft/50 bg-card/50 p-3 transition-all duration-normal hover:border-accent/20 hover:bg-card hover:shadow-sm">
          <Link href={`/blog/${post.slug}`} className="flex gap-4 w-full">
            <div className="relative w-24 shrink-0 overflow-hidden rounded-xs bg-accent/5 sm:w-28 aspect-[4/3]">
              {image ? (
                <Image src={image.sourceUrl} alt={image.altText} fill className="object-cover transition duration-slow group-hover:scale-[1.05]" sizes="112px" />
              ) : (
                <div className="flex h-full items-center justify-center text-lg font-light text-accent/20">{initials}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-accent">{category?.name || "Article"}</p>
              <h3 className="mt-1 text-sm font-medium leading-snug text-ink line-clamp-2 transition-colors group-hover:text-accent">{post.title}</h3>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-muted">
                <span>{post.readingTime?.replace(" min read", "m")}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
              </div>
            </div>
          </Link>
        </article>
      );

    case "compact":
      return (
        <article className="group border-b border-soft/50 py-4 last:border-0">
          <Link href={`/blog/${post.slug}`} className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>{post.author.node.name}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
              </div>
              <h3 className="mt-1 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-accent line-clamp-2">{post.title}</h3>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-muted">
                <span className="text-accent">{category?.name}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime?.replace(" min read", "m")}</span>
              </div>
            </div>
            {image && (
              <div className="relative w-16 shrink-0 overflow-hidden rounded-xs bg-accent/5 aspect-[4/3]">
                <Image src={image.sourceUrl} alt={image.altText} fill className="object-cover" sizes="64px" />
              </div>
            )}
          </Link>
        </article>
      );

    case "editorial":
      return (
        <article className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-accent/[0.02] to-transparent border border-soft/50 transition-all duration-normal hover:border-accent/20 hover:shadow-md">
          <Link href={`/blog/${post.slug}`} className="block p-6">
            <div className="flex items-center gap-2 text-xs text-muted">
              {category && <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">{category.name}</span>}
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
            </div>
            <h3 className="mt-4 text-xl font-medium leading-snug text-ink transition-colors group-hover:text-accent">{post.title}</h3>
            <div className="mt-3 text-sm leading-7 text-muted empty:hidden" dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} />
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted">
                <div className="h-6 w-6 rounded-full bg-accent/15 grid place-items-center text-[10px] font-medium text-accent">{initials}</div>
                <span className="font-medium text-ink">{post.author.node.name}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime?.replace(" min read", "m")}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted/30 transition-colors group-hover:text-accent" />
            </div>
          </Link>
        </article>
      );

    default:
      return (
        <article className="group relative overflow-hidden rounded-sm border border-soft/60 bg-card/80 backdrop-blur-[2px] transition-all duration-normal hover:border-accent/25 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 transition-opacity duration-normal group-hover:opacity-100 pointer-events-none" />
          <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="block">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-accent/5">
              {image ? (
                <Image src={image.sourceUrl} alt={image.altText} width={900} height={600} priority={priority} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition duration-slow group-hover:scale-[1.04]" />
              ) : (
                <div className="flex h-full items-center justify-center"><span className="text-3xl font-light text-accent/30">{initials}</span></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-normal group-hover:opacity-100" />
              {category && (
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 dark:bg-ink/90 px-3 py-0.5 text-[11px] font-medium text-muted backdrop-blur-[4px] shadow-xs">{category.name}</span>
              )}
            </div>
          </Link>
          <div className="p-6">
            <div className="flex items-center gap-2.5 text-xs text-muted">
              <Link href={`/author/${post.author.node.slug}`} className="font-medium text-muted transition duration-fast hover:text-ink">{post.author.node.name}</Link>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
            </div>
            <h3 className="mt-3 text-lg font-medium leading-snug text-ink transition duration-fast group-hover:text-accent">
              <Link href={`/blog/${post.slug}`} className="inline-flex items-start gap-1">{post.title}<ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-fast group-hover:opacity-100" /></Link>
            </h3>
            <div className="mt-2 text-sm leading-7 text-muted empty:hidden" dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} />
            <div className="mt-5 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">{post.tags.nodes.slice(0, 2).map((tag) => (<Badge key={tag.slug} href={`/tag/${tag.slug}`}>{tag.name}</Badge>))}</div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-muted"><Clock className="h-3 w-3" />{post.readingTime?.replace(" min read", "m")}</span>
                <BookmarkButton postId={post.databaseId} />
              </div>
            </div>
          </div>
        </article>
      );
  }
}
