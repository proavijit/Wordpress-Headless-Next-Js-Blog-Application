import { forwardRef } from "react";
import { clsx } from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={clsx(
          "w-full rounded-xs border border-soft bg-card px-4 py-2.5 text-sm text-ink outline-none transition duration-fast placeholder:text-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/20",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Input.displayName = "Input";
