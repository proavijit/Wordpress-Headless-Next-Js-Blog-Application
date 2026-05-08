export default function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-soft/60 bg-card/80">
      <div className="aspect-[3/2] w-full animate-shimmer bg-accent/4" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 rounded-full bg-accent/8 animate-shimmer" />
        <div className="h-5 w-full rounded-xs bg-accent/8 animate-shimmer" />
        <div className="h-5 w-4/5 rounded-xs bg-accent/8 animate-shimmer" />
        <div className="h-4 w-full rounded-xs bg-accent/8 animate-shimmer" />
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-accent/8 animate-shimmer" />
          <div className="h-6 w-20 rounded-full bg-accent/8 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

