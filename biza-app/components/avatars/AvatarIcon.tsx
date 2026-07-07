export function AvatarIcon({ id, size = 48 }: { id: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/avatars/${id}.svg`}
      alt=""
      width={size}
      height={size}
      className="rounded-full"
    />
  );
}

export const avatarList = [
  { id: "lion", name: "The Lion", unlock: "default", description: "Default avatar" },
  { id: "leopard", name: "The Leopard", unlock: "default", description: "Default avatar" },
  { id: "eagle", name: "The Eagle", unlock: "default", description: "Default avatar" },
  { id: "elephant", name: "The Elephant", unlock: "default", description: "Default avatar" },
  { id: "zebra", name: "The Zebra", unlock: "default", description: "Default avatar" },
  { id: "compass", name: "The Compass", unlock: "default", description: "Default avatar" },
  { id: "flame", name: "The Flame", unlock: "default", description: "Default avatar" },
  { id: "mountain", name: "The Mountain", unlock: "default", description: "Default avatar" },
  { id: "crown", name: "The Crown", unlock: "chapters_completed_5", description: "Unlock with 5 chapters completed" },
  { id: "rocket", name: "The Rocket", unlock: "pro_only", description: "PRO members only" },
] as const;

export function isAvatarLocked(
  unlock: string,
  opts: { isPro: boolean; completedChapters: number }
): boolean {
  if (unlock === "default") return false;
  if (unlock === "pro_only") return !opts.isPro;
  if (unlock === "chapters_completed_5") return opts.completedChapters < 5;
  return true;
}
