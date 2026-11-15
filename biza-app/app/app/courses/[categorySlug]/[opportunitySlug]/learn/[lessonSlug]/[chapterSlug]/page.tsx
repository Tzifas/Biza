import { ChapterReader } from "@/components/learn/ChapterReader";
import { getChapterContent } from "@/lib/content/chapter-content";
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
  const content = chapter.isFree ? getChapterContent(chapter.id) : undefined;
  const total = countChapters(opportunity);
  const flatIndex = opportunity.course.lessons
    .flatMap((l) => l.chapters.map((c) => ({ lesson: l, chapter: c })))
    .findIndex((x) => x.chapter.id === chapter.id);
  const progressPercent = Math.round(((flatIndex + 1) / total) * 100);

  const next = getNextChapter(categorySlug, opportunitySlug, lessonSlug, chapterSlug);
  const nextHref = next
    ? `/app/courses/${categorySlug}/${opportunitySlug}/learn/${next.lesson.slug}/${next.chapter.slug}`
    : undefined;

  const backHref = `/app/courses/${categorySlug}/${opportunitySlug}/learn`;

  return (
    <ChapterReader
      categorySlug={categorySlug}
      categoryName={category.name}
      opportunitySlug={opportunitySlug}
      opportunityName={opportunity.name}
      courseSlug={opportunity.course.slug}
      lessonTitle={lesson.title}
      lessonSlug={lessonSlug}
      chapter={{
        id: chapter.id,
        slug: chapter.slug,
        title: chapter.title,
        isFree: chapter.isFree,
        estimatedMinutes: chapter.estimatedMinutes,
        learningObjectives: chapter.learningObjectives,
      }}
      content={content}
      progressPercent={progressPercent}
      backHref={backHref}
      nextHref={nextHref}
      basePath="/app/courses"
    />
  );
}
