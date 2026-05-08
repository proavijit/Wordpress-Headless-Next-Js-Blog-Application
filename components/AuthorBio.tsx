import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";

type AuthorBioProps = {
  name: string;
  slug: string;
  avatar?: { url: string } | null;
  description?: string | null;
};

export default function AuthorBio({ name, slug, avatar, description }: AuthorBioProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="rounded-xs border border-soft bg-card p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Link href={`/author/${slug}`}>
          <Avatar src={avatar?.url} initials={initials} className="h-14 w-14" />
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">
            Written by
          </p>
          <Link
            href={`/author/${slug}`}
            className="mt-1.5 text-lg font-medium text-ink transition duration-fast hover:text-accent"
          >
            {name}
          </Link>
          {description && (
            <p className="mt-2 text-sm leading-7 text-muted">
              {description}
            </p>
          )}
          <Link
            href={`/author/${slug}`}
            className="mt-3 inline-flex text-sm font-medium text-accent transition duration-fast hover:text-accent-hover focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            View all articles by {name}
          </Link>
        </div>
      </div>
    </div>
  );
}
