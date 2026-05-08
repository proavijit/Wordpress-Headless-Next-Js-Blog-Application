export default function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 lg:px-10">
      <div className="h-3 w-24 rounded-full bg-accent/8 animate-shimmer" />
      <div className="mt-6 space-y-4">
        <div className="h-10 w-full rounded-xs bg-accent/8 animate-shimmer" />
        <div className="h-10 w-4/5 rounded-xs bg-accent/8 animate-shimmer" />
        <div className="h-10 w-3/5 rounded-xs bg-accent/8 animate-shimmer" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="h-8 w-8 rounded-full bg-accent/8 animate-shimmer" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 rounded-full bg-accent/8 animate-shimmer" />
          <div className="h-3 w-32 rounded-full bg-accent/8 animate-shimmer" />
        </div>
      </div>
      <div className="mt-10 aspect-[3/2] w-full rounded-xs bg-accent/8 animate-shimmer" />
      <div className="mt-10 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-4 rounded-xs bg-accent/8 animate-shimmer ${i % 3 === 0 ? "w-3/4" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}
