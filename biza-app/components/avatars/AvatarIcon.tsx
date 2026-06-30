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
  { id: "lion", name: "The Lion", unlock: "default" },
  { id: "leopard", name: "The Leopard", unlock: "default" },
  { id: "eagle", name: "The Eagle", unlock: "default" },
  { id: "elephant", name: "The Elephant", unlock: "default" },
  { id: "zebra", name: "The Zebra", unlock: "default" },
  { id: "compass", name: "The Compass", unlock: "default" },
  { id: "flame", name: "The Flame", unlock: "default" },
  { id: "mountain", name: "The Mountain", unlock: "default" },
  { id: "crown", name: "The Crown", unlock: "courses_completed_5" },
  { id: "rocket", name: "The Rocket", unlock: "pro_only" },
] as const;

export function isAvatarLocked(
  unlock: string,
  opts: { isPro: boolean; completedCourses: number }
): boolean {
  if (unlock === "default") return false;
  if (unlock === "pro_only") return !opts.isPro;
  if (unlock === "courses_completed_5") return opts.completedCourses < 5;
  return true;
}
