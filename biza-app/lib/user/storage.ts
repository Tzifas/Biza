export type PersonaId = "starter" | "side-hustler" | "skilled" | "returning-learner";

export type UserProfile = {
  name: string;
  email: string;
  persona: PersonaId;
  avatarId: string;
  isPro: boolean;
  onboardingComplete: boolean;
  completedChapters: string[];
  lastChapterId: string | null;
};

export function personaCompletionCopy(persona: PersonaId): string {
  const copy: Record<PersonaId, string> = {
    starter: "Done. That's one more thing most people never bother to learn. Keep going.",
    "side-hustler": "Another chapter. You're building while others are scrolling.",
    skilled: "You already have the skill. Now you're learning how to get paid for it.",
    "returning-learner": "You came back. That already puts you ahead of where you were.",
  };
  return copy[persona];
}
