import { cn } from "@/lib/utils/cn";

export type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = true,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs">
          {label ? <span className="font-medium text-stone">{label}</span> : <span />}
          {showPercent ? <span className="font-semibold text-forest">{percent}%</span> : null}
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cream">
        <div
          className="h-full bg-leaf transition-all duration-300"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
