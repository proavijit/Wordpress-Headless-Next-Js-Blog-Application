import { clsx } from "clsx";

type AvatarProps = {
  src?: string | null;
  initials: string;
  className?: string;
};

export function Avatar({ src, initials, className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={initials}
        className={clsx("rounded-full object-cover", className ?? "h-10 w-10")}
      />
    );
  }

  return (
    <div
      className={clsx(
        "grid place-items-center rounded-full bg-accent/15 text-xs font-medium text-accent",
        className ?? "h-10 w-10",
      )}
    >
      {initials}
    </div>
  );
}
