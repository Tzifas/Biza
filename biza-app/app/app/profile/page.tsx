"use client";

import { AvatarIcon, avatarList, isAvatarLocked } from "@/components/avatars/AvatarIcon";
import { Button, Card, Chip, Input } from "@/components/ui";
import { getUser, saveUser } from "@/lib/user/storage";
import { Lock } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(getUser());
  const [name, setName] = useState(user.name);

  useEffect(() => {
    const sync = () => {
      const u = getUser();
      setUser(u);
      setName(u.name);
    };
    window.addEventListener("biza-user-updated", sync);
    return () => window.removeEventListener("biza-user-updated", sync);
  }, []);

  const completedCourses = user.completedChapters.length >= 5 ? 5 : 0;

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <div className="text-center">
        <div className="mx-auto mb-3 inline-flex rounded-full ring-4 ring-leaf/30">
          <AvatarIcon id={user.avatarId} size={80} />
        </div>
        <h1 className="font-display text-xl font-bold text-forest">{user.name}</h1>
        {user.isPro ? <Chip variant="gold" className="mt-2 normal-case">PRO</Chip> : null}
      </div>

      <Card hover={false} className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone">Choose avatar</p>
        <div className="grid grid-cols-5 gap-3">
          {avatarList.map((a) => {
            const locked = isAvatarLocked(a.unlock, { isPro: user.isPro, completedCourses });
            const selected = user.avatarId === a.id;
            return (
              <button
                key={a.id}
                type="button"
                disabled={locked}
                onClick={() => saveUser({ avatarId: a.id })}
                className={`relative rounded-full p-0.5 ${selected ? "ring-2 ring-forest" : ""} ${locked ? "opacity-40" : ""}`}
                title={a.name}
              >
                <AvatarIcon id={a.id} size={44} />
                {locked ? (
                  <Lock size={12} className="absolute right-0 bottom-0 text-stone" />
                ) : null}
              </button>
            );
          })}
        </div>
      </Card>

      <Card hover={false} className="space-y-4">
        <Input label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button variant="secondary" className="w-full" onClick={() => saveUser({ name })}>
          Save changes
        </Button>
      </Card>

      <Card hover={false} padding="sm" className="grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <p className="font-bold text-forest">1</p>
          <p className="text-stone">Courses started</p>
        </div>
        <div>
          <p className="font-bold text-forest">{user.completedChapters.length}</p>
          <p className="text-stone">Chapters done</p>
        </div>
        <div>
          <p className="font-bold text-forest">{user.persona.replace("-", " ")}</p>
          <p className="text-stone">Persona</p>
        </div>
      </Card>
    </div>
  );
}
