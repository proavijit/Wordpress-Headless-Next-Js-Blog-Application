import BlogCardSkeleton from "@/components/BlogCardSkeleton";

export default function Loading() {
  return (
    <main id="main-content" className="bg-paper px-6 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="h-5 w-48 rounded-full bg-accent/8 animate-shimmer" />
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
