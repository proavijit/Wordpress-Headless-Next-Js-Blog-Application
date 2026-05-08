import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllPosts, getRelatedPosts, getComments } from "@/lib/posts";
import { postToMetadata } from "@/lib/seo";
import { processContent } from "@/lib/content";
import PostContent from "@/components/PostContent";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import SocialShare from "@/components/SocialShare";
import AuthorBio from "@/components/AuthorBio";
import RelatedPosts from "@/components/RelatedPosts";
import CommentSection from "@/components/CommentSection";
import BackToTopButton from "@/components/BackToTopButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingShareBar from "@/components/FloatingShareBar";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await getAllPosts();
  return data.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return postToMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const image = post.featuredImage?.node;
  const { headings, modifiedHtml } = processContent(post.content);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://signal-notes.example.com";
  const firstCategory = post.categories.nodes[0];

  const [relatedPosts, comments] = await Promise.all([
    firstCategory
      ? getRelatedPosts(firstCategory.slug, post.databaseId).catch(() => [])
      : Promise.resolve([]),
    getComments(post.databaseId).catch(() => []),
  ]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/blog" },
    ...(firstCategory ? [{ label: firstCategory.name, href: `/category/${firstCategory.slug}` }] : []),
    { label: post.title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt?.replace(/<[^>]*>/g, ""),
        datePublished: post.date,
        dateModified: post.modified,
        author: {
          "@type": "Person",
          name: post.author.node.name,
          url: `${siteUrl}/author/${post.author.node.slug}`,
        },
        ...(image && { image: { "@type": "ImageObject", url: image.sourceUrl } }),
        publisher: { "@type": "Organization", name: "Signal Notes" },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
        wordCount: post.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
        })),
      },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <BackToTopButton />
      <FloatingShareBar title={post.title} url={`${siteUrl}/blog/${post.slug}`} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="px-6 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <header className="mx-auto mt-8 max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {post.categories.nodes.map((cat) => (
              <Badge key={cat.slug} href={`/category/${cat.slug}`}>
                {cat.name}
              </Badge>
            ))}
          </div>

          <h1 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <Link
              href={`/author/${post.author.node.slug}`}
              className="flex items-center gap-2.5 transition duration-fast hover:text-ink"
            >
              <div className="h-8 w-8 rounded-full bg-accent/15 grid place-items-center text-xs font-medium text-accent">
                {post.author.node.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <span className="font-medium text-ink">
                {post.author.node.name}
              </span>
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>
              {post.readingTime}
            </span>
            {post.modified !== post.date && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-xs text-muted">
                  Updated {new Date(post.modified).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>
        </header>

        {image && (
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xs">
            <Image
              src={image.sourceUrl}
              alt={image.altText}
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        <div className="mx-auto mt-12 max-w-3xl lg:grid lg:max-w-6xl lg:grid-cols-[1fr_280px] lg:gap-12">
          <div>
            <div className="lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            <div className="mt-8 lg:mt-0">
              <PostContent html={modifiedHtml} />
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <Sidebar
                type="post"
                toc={headings}
                trending={relatedPosts.length > 0 ? relatedPosts : undefined}
              />
            </div>
          </aside>
        </div>

        <footer className="mx-auto mt-14 max-w-3xl border-t border-soft pt-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.nodes.map((tag) => (
                <Badge key={tag.slug} href={`/tag/${tag.slug}`}>
                  {tag.name}
                </Badge>
              ))}
            </div>
            <SocialShare
              title={post.title}
              url={`${siteUrl}/blog/${post.slug}`}
            />
          </div>
        </footer>

        <div className="mx-auto mt-12 max-w-3xl space-y-12">
          <AuthorBio
            name={post.author.node.name}
            slug={post.author.node.slug}
            avatar={post.author.node.avatar}
          />

          {relatedPosts.length > 0 && (
            <RelatedPosts posts={relatedPosts} />
          )}

          <CommentSection postId={post.databaseId} initialComments={comments} />
        </div>
      </article>
    </>
  );
}
