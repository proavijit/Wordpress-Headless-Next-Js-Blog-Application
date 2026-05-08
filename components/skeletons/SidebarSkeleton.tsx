export default function SidebarSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-20 rounded-full bg-accent/8 animate-shimmer" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`h-3 rounded-full bg-accent/8 animate-shimmer ${i % 2 === 0 ? "w-full" : "w-4/5"}`} />
      ))}
    </div>
  );
}
