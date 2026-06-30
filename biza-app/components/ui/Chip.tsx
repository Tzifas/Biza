import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

export type ChipVariant = "default" | "success" | "gold" | "pro" | "danger";

export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: ChipVariant;
};

const variantStyles: Record<ChipVariant, string> = {
  default: "bg-leaf-light text-forest",
  success: "bg-leaf-light text-leaf",
  gold: "bg-gold/20 text-forest",
  pro: "bg-pro-purple/10 text-pro-purple",
  danger: "bg-coral-light text-coral",
};

export function Chip({ variant = "default", className, children, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
