"use client";

import { Button } from "@/components/ui";
import { personaCompletionCopy } from "@/lib/user/storage";
import type { PersonaId } from "@/lib/user/storage";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  persona: PersonaId;
  onNext: () => void;
  hasNext: boolean;
};

// Confetti particle animation
function Confetti() {
  const confetti = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.3,
    duration: 2 + Math.random() * 0.5,
  }));

  return (
    <>
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, y: -20, x: 0 }}
          animate={{ opacity: 0, y: 100, x: (Math.random() - 0.5) * 80 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
          className="pointer-events-none fixed text-2xl"
          style={{ left: `${particle.left}%`, top: 0 }}
        >
          {["🎉", "✨", "🌟", "⭐"][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}
    </>
  );
}

export function ChapterComplete({ persona, onNext, hasNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forest px-6 text-center text-white"
    >
      <Confetti />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="mb-6"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <CheckCircle2 className="text-gold" size={64} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="font-display text-2xl font-bold"
      >
        Chapter complete
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-3 max-w-sm text-sm leading-relaxed text-cream/90"
      >
        {personaCompletionCopy(persona)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-8"
      >
        {hasNext ? (
          <Button variant="primary" onClick={onNext}>
            Next chapter →
          </Button>
        ) : (
          <Button href="/app" variant="primary">
            Back to home
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
