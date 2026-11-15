"use client";

import { createClient } from "@/lib/supabase/client";
import type { PersonaId, UserProfile } from "@/lib/user/storage";
import useSWR from "swr";
import { useEffect } from "react";

export type Learner = UserProfile & {
  id: string;
  lastChapter: {
    courseSlug: string;
    lessonSlug: string;
    chapterSlug: string;
  } | null;
};

type LearnerProfileRow = {
  id: string;
  display_name: string;
  persona: PersonaId;
  avatar_id: string;
  onboarding_completed: boolean;
};

type ChapterProgressRow = {
  chapter_id: string;
  course_slug: string;
  lesson_slug: string;
  chapter_slug: string;
  completed_at: string | null;
  last_opened_at: string;
};

async function fetchLearner(): Promise<Learner | null> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  const [profileResult, progressResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, display_name, persona, avatar_id, onboarding_completed")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("chapter_progress")
      .select("chapter_id, course_slug, lesson_slug, chapter_slug, completed_at, last_opened_at")
      .eq("user_id", user.id)
      .order("last_opened_at", { ascending: false }),
  ]);

  if (profileResult.error) throw profileResult.error;
  if (progressResult.error) throw progressResult.error;
  const profile = profileResult.data as LearnerProfileRow | null;
  const progress = (progressResult.data ?? []) as ChapterProgressRow[];
  if (!profile) return null;

  const completedChapters = progress
    .filter((row) => row.completed_at !== null)
    .map((row) => row.chapter_id);
  const last = progress[0];

  return {
    id: profile.id,
    name: profile.display_name,
    email: user.email ?? "",
    persona: profile.persona,
    avatarId: profile.avatar_id,
    isPro: false,
    onboardingComplete: profile.onboarding_completed,
    completedChapters,
    lastChapterId: last?.chapter_id ?? null,
    lastChapter: last
      ? {
          courseSlug: last.course_slug,
          lessonSlug: last.lesson_slug,
          chapterSlug: last.chapter_slug,
        }
      : null,
  };
}

export function useLearner() {
  const { data, error, isLoading, mutate } = useSWR<Learner | null>(
    "biza-learner",
    fetchLearner,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    const supabase = createClient();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      queueMicrotask(() => void mutate());
    });
    return () => authListener.subscription.unsubscribe();
  }, [mutate]);

  return { learner: data ?? null, error, isLoading, mutate };
}

export async function updateLearnerProfile(
  updates: Partial<Pick<UserProfile, "name" | "persona" | "avatarId" | "onboardingComplete">>
) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Your session has expired. Please sign in again.");

  const profileUpdate: Partial<LearnerProfileRow> = {};
  if (updates.name !== undefined) profileUpdate.display_name = updates.name.trim();
  if (updates.persona !== undefined) profileUpdate.persona = updates.persona;
  if (updates.avatarId !== undefined) profileUpdate.avatar_id = updates.avatarId;
  if (updates.onboardingComplete !== undefined) {
    profileUpdate.onboarding_completed = updates.onboardingComplete;
  }

  const { error } = await supabase.from("profiles").update(profileUpdate).eq("id", user.id);
  if (error) throw error;
}

export async function recordChapterCompletion(input: {
  chapterId: string;
  courseSlug: string;
  lessonSlug: string;
  chapterSlug: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Your session has expired. Please sign in again.");

  const now = new Date().toISOString();
  const { error } = await supabase.from("chapter_progress").upsert(
    {
      user_id: user.id,
      chapter_id: input.chapterId,
      course_slug: input.courseSlug,
      lesson_slug: input.lessonSlug,
      chapter_slug: input.chapterSlug,
      completed_at: now,
      last_opened_at: now,
    },
    { onConflict: "user_id,chapter_id" }
  );
  if (error) throw error;
}
