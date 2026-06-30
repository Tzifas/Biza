"use client";

import { Button } from "@/components/ui";
import { personaCompletionCopy } from "@/lib/user/storage";
import type { PersonaId } from "@/lib/user/storage";
import { CheckCircle2 } from "lucide-react";

type Props = {
  persona: PersonaId;
  onNext: () => void;
  hasNext: boolean;
};

export function ChapterComplete({ persona, onNext, hasNext }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forest px-6 text-center text-white">
      <CheckCircle2 className="mb-4 text-gold" size={48} />
      <h2 className="font-display text-2xl font-bold">Chapter complete</h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/90">
        {personaCompletionCopy(persona)}
      </p>
      {hasNext ? (
        <Button variant="primary" className="mt-8" onClick={onNext}>
          Next chapter →
        </Button>
      ) : (
        <Button href="/app" variant="primary" className="mt-8">
          Back to home
        </Button>
      )}
    </div>
  );
}
