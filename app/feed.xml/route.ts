import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://signal-notes.example.com";
  const posts = await getAllPosts(20);

  const items = posts
    .map(
      (p) => `
    <entry>
      <id>${siteUrl}/blog/${p.slug}</id>
      <title>${escapeXml(p.title)}</title>
      <link href="${siteUrl}/blog/${p.slug}" />
      <updated>${new Date(p.modified).toISOString()}</updated>
      <published>${new Date(p.date).toISOString()}</published>
      <author><name>${escapeXml(p.author.node.name)}</name></author>
      <summary type="html"><![CDATA[${p.excerpt || ""}]]></summary>
    </entry>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Signal Notes</title>
  <subtitle>Modern tech blog about AI, programming, design, and software engineering</subtitle>
  <link href="${siteUrl}/feed.xml" rel="self" />
  <link href="${siteUrl}" />
  <updated>${new Date().toISOString()}</updated>
  <id>${siteUrl}</id>
  ${items}
</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
