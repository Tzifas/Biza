"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  className?: string;
  animated?: boolean;
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = true,
  className,
  animated = true,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercent) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between text-xs"
        >
          {label ? <span className="font-medium text-stone">{label}</span> : <span />}
          {showPercent ? (
            <motion.span
              key={percent}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-semibold text-forest"
            >
              {percent}%
            </motion.span>
          ) : null}
        </motion.div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream shadow-sm">
        {animated ? (
          <motion.div
            className="h-full bg-leaf"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        ) : (
          <div
            className="h-full bg-leaf transition-all duration-300"
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        )}
      </div>
    </div>
  );
}
