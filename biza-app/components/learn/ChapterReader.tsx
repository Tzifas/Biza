"use client";

import { Button, Card } from "@/components/ui";
import type { ChapterContent } from "@/lib/content/types";
import { recordChapterCompletion, useLearner } from "@/lib/user/use-learner";
import { ChapterComplete } from "@/components/learn/ChapterComplete";
import { LearnBottomBar } from "@/components/learn/LearnBottomBar";
import { LearnBreadcrumb } from "@/components/learn/LearnBreadcrumb";
import { QuizBlock } from "@/components/learn/QuizBlock";
import { Lock, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  categorySlug: string;
  categoryName: string;
  opportunitySlug: string;
  opportunityName: string;
  courseSlug: string;
  lessonTitle: string;
  lessonSlug: string;
  content?: ChapterContent;
  chapter: {
    id: string;
    slug: string;
    title: string;
    isFree: boolean;
    estimatedMinutes?: number;
    learningObjectives?: string[];
  };
  progressPercent: number;
  backHref: string;
  nextHref?: string;
  basePath?: string;
};

export function ChapterReader({
  categorySlug,
  categoryName,
  opportunitySlug,
  opportunityName,
  courseSlug,
  lessonTitle,
  lessonSlug,
  chapter,
  content,
  progressPercent,
  backHref,
  nextHref,
  basePath,
}: Props) {
  const router = useRouter();
  const { learner: user, isLoading, mutate } = useLearner();
  const [quizDone, setQuizDone] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  if (isLoading) {
    return <main className="flex min-h-screen items-center justify-center text-sm text-stone" role="status">Loading your learning session…</main>;
  }

  if (!user) {
    return <main className="flex min-h-screen items-center justify-center text-sm text-stone">Sign in to continue learning.</main>;
  }

  const allowed = chapter.isFree || user.isPro;

  if (!allowed) {
    return (
      <div className="flex min-h-screen flex-col bg-cream">
        <header className="border-b border-border bg-white px-4 py-3">
          <Link href={backHref} className="text-xs text-stone">
            ← Back to course
          </Link>
        </header>
        <main className="flex flex-grow flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone/10 text-stone border border-border">
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

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6">
        <Card hover={false} className="max-w-md space-y-3 text-center">
          <h1 className="font-display text-lg font-semibold text-forest">This chapter is being prepared</h1>
          <p className="text-sm leading-relaxed text-stone">The outline is available, but this lesson has not completed editorial review yet.</p>
          <Button href={backHref} variant="outline">Back to course</Button>
        </Card>
      </main>
    );
  }

  const finishChapter = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await recordChapterCompletion({
        chapterId: chapter.id,
        courseSlug,
        lessonSlug,
        chapterSlug: chapter.slug,
      });
      await mutate();
      setShowComplete(true);
    } catch {
      setSaveError("We couldn’t save your progress. Check your connection and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-white">
        <div className="h-1 bg-leaf" style={{ width: `${progressPercent}%` }} />
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone">{lessonTitle}</p>
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
          basePath={basePath}
        />
      </header>

      <article className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <p className="font-display text-xl font-bold text-forest">{content.hook}</p>
        {chapter.learningObjectives?.length ? (
          <section aria-labelledby="chapter-objectives" className="rounded-xl border border-border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="chapter-objectives" className="font-display text-sm font-semibold text-forest">In this chapter</h2>
              {chapter.estimatedMinutes ? <span className="text-xs text-stone">About {chapter.estimatedMinutes} minutes</span> : null}
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink/85">
              {chapter.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}
            </ul>
          </section>
        ) : null}
        {content.blocks.map((block, index) => {
          if (block.type === "paragraph") {
            return <p key={`paragraph-${index}`} className="text-sm leading-relaxed text-ink/85">{block.text}</p>;
          }
          if (block.type === "callout") {
            return (
              <Card key={`callout-${index}`} hover={false} className="border-leaf/30 bg-leaf-light/40">
                <p className="font-display text-sm font-semibold text-forest">{block.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">{block.text}</p>
              </Card>
            );
          }
          return (
            <Card key={`steps-${index}`} hover={false}>
              <h2 className="font-display text-sm font-semibold text-forest">{block.title}</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink/85">
                {block.items.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </Card>
          );
        })}
        {content.activity ? (
          <Card hover={false} className="border-gold/50 bg-gold/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest">Put it into practice</p>
            <h2 className="mt-2 font-display text-base font-semibold text-forest">{content.activity.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/85">{content.activity.instructions}</p>
            <p className="mt-3 rounded-lg bg-white/70 p-3 text-sm font-medium leading-relaxed text-forest">{content.activity.prompt}</p>
          </Card>
        ) : null}

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
            {saveError ? <p role="alert" className="text-sm text-coral">{saveError}</p> : null}
            <Button variant="primary" className="w-full" onClick={finishChapter} disabled={isSaving}>
              {isSaving ? "Saving progress…" : "Mark chapter complete"}
            </Button>
          </>
        ) : null}
      </article>

      <LearnBottomBar backHref={backHref} continueHref={nextHref} progress={progressPercent} />

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
