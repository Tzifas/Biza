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

const STORAGE_KEY = "biza_user";

export const defaultUser: UserProfile = {
  name: "James Mwangi",
  email: "james.mwangi@gmail.com",
  persona: "starter",
  avatarId: "compass",
  isPro: false,
  onboardingComplete: false,
  completedChapters: [],
  lastChapterId: null,
};

let cachedUserRaw: string | null | undefined;
let cachedUser = defaultUser;

export function getUserSnapshot(): UserProfile {
  if (typeof window === "undefined") return defaultUser;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedUserRaw) return cachedUser;

  cachedUserRaw = raw;
  try {
    cachedUser = raw ? { ...defaultUser, ...JSON.parse(raw) } : defaultUser;
  } catch {
    cachedUser = defaultUser;
  }
  return cachedUser;
}

export function subscribeToUser(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) callback();
  };
  window.addEventListener("biza-user-updated", callback);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener("biza-user-updated", callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function getUser(): UserProfile {
  return getUserSnapshot();
}

export function saveUser(partial: Partial<UserProfile>) {
  const next = { ...getUser(), ...partial };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  
  if (typeof document !== "undefined") {
    if (next.onboardingComplete) {
      document.cookie = "biza_onboarding_complete=true; path=/; max-age=31536000";
    } else {
      document.cookie = "biza_onboarding_complete=; path=/; max-age=0";
    }
  }

  window.dispatchEvent(new Event("biza-user-updated"));
  return next;
}

export function markChapterComplete(chapterId: string) {
  const user = getUser();
  const completed = user.completedChapters.includes(chapterId)
    ? user.completedChapters
    : [...user.completedChapters, chapterId];
  return saveUser({ completedChapters: completed, lastChapterId: chapterId });
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY);
  if (typeof document !== "undefined") {
    document.cookie = "biza_onboarding_complete=; path=/; max-age=0";
  }
  window.dispatchEvent(new Event("biza-user-updated"));
}

export function personaCompletionCopy(persona: PersonaId): string {
  const copy: Record<PersonaId, string> = {
    starter: "Done. That's one more thing most people never bother to learn. Keep going.",
    "side-hustler": "Another chapter. You're building while others are scrolling.",
    skilled: "You already have the skill. Now you're learning how to get paid for it.",
    "returning-learner": "You came back. That already puts you ahead of where you were.",
  };
  return copy[persona];
}
