import { notFound } from "next/navigation";
import Image from "next/image";
import { getPageBySlug, getAllPages } from "@/lib/posts";
import { processContent } from "@/lib/content";
import PostContent from "@/components/PostContent";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const pages = await getAllPages();
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.content?.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}

export default async function PagePage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  const { modifiedHtml } = processContent(page.content || "");
  const image = page.featuredImage?.node;

  return (
    <article className="px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        {image && (
          <div className="mb-10 overflow-hidden rounded-xs">
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

        <h1 className="text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {page.title}
        </h1>

        <div className="mt-10">
          <PostContent html={modifiedHtml} />
        </div>
      </div>
    </article>
  );
}
