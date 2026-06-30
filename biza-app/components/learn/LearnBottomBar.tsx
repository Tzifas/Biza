"use client";

import { ProgressBar } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  backHref: string;
  continueHref?: string;
  continueLabel?: string;
  progress: number;
  disabled?: boolean;
};

export function LearnBottomBar({
  backHref,
  continueHref,
  continueLabel = "Continue →",
  progress,
  disabled,
}: Props) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-3xl items-center gap-4">
        <Link
          href={backHref}
          className="flex min-h-[44px] min-w-[44px] items-center gap-1 text-xs font-semibold text-forest"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="flex-1">
          <ProgressBar value={progress} showPercent={false} />
        </div>
        {continueHref && !disabled ? (
          <Link
            href={continueHref}
            className="flex min-h-[44px] items-center gap-1 text-xs font-semibold text-forest"
          >
            {continueLabel}
            <ArrowRight size={16} />
          </Link>
        ) : (
          <span className={cn("text-xs font-semibold text-stone", disabled && "opacity-50")}>
            Locked
          </span>
        )}
      </div>
    </div>
  );
}
