import raw from "./content-map.json";
import type {
  Category,
  ContentMap,
  Opportunity,
  OpportunityListItem,
  ScamPattern,
} from "./types";

const contentMap = raw as ContentMap;

export function getContentMap(): ContentMap {
  return contentMap;
}

export function getCategories(): Category[] {
  return [...contentMap.categories].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return contentMap.categories.find((c) => c.slug === slug);
}

export function getOpportunities(): Opportunity[] {
  return contentMap.opportunities;
}

export function getOpportunityBySlug(
  categorySlug: string,
  opportunitySlug: string
): Opportunity | undefined {
  return contentMap.opportunities.find(
    (o) => o.categorySlug === categorySlug && o.slug === opportunitySlug
  );
}

export function getOpportunityListItems(): OpportunityListItem[] {
  return contentMap.opportunities.map((opp) => {
    const category = getCategoryBySlug(opp.categorySlug);
    const chapterCount = opp.course.lessons.reduce(
      (sum, lesson) => sum + lesson.chapters.length,
      0
    );

    return {
      categorySlug: opp.categorySlug,
      categoryName: category?.name ?? opp.categorySlug,
      slug: opp.slug,
      name: opp.name,
      mvp: opp.mvp,
      timeline: opp.infoCard.timeline,
      startupCostLabel: formatKesRange(
        opp.infoCard.startupCostMinKes,
        opp.infoCard.startupCostMaxKes
      ),
      chapterCount,
      perCoursePriceKes: opp.infoCard.perCoursePriceKes,
    };
  });
}

export function getScamPatterns(): ScamPattern[] {
  return contentMap.scamPatterns;
}

export function getPricing() {
  return contentMap.pricing;
}

export function getPersonas() {
  return contentMap.personas;
}

export function getLessonBySlug(
  categorySlug: string,
  opportunitySlug: string,
  lessonSlug: string
) {
  const opp = getOpportunityBySlug(categorySlug, opportunitySlug);
  return opp?.course.lessons.find((l) => l.slug === lessonSlug);
}

export function getChapterBySlug(
  categorySlug: string,
  opportunitySlug: string,
  lessonSlug: string,
  chapterSlug: string
) {
  const lesson = getLessonBySlug(categorySlug, opportunitySlug, lessonSlug);
  const chapter = lesson?.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter || !lesson) return undefined;
  return { lesson, chapter };
}

export function getNextChapter(
  categorySlug: string,
  opportunitySlug: string,
  lessonSlug: string,
  chapterSlug: string
) {
  const opp = getOpportunityBySlug(categorySlug, opportunitySlug);
  if (!opp) return undefined;
  const flat = opp.course.lessons.flatMap((lesson) =>
    lesson.chapters.map((ch) => ({ lesson, chapter: ch }))
  );
  const idx = flat.findIndex(
    (x) => x.lesson.slug === lessonSlug && x.chapter.slug === chapterSlug
  );
  if (idx === -1 || idx === flat.length - 1) return undefined;
  return flat[idx + 1];
}

export function countChapters(opportunity: Opportunity): number {
  return opportunity.course.lessons.reduce((n, l) => n + l.chapters.length, 0);
}

export function formatKesRange(min: number, max: number): string {
  if (min === 0 && max === 0) return "KES 0";
  if (min === max) return `KES ${min.toLocaleString()}`;
  return `KES ${min.toLocaleString()} – ${max.toLocaleString()}`;
}

export const LEGACY_COURSE_REDIRECTS: Record<string, string> = {
  dropshipping: "/courses/selling-online/dropshipping",
  "print-on-demand": "/courses/selling-online/print-on-demand",
  "affiliate-marketing": "/courses/marketing-partnerships/affiliate-marketing",
  "writing-transcription": "/courses/freelancing-services/writing-transcription",
};
