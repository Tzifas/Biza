"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Input({ label, hint, error, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-1.5"
    >
      {label ? (
        <motion.label
          htmlFor={inputId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="block text-xs font-semibold uppercase tracking-wider text-stone"
        >
          {label}
        </motion.label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "min-h-[44px] w-full rounded-pill border border-border bg-white px-4 text-sm text-ink",
          "placeholder:text-stone/70 focus:border-leaf focus:outline-none focus:ring-1 focus:ring-leaf focus:shadow-sm",
          "transition-all duration-200",
          error && "border-coral focus:border-coral focus:ring-coral",
          className
        )}
        {...props}
      />
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-coral flex items-center gap-1"
        >
          ⚠ {error}
        </motion.p>
      ) : null}
      {!error && hint ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-stone"
        >
          {hint}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
