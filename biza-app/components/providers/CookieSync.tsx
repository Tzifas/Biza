"use client";

import { useEffect } from "react";
import { getUser } from "@/lib/user/storage";

export function CookieSync() {
  useEffect(() => {
    // Initial sync of local storage onboarding complete to the edge-accessible cookie
    const user = getUser();
    const cookieName = "biza_onboarding_complete";
    const hasCookie = document.cookie.split("; ").some((row) => row.trim().startsWith(`${cookieName}=`));

    if (user.onboardingComplete && !hasCookie) {
      document.cookie = `${cookieName}=true; path=/; max-age=31536000`;
    } else if (!user.onboardingComplete && hasCookie) {
      document.cookie = `${cookieName}=; path=/; max-age=0`;
    }
  }, []);

  return null;
}
