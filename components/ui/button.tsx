import { forwardRef } from "react";
import { clsx } from "clsx";

const variants = {
  primary:
    "bg-accent text-on-dark hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent/50",
  secondary:
    "border border-soft bg-card text-ink hover:border-accent hover:text-accent",
  ghost:
    "text-muted hover:text-ink hover:bg-accent/5",
  danger:
    "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400",
};

const sizes = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xs font-medium transition duration-normal focus:outline-hidden disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
