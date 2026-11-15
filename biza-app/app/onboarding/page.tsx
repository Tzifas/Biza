"use client";

import { Logo } from "@/components/Logo";
import { Button, Card, Input } from "@/components/ui";
import { getPersonas } from "@/lib/content";
import type { PersonaId } from "@/lib/user/storage";
import { updateLearnerProfile, useLearner } from "@/lib/user/use-learner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const personas = getPersonas();

const mindsetScreens = [
  {
    title: "What it really takes",
    body: "Skills take time. Shortcuts are myths. Scams exploit impatience — especially in Kenya's online job groups.",
    commitment: "I understand that building digital skills takes time, and I will avoid shortcuts.",
  },
  {
    title: "The fraud test",
    body: "Forex signal groups, MLMs, and 'registration fee' jobs are documented patterns. Biza teaches you to spot them before you pay.",
    commitment: "I commit to vetting opportunities and will never pay an 'activation fee' or 'deposit' for a job.",
  },
  {
    title: "The commitment ask",
    body: "This platform is for people willing to learn before they earn. No guaranteed income — honest roadmaps only.",
    commitment: "I commit to learning before earning, studying chapters honestly, and doing the quizzes myself.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { learner, isLoading, error, mutate } = useLearner();
  const [phase, setPhase] = useState(1);
  const [sub, setSub] = useState(0);
  const [name, setName] = useState("");
  const [persona, setPersona] = useState<PersonaId>("starter");
  const [commitments, setCommitments] = useState([false, false, false]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (learner?.onboardingComplete) router.replace("/app");
  }, [learner?.onboardingComplete, router]);

  const finish = async () => {
    if (!learner) return;
    setIsSaving(true);
    setSaveError(null);
    try {
      await updateLearnerProfile({
        name: name.trim() || learner.name,
        persona,
        onboardingComplete: true,
      });
      await mutate();
      router.replace("/app");
      router.refresh();
    } catch {
      setSaveError("We couldn’t save your choices. Check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-forest text-white">
      <header className="px-6 py-8 text-center">
        <Logo variant="onboarding" className="mx-auto h-12" />
        <p className="mt-2 text-sm text-cream/80">Learn it. Earn it.</p>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-grow flex-col px-6 pb-10">
        {isLoading ? (
          <p className="text-center text-sm text-cream/80" role="status">Loading your profile…</p>
        ) : null}
        {error ? <p className="text-center text-sm text-coral" role="alert">Couldn’t load your profile. Refresh and try again.</p> : null}
        {!isLoading && !learner ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">Sign in to continue</h1>
            <p className="text-sm text-stone">Create an account or sign in before saving your learning goals.</p>
            <Button href="/login?next=%2Fonboarding" variant="primary" className="w-full">Continue to sign in</Button>
          </Card>
        ) : null}

        {learner && phase === 1 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">Welcome to Biza</h1>
            <p className="text-sm leading-relaxed text-stone">We’ll personalize your learning path and save your choices to your account.</p>
            <Input label="Display name" maxLength={80} value={name || learner.name} onChange={(event) => setName(event.target.value)} />
            <Button variant="primary" className="w-full" onClick={() => setPhase(2)}>Choose your goal</Button>
          </Card>
        ) : null}

        {learner && phase === 2 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">What&apos;s your main goal?</h1>
            <div className="space-y-2">
              {personas.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={persona === item.id}
                  onClick={() => setPersona(item.id as PersonaId)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm ${persona === item.id ? "border-forest bg-cream" : "border-border"}`}
                >
                  <span className="font-semibold text-forest">{item.label}</span>
                  <span className="mt-1 block text-xs text-stone">{item.homeEmphasis}</span>
                </button>
              ))}
            </div>
            <Button variant="primary" className="w-full" onClick={() => setPhase(3)}>Continue</Button>
          </Card>
        ) : null}

        {learner && phase === 3 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">{mindsetScreens[sub].title}</h1>
            <p className="text-sm leading-relaxed text-stone">{mindsetScreens[sub].body}</p>
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-border bg-cream/40 p-3 text-xs text-stone hover:border-forest">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-border text-leaf focus:ring-leaf"
                checked={commitments[sub]}
                onChange={(event) => setCommitments((current) => current.map((value, index) => index === sub ? event.target.checked : value))}
              />
              <span>{mindsetScreens[sub].commitment}</span>
            </label>
            <Button
              variant="primary"
              className="w-full"
              disabled={!commitments[sub]}
              onClick={() => {
                if (sub < mindsetScreens.length - 1) setSub(sub + 1);
                else { setSub(0); setPhase(4); }
              }}
            >
              {sub < mindsetScreens.length - 1 ? "Next" : "Continue"}
            </Button>
          </Card>
        ) : null}

        {learner && phase === 4 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">You&apos;re ready</h1>
            <p className="text-sm text-stone">Your goals will be saved to your profile. Course access and paid upgrades are shown separately; no payment is taken in this setup.</p>
            {saveError ? <p className="text-sm text-coral" role="alert">{saveError}</p> : null}
            <Button variant="primary" className="w-full" onClick={finish} disabled={isSaving}>
              {isSaving ? "Saving…" : "Go to dashboard"}
            </Button>
          </Card>
        ) : null}
      </main>
    </div>
  );
}
