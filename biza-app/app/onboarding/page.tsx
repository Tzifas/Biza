"use client";

import { Logo } from "@/components/Logo";
import { Button, Card, Input } from "@/components/ui";
import { getPersonas } from "@/lib/content";
import type { PersonaId } from "@/lib/user/storage";
import { saveUser } from "@/lib/user/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

const personas = getPersonas();

const mindsetScreens = [
  {
    title: "What it really takes",
    body: "Skills take time. Shortcuts are myths. Scams exploit impatience — especially in Kenya's online job groups.",
  },
  {
    title: "The fraud test",
    body: "Forex signal groups, MLMs, and 'registration fee' jobs are documented patterns. Biza teaches you to spot them before you pay.",
  },
  {
    title: "The commitment ask",
    body: "This platform is for people willing to learn before they earn. No guaranteed income — honest roadmaps only.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(1);
  const [sub, setSub] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [persona, setPersona] = useState<PersonaId>("starter");

  const finish = () => {
    saveUser({ name: name || "Learner", email, persona, onboardingComplete: true });
    router.push("/app");
  };

  return (
    <div className="flex min-h-screen flex-col bg-forest text-white">
      <header className="px-6 py-8 text-center">
        <Logo variant="onboarding" className="mx-auto h-12" />
        <p className="mt-2 text-sm text-cream/80">Learn it. Earn it.</p>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-grow flex-col px-6 pb-10">
        {phase === 1 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">Create your account</h1>
            <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Button variant="primary" className="w-full" onClick={() => setPhase(2)}>
              Continue
            </Button>
          </Card>
        ) : null}

        {phase === 2 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">What's your main goal?</h1>
            <div className="space-y-2">
              {personas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPersona(p.id as PersonaId)}
                  className={`w-full rounded-lg border px-4 py-3 text-left text-sm ${
                    persona === p.id ? "border-forest bg-cream" : "border-border"
                  }`}
                >
                  <span className="font-semibold text-forest">{p.label}</span>
                  <p className="text-xs text-stone">{p.homeEmphasis}</p>
                </button>
              ))}
            </div>
            <Button variant="primary" className="w-full" onClick={() => setPhase(3)}>
              Continue
            </Button>
          </Card>
        ) : null}

        {phase === 3 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">{mindsetScreens[sub].title}</h1>
            <p className="text-sm leading-relaxed text-stone">{mindsetScreens[sub].body}</p>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                if (sub < mindsetScreens.length - 1) setSub(sub + 1);
                else {
                  setSub(0);
                  setPhase(4);
                }
              }}
            >
              {sub < mindsetScreens.length - 1 ? "Next" : "Continue"}
            </Button>
          </Card>
        ) : null}

        {phase === 4 ? (
          <Card hover={false} className="space-y-4 text-ink">
            <h1 className="font-display text-xl font-bold text-forest">You're ready</h1>
            <p className="text-sm text-stone">
              Free chapters are available on every course. Pro unlocks the rest when you're ready.
            </p>
            <Button variant="primary" className="w-full" onClick={finish}>
              Go to dashboard
            </Button>
          </Card>
        ) : null}
      </main>
    </div>
  );
}
