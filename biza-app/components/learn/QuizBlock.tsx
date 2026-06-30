"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { ChapterQuiz } from "@/lib/content/chapter-content";
import { useState } from "react";

type Props = {
  quiz: ChapterQuiz;
  onContinue: () => void;
};

export function QuizBlock({ quiz, onContinue }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const correctId = quiz.options.find((o) => o.correct)?.id;
  const isCorrect = selected === correctId;

  const handleCheck = () => {
    if (!selected) return;
    setRevealed(true);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone">Quick check</p>
      <p className="font-display text-base font-semibold text-forest">{quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((opt) => {
          let style = "border-border hover:border-forest";
          if (revealed && opt.id === correctId) style = "border-leaf bg-leaf-light";
          if (revealed && selected === opt.id && opt.id !== correctId)
            style = "border-coral bg-coral-light";
          return (
            <button
              key={opt.id}
              type="button"
              disabled={revealed}
              onClick={() => setSelected(opt.id)}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                selected === opt.id && !revealed && "border-forest bg-cream",
                style
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {!revealed ? (
        <Button variant="secondary" className="w-full text-xs" onClick={handleCheck} disabled={!selected}>
          Check answer
        </Button>
      ) : (
        <div className="space-y-3">
          <p className={cn("text-sm font-semibold", isCorrect ? "text-leaf" : "text-coral")}>
            {isCorrect ? "Correct!" : "Not quite — read why:"}
          </p>
          <p className="text-xs leading-relaxed text-stone">{quiz.explanation}</p>
          <Button variant="primary" className="w-full text-xs" onClick={onContinue}>
            Continue →
          </Button>
        </div>
      )}
    </div>
  );
}
