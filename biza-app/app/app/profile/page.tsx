"use client";

import { AvatarIcon, avatarList, isAvatarLocked } from "@/components/avatars/AvatarIcon";
import { Button, Card, Chip, Input } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { updateLearnerProfile, useLearner } from "@/lib/user/use-learner";
import { Lock, Sparkles, Trophy, Award, BookOpen, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { learner: user, isLoading, mutate } = useLearner();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) return <p className="p-8 text-center text-sm text-stone" role="status">Loading your profile…</p>;
  if (!user) return <p className="p-8 text-center text-sm text-stone">Sign in to view your profile.</p>;

  const completedChapters = user.completedChapters.length;

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updateLearnerProfile({ name: name.trim() || user.name });
      await mutate();
      setSavedSuccess(true);
      window.setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      setError("Could not save your profile. Check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (avatarId: string) => {
    setError(null);
    try {
      await updateLearnerProfile({ avatarId });
      await mutate();
    } catch {
      setError("Could not update your avatar. Try again.");
    }
  };

  const handleLogout = async () => {
    const { error: signOutError } = await createClient().auth.signOut();
    if (signOutError) {
      setError("Could not sign out. Please try again.");
      return;
    }
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8 animate-fade-in-up">
      <div className="space-y-3 text-center">
        <div className="relative mx-auto inline-block">
          <div className="mx-auto inline-flex rounded-full bg-white p-1 ring-4 ring-gold/25 transition-transform duration-300 hover:scale-105">
            <AvatarIcon id={user.avatarId} size={84} />
          </div>
          {user.isPro ? (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-gold p-1 shadow-md animate-bounce">
              <Sparkles size={14} className="text-forest" />
            </div>
          ) : null}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-forest">{user.name}</h1>
          <p className="mt-1 text-xs text-stone">{user.email}</p>
          <div className="mt-2 flex items-center justify-center">
            <Chip variant="default" className="normal-case px-2.5 py-0.5 text-[10px]">Free Tier</Chip>
          </div>
        </div>
      </div>

      <Card hover={false} className="space-y-4 border border-border/80">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-forest/80">Choose your avatar</p>
          <span className="text-[10px] text-stone">
            Unlocked: {avatarList.filter((avatar) => !isAvatarLocked(avatar.unlock, { isPro: user.isPro, completedChapters })).length}/{avatarList.length}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-3.5">
          {avatarList.map((avatar) => {
            const locked = isAvatarLocked(avatar.unlock, { isPro: user.isPro, completedChapters });
            const selected = user.avatarId === avatar.id;
            return (
              <button
                key={avatar.id}
                type="button"
                disabled={locked}
                aria-label={`${avatar.name}${selected ? ", selected" : ""}${locked ? ", locked" : ""}`}
                aria-pressed={selected}
                onClick={() => void handleAvatarChange(avatar.id)}
                className={`relative rounded-full p-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest ${selected ? "scale-110 ring-2 ring-gold" : "hover:scale-105 active:scale-95"} ${locked ? "cursor-not-allowed opacity-35" : "cursor-pointer"}`}
                title={locked ? `Locked: ${avatar.description}` : `${avatar.name} — ${avatar.description}`}
              >
                <div className="overflow-hidden rounded-full border border-border bg-white"><AvatarIcon id={avatar.id} size={48} /></div>
                {locked ? <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40"><Lock size={12} className="text-white" /></span> : null}
              </button>
            );
          })}
        </div>
      </Card>

      <Card hover={false} className="space-y-4 border border-border/80">
        <Input label="Display name" maxLength={80} value={name || user.name} onChange={(event) => setName(event.target.value)} />
        {error ? <p role="alert" className="text-sm text-coral">{error}</p> : null}
        <Button variant="secondary" className="w-full" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving…" : savedSuccess ? "Changes saved" : "Save profile changes"}
        </Button>
      </Card>

      <Card hover={false} padding="sm" className="grid grid-cols-3 divide-x divide-border border border-border/80 text-center">
        <div className="flex flex-col items-center justify-center space-y-1 py-2">
          <BookOpen size={16} className="text-forest" />
          <p className="text-lg font-bold leading-none text-forest">{user.lastChapterId ? 1 : 0}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-stone">Courses started</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 py-2">
          <Trophy size={16} className="text-gold" />
          <p className="text-lg font-bold leading-none text-forest">{completedChapters}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-stone">Chapters done</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 py-2">
          <Award size={16} className="text-forest" />
          <p className="max-w-full truncate px-1 text-sm font-bold capitalize leading-none text-forest">{user.persona.replaceAll("-", " ")}</p>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-stone">My persona</p>
        </div>
      </Card>

      <div className="flex justify-center pt-4">
        <Button variant="outline" className="w-full max-w-xs border-coral/30 text-coral hover:border-coral hover:bg-coral-light/50" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" /> Log out
        </Button>
      </div>
    </div>
  );
}
