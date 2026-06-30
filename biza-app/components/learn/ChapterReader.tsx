"use client";

import { Button, Card, Chip } from "@/components/ui";
import {
  canAccessChapter,
  getChapterContent,
} from "@/lib/content/chapter-content";
import { getUser, markChapterComplete } from "@/lib/user/storage";
import { ChapterComplete } from "@/components/learn/ChapterComplete";
import { LearnBottomBar } from "@/components/learn/LearnBottomBar";
import { LearnBreadcrumb } from "@/components/learn/LearnBreadcrumb";
import { QuizBlock } from "@/components/learn/QuizBlock";
import { Lock, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  categorySlug: string;
  categoryName: string;
  opportunitySlug: string;
  opportunityName: string;
  lessonTitle: string;
  lessonSlug: string;
  chapter: {
    id: string;
    slug: string;
    title: string;
    isFree: boolean;
  };
  progressPercent: number;
  backHref: string;
  nextHref?: string;
};

export function ChapterReader({
  categorySlug,
  categoryName,
  opportunitySlug,
  opportunityName,
  lessonTitle,
  lessonSlug,
  chapter,
  progressPercent,
  backHref,
  nextHref,
}: Props) {
  const router = useRouter();
  const [user, setUser] = useState(getUser());
  const [quizDone, setQuizDone] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener("biza-user-updated", sync);
    return () => window.removeEventListener("biza-user-updated", sync);
  }, []);

  const allowed = canAccessChapter(chapter.isFree, user.isPro);
  const content = getChapterContent(opportunitySlug, chapter.slug);

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col bg-cream">
        <header className="border-b border-border bg-white px-4 py-3">
          <Link href={backHref} className="text-xs text-stone">
            ← Back to course
          </Link>
        </header>
        <main className="flex flex-grow flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cream text-stone">
            <Lock size={24} />
          </div>
          <h1 className="font-display text-xl font-bold text-forest">PRO chapter locked</h1>
          <p className="mt-2 max-w-sm text-sm text-stone">
            First 2 chapters per lesson are free. Upgrade to unlock the rest of {opportunityName}.
          </p>
          <Button href="/app/upgrade" variant="primary" className="mt-6">
            Unlock with Pro Pass
          </Button>
        </main>
      </div>
    );
  }

  const finishChapter = () => {
    markChapterComplete(chapter.id);
    setShowComplete(true);
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-white">
        <div className="h-1 bg-leaf" style={{ width: `${progressPercent}%` }} />
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone">{lessonTitle}</p>
            <h1 className="font-display text-sm font-semibold text-forest">{chapter.title}</h1>
          </div>
          <Link href={backHref} className="text-stone hover:text-forest" aria-label="Close">
            <X size={20} />
          </Link>
        </div>
        <LearnBreadcrumb
          categorySlug={categorySlug}
          categoryName={categoryName}
          opportunitySlug={opportunitySlug}
          opportunityName={opportunityName}
          lessonTitle={lessonTitle}
          chapterTitle={chapter.title}
        />
      </header>

      <article className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <p className="font-display text-xl font-bold text-forest">{content.hook}</p>
        {content.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-ink/85">
            {p}
          </p>
        ))}

        <Card hover={false} className="border-leaf/30 bg-leaf-light/40 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-leaf">Visual</p>
          <p className="mt-2 font-display text-base font-semibold text-forest">{content.visualLabel}</p>
          <p className="mt-1 text-xs text-stone">Infographic placeholder — editorial asset in Phase 2</p>
        </Card>

        {!quizDone ? (
          <QuizBlock quiz={content.quiz} onContinue={() => setQuizDone(true)} />
        ) : null}

        {quizDone ? (
          <>
            <div className="rounded-lg border border-gold/40 bg-gold/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-forest">Key takeaway</p>
              <p className="mt-2 font-display text-sm font-semibold text-forest">{content.takeaway}</p>
            </div>
            <p className="text-sm leading-relaxed text-ink/85">{content.closing}</p>
            <Button variant="secondary" className="w-full" onClick={finishChapter}>
              Mark chapter complete
            </Button>
          </>
        ) : null}
      </article>

      <LearnBottomBar backHref={backHref} progress={progressPercent} />

      {showComplete ? (
        <ChapterComplete
          persona={user.persona}
          hasNext={!!nextHref}
          onNext={() => (nextHref ? router.push(nextHref) : router.push("/app"))}
        />
      ) : null}
    </div>
  );
}
