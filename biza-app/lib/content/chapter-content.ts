import "server-only";

import authoredContent from "./chapter-content-map.json";
import type { ChapterContent } from "./types";

const contentByChapterId = authoredContent.chapters as Record<string, ChapterContent>;

export function getChapterContent(chapterId: string): ChapterContent | undefined {
  return contentByChapterId[chapterId];
}
