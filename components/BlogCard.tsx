import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUpRight } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import type { WPCardPost } from "@/types/blog";

export default function BlogCard({ post, priority = false }: { post: WPCardPost; priority?: boolean }) {
  const image = post.featuredImage?.node;
  const authorInitials = post.author.node.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const primaryCategory = post.categories.nodes[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-soft/20 bg-card/60 backdrop-blur-[4px] shadow-xs transition-all duration-normal hover:border-accent/20 hover:shadow-lg hover:shadow-accent/6 hover:-translate-y-0.5">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-normal group-hover:opacity-100 pointer-events-none" />

      <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className="block">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink/[0.02] dark:bg-ink/[0.04]">
          {image ? (
            <Image
              src={image.sourceUrl}
              alt={image.altText}
              width={900}
              height={600}
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover transition-all duration-[400ms] group-hover:scale-[1.06] group-hover:rotate-[0.5deg]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/[0.03] to-transparent">
              <span className="text-3xl font-light text-accent/20 tracking-widest">{authorInitials}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-normal group-hover:opacity-100" />
          {primaryCategory && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 dark:bg-ink/90 px-2.5 py-0.5 text-[11px] font-medium text-muted backdrop-blur-[4px]">
              {primaryCategory.name}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted/70">
          <Link
            href={`/author/${post.author.node.slug}`}
            className="relative z-10 flex items-center gap-2 transition-colors hover:text-ink"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/12 text-[8px] font-medium text-accent">
              {authorInitials}
            </span>
            <span className="font-medium">{post.author.node.name}</span>
          </Link>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>

        <h3 className="mt-2.5 text-lg font-medium leading-snug text-ink transition duration-fast group-hover:text-accent line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="inline-flex items-start gap-1.5">
            {post.title}
            <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/30 opacity-0 transition-all duration-fast group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </h3>

        <div
          className="mt-1 text-sm leading-6 text-muted/70 empty:hidden line-clamp-1"
          dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
        />

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-soft/20 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.nodes.slice(0, 2).map((tag) => (
              <Badge key={tag.slug} href={`/tag/${tag.slug}`}>
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 whitespace-nowrap text-[11px] text-muted/40">
              <Clock className="h-3 w-3" />
              {post.readingTime?.replace(" min read", "m")}
            </span>
            <div className="h-3 w-px bg-soft/50" />
            <BookmarkButton postId={post.databaseId} />
          </div>
        </div>
      </div>
    </article>
  );
}
