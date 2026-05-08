export default function RichText({ html }: { html: string }) {
  return (
    <div
      className="prose prose-base max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink prose-p:leading-8 prose-p:text-ink prose-a:text-accent prose-a:no-underline prose-a:transition prose-a:duration-fast hover:prose-a:text-accent-hover prose-blockquote:border-l-accent prose-blockquote:text-muted prose-li:marker:text-accent/60 prose-strong:text-ink prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:rounded-xs prose-pre:border prose-pre:border-soft prose-pre:bg-card"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
