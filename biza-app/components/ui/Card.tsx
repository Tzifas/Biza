import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
};

const paddingStyles = {
  sm: "p-4",
  md: "p-5 md:p-6",
  lg: "p-6 md:p-8",
};

export function Card({
  className,
  hover = true,
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-white",
        paddingStyles[padding],
        hover && "transition-colors hover:border-forest",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
