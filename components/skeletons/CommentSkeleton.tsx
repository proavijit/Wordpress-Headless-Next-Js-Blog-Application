export default function CommentSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-accent/8 animate-shimmer" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded-full bg-accent/8 animate-shimmer" />
            <div className="h-3 w-16 rounded-full bg-accent/8 animate-shimmer" />
            <div className="mt-2 space-y-1.5">
              <div className="h-3 w-full rounded-full bg-accent/8 animate-shimmer" />
              <div className="h-3 w-4/5 rounded-full bg-accent/8 animate-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
