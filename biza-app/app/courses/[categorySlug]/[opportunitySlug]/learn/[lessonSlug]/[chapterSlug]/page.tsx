import { ChapterReader } from "@/components/learn/ChapterReader";
import {
  countChapters,
  getCategoryBySlug,
  getChapterBySlug,
  getNextChapter,
  getOpportunityBySlug,
} from "@/lib/content";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    categorySlug: string;
    opportunitySlug: string;
    lessonSlug: string;
    chapterSlug: string;
  }>;
};

export default async function ChapterPage({ params }: Props) {
  const { categorySlug, opportunitySlug, lessonSlug, chapterSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const opportunity = getOpportunityBySlug(categorySlug, opportunitySlug);
  const found = getChapterBySlug(categorySlug, opportunitySlug, lessonSlug, chapterSlug);

  if (!category || !opportunity || !found) notFound();

  const { lesson, chapter } = found;
  const total = countChapters(opportunity);
  const flatIndex = opportunity.course.lessons
    .flatMap((l) => l.chapters.map((c) => ({ lesson: l, chapter: c })))
    .findIndex((x) => x.chapter.id === chapter.id);
  const progressPercent = Math.round(((flatIndex + 1) / total) * 100);

  const next = getNextChapter(categorySlug, opportunitySlug, lessonSlug, chapterSlug);
  const nextHref = next
    ? `/courses/${categorySlug}/${opportunitySlug}/learn/${next.lesson.slug}/${next.chapter.slug}`
    : undefined;

  const backHref = `/courses/${categorySlug}/${opportunitySlug}/learn`;

  return (
    <ChapterReader
      categorySlug={categorySlug}
      categoryName={category.name}
      opportunitySlug={opportunitySlug}
      opportunityName={opportunity.name}
      lessonTitle={lesson.title}
      lessonSlug={lessonSlug}
      chapter={chapter}
      progressPercent={progressPercent}
      backHref={backHref}
      nextHref={nextHref}
    />
  );
}
