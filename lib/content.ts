import type { Heading } from "@/types/blog";

export function processContent(html: string): { headings: Heading[]; modifiedHtml: string } {
  const headings: Heading[] = [];

  const modifiedHtml = html.replace(
    /<h([23])([^>]*)>(.+?)<\/h\1>/gi,
    (_match: string, level: string, attrs: string, innerHtml: string) => {
      const cleanText = innerHtml.replace(/<[^>]*>/g, "").trim();
      const id = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      headings.push({ id, text: cleanText, level: parseInt(level) });

      if (/id=(["'])/.test(attrs)) {
        return `<h${level}${attrs}>${innerHtml}</h${level}>`;
      }

      return `<h${level} id="${id}"${attrs}>${innerHtml}</h${level}>`;
    },
  );

  return { headings, modifiedHtml };
}
