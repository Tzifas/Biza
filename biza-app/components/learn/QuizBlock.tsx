"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { ChapterQuiz } from "@/lib/content/chapter-content";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 rounded-lg border border-border bg-white p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-stone">Quick check</p>
      <p className="font-display text-base font-semibold text-forest">{quiz.question}</p>
      
      <div className="space-y-2">
        {quiz.options.map((opt, idx) => {
          let style = "border-border hover:border-forest";
          if (revealed && opt.id === correctId)
            style = "border-leaf bg-leaf-light";
          if (revealed && selected === opt.id && opt.id !== correctId)
            style = "border-coral bg-coral-light";

          return (
            <motion.button
              key={opt.id}
              type="button"
              disabled={revealed}
              onClick={() => setSelected(opt.id)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={!revealed ? { scale: 1.02, x: 4 } : {}}
              whileTap={!revealed ? { scale: 0.98 } : {}}
              className={cn(
                "relative w-full rounded-lg border px-4 py-3 text-left text-sm transition-all",
                selected === opt.id && !revealed && "border-forest bg-cream shadow-sm",
                style
              )}
            >
              <div className="flex items-center justify-between">
                <span>{opt.label}</span>
                {revealed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {opt.id === correctId && (
                      <Check className="h-4 w-4 text-leaf" />
                    )}
                    {opt.id === selected && opt.id !== correctId && (
                      <X className="h-4 w-4 text-coral" />
                    )}
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="check-btn"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Button
              variant="secondary"
              className="w-full text-xs"
              onClick={handleCheck}
              disabled={!selected}
            >
              Check answer
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold",
                isCorrect ? "text-leaf" : "text-coral"
              )}
            >
              {isCorrect ? (
                <>
                  <Check className="h-4 w-4" />
                  Correct!
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  Not quite — read why:
                </>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs leading-relaxed text-stone rounded-lg bg-stone/5 p-3"
            >
              {quiz.explanation}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="primary"
                className="w-full text-xs"
                onClick={onContinue}
              >
                Continue →
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
