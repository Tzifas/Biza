"use client";

import { AvatarIcon, avatarList, isAvatarLocked } from "@/components/avatars/AvatarIcon";
import { Button, Card, Chip, Input } from "@/components/ui";
import { getUser, saveUser, logoutUser } from "@/lib/user/storage";
import { Lock, Sparkles, Trophy, Award, BookOpen, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(getUser());
  const [name, setName] = useState(user.name);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const sync = () => {
      const u = getUser();
      setUser(u);
      setName(u.name);
    };
    window.addEventListener("biza-user-updated", sync);
    return () => window.removeEventListener("biza-user-updated", sync);
  }, []);

  const completedChapters = user.completedChapters.length;

  const handleSave = () => {
    saveUser({ name });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8 animate-fade-in-up">
      {/* Header section with large avatar */}
      <div className="text-center space-y-3">
        <div className="relative mx-auto inline-block">
          <div className="mx-auto inline-flex rounded-full ring-4 ring-gold/25 p-1 bg-white shadow-xl transition-transform duration-300 hover:scale-105">
            <AvatarIcon id={user.avatarId} size={84} />
          </div>
          {user.isPro && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-gold p-1 shadow-md animate-bounce">
              <Sparkles size={14} className="text-forest" />
            </div>
          )}
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-forest">{user.name}</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            {user.isPro ? (
              <Chip variant="gold" className="normal-case px-2.5 py-0.5 text-[10px] font-bold">
                PRO Member
              </Chip>
            ) : (
              <Chip variant="default" className="normal-case px-2.5 py-0.5 text-[10px]">
                Free Tier
              </Chip>
            )}
          </div>
        </div>
      </div>

      {/* Avatar Picker Card */}
      <Card hover={false} className="space-y-4 shadow-sm border border-border/80">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-forest/80">
            Choose Your Avatar
          </p>
          <span className="text-[10px] text-stone">
            Unlocked: {avatarList.filter(a => !isAvatarLocked(a.unlock, { isPro: user.isPro, completedChapters })).length}/{avatarList.length}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-3.5">
          {avatarList.map((a) => {
            const locked = isAvatarLocked(a.unlock, { isPro: user.isPro, completedChapters });
            const selected = user.avatarId === a.id;
            return (
              <button
                key={a.id}
                type="button"
                disabled={locked}
                onClick={() => saveUser({ avatarId: a.id })}
                className={`relative rounded-full p-0.5 transition-all duration-300 focus:outline-none ${
                  selected 
                    ? "ring-2 ring-gold scale-110 shadow-md shadow-gold/20" 
                    : "hover:scale-105 active:scale-95"
                } ${locked ? "opacity-35 cursor-not-allowed" : "cursor-pointer"}`}
                title={locked ? `LOCKED: ${a.description}` : `${a.name} — ${a.description}`}
              >
                <div className="rounded-full bg-white overflow-hidden border border-border">
                  <AvatarIcon id={a.id} size={48} />
                </div>
                {locked ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                    <Lock size={12} className="text-white" />
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Settings Input Card */}
      <Card hover={false} className="space-y-4 shadow-sm border border-border/80">
        <Input 
          label="Display Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="focus:ring-gold focus:border-gold"
        />
        <Button variant="secondary" className="w-full max-w-xs mx-auto flex relative overflow-hidden bg-forest hover:bg-leaf text-cream" onClick={handleSave}>
          <span>Save Profile Changes</span>
          {savedSuccess && (
            <span className="absolute inset-0 bg-emerald-600 text-white flex items-center justify-center font-bold text-xs animate-fade-in">
              Changes Saved Successfully!
            </span>
          )}
        </Button>
      </Card>

      {/* Stats Board */}
      <Card hover={false} padding="sm" className="grid grid-cols-3 gap-2 text-center divide-x divide-border border border-border/80 shadow-sm">
        <div className="py-2 flex flex-col items-center justify-center space-y-1">
          <BookOpen size={16} className="text-forest" />
          <p className="text-lg font-bold text-forest leading-none">1</p>
          <p className="text-[10px] uppercase font-semibold text-stone tracking-wide">Courses started</p>
        </div>
        <div className="py-2 flex flex-col items-center justify-center space-y-1">
          <Trophy size={16} className="text-gold" />
          <p className="text-lg font-bold text-forest leading-none">{user.completedChapters.length}</p>
          <p className="text-[10px] uppercase font-semibold text-stone tracking-wide">Chapters done</p>
        </div>
        <div className="py-2 flex flex-col items-center justify-center space-y-1">
          <Award size={16} className="text-forest" />
          <p className="text-sm font-bold text-forest leading-none capitalize truncate max-w-full px-1">
            {user.persona.replace("-", " ")}
          </p>
          <p className="text-[10px] uppercase font-semibold text-stone tracking-wide">My Persona</p>
        </div>
      </Card>

      {/* Logout Action */}
      <div className="pt-4 flex justify-center">
        <Button variant="outline" className="w-full max-w-xs flex border-coral/30 text-coral hover:bg-coral-light/50 hover:text-coral hover:border-coral" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}

