import { clsx } from "clsx";
import Link from "next/link";

type BadgeProps = {
  children: string;
  href?: string;
  className?: string;
};

export function Badge({ children, href, className }: BadgeProps) {
  const classes = clsx(
    "inline-block rounded-full bg-accent/10 px-3.5 py-1 text-xs font-medium text-accent transition duration-fast hover:bg-accent/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
