"use client";

import { Button, Card, Chip, Input, ProgressBar } from "@/components/ui";
import { getOpportunityBySlug, getPricing } from "@/lib/content";
import { getUser, saveUser } from "@/lib/user/storage";
import { AlertCircle, ArrowRight, BookOpen, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const pricing = getPricing();

export default function AppDashboardPage() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener("biza-user-updated", sync);
    return () => window.removeEventListener("biza-user-updated", sync);
  }, []);

  const recommendedSlug = user.persona === "starter" ? "print-on-demand" : "dropshipping";
  const recommended = getOpportunityBySlug("selling-online", recommendedSlug);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <Card hover={false} className="space-y-2 bg-forest text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-cream/70">Hi, {user.name}</span>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Your learning path</h1>
        <p className="text-sm text-cream/80">{user.onboardingComplete ? "Pick up where you left off." : "Complete onboarding to personalise recommendations."}</p>
        {!user.onboardingComplete ? (
          <Button href="/onboarding" variant="primary" className="mt-2">
            Finish onboarding
          </Button>
        ) : null}
      </Card>

      {recommended ? (
        <Card className="space-y-3">
          <Chip variant="gold" className="normal-case">Based on your goals</Chip>
          <h2 className="font-display text-lg font-semibold text-forest">{recommended.name}</h2>
          <p className="text-xs text-stone">{recommended.infoCard.timeline} to first income</p>
          <Button href={`/courses/selling-online/${recommended.slug}`} variant="secondary" className="text-xs">
            View opportunity
            <ArrowRight size={14} />
          </Button>
        </Card>
      ) : null}

      <Card className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone">Continue reading</p>
        {user.lastChapterId ? (
          <Button href="/courses/selling-online/dropshipping/learn" variant="outline" className="w-full text-xs">
            Resume course
            <ArrowRight size={14} />
          </Button>
        ) : (
          <p className="text-sm text-stone">No chapter in progress yet.</p>
        )}
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: BookOpen, label: "Started", value: "1" },
          { icon: Trophy, label: "Chapters done", value: String(user.completedChapters.length) },
          { icon: Sparkles, label: "Plan", value: user.isPro ? "PRO" : "Free" },
        ].map((s) => (
          <Card key={s.label} hover={false} padding="sm" className="text-center">
            <s.icon className="mx-auto mb-1 text-leaf" size={18} />
            <p className="text-lg font-bold text-forest">{s.value}</p>
            <p className="text-[10px] uppercase text-stone">{s.label}</p>
          </Card>
        ))}
      </div>

      {!user.isPro ? (
        <Card hover={false} className="space-y-3 border-gold/30 bg-gold/5">
          <p className="text-sm font-semibold text-forest">Unlock all chapters</p>
          <Button href="/app/upgrade" variant="primary" className="w-full text-xs">
            Pro Pass — KES {pricing.proMonthly.kes}/mo
          </Button>
        </Card>
      ) : null}

      <Card hover={false} className="space-y-2">
        <p className="flex items-center gap-1 text-xs font-bold uppercase text-coral">
          <AlertCircle size={14} /> Security
        </p>
        <Link href="/scam-radar" className="text-xs font-medium text-leaf">
          Open Scam Radar →
        </Link>
      </Card>
    </div>
  );
}
