"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  animated?: boolean;
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
  animated = true,
  children,
  ...props
}: CardProps) {
  const baseClasses = cn(
    "rounded-lg border border-border bg-white",
    paddingStyles[padding],
    hover && "transition-all hover:border-forest hover:shadow-md",
    className
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={hover ? { y: -4, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)" } : undefined}
        className={baseClasses}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
}
