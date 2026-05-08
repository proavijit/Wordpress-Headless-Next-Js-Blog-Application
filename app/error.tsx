"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="grid min-h-[60vh] place-items-center bg-paper px-6 py-20 text-center sm:px-8 lg:px-10">
      <div className="max-w-lg">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-ink">
          The page could not be loaded.
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          {error.message || "Please try again. If it keeps happening, check the console for details."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-xs bg-accent px-6 py-3 text-sm font-medium text-on-dark transition duration-fast hover:bg-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
