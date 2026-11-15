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

function Confetti() {
  const colors = ["bg-gold", "bg-leaf", "bg-coral"];
  const particles = Array.from({ length: 24 }, (_, id) => ({
    id,
    left: (id * 37) % 100,
    delay: (id % 5) * 0.06,
    duration: 1.8 + (id % 4) * 0.12,
    drift: ((id * 29) % 81) - 40,
    color: colors[id % colors.length],
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, y: -20, x: 0 }}
          animate={{ opacity: 0, y: 100, x: particle.drift }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
          className={`pointer-events-none fixed h-2 w-2 rounded-sm ${particle.color}`}
          style={{ left: `${particle.left}%`, top: 0 }}
          aria-hidden="true"
        />
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
