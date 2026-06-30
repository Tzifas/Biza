import { cn } from "@/lib/utils/cn";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-stone">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "min-h-[44px] w-full rounded-pill border border-border bg-white px-4 text-sm text-ink",
          "placeholder:text-stone/70 focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf",
          error && "border-coral focus:border-coral focus:ring-coral",
          className
        )}
        {...props}
      />
      {error ? <p className="text-xs text-coral">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-stone">{hint}</p> : null}
    </div>
  );
}
