import { getOpportunities } from "@/lib/content";
import type { ChapterContent } from "./types";

/** Transitional content for chapters not yet authored in the content map. */
export function getChapterContent(
  opportunitySlug: string,
  chapterSlug: string
): ChapterContent {
  const authored = getOpportunities()
    .find((opportunity) => opportunity.slug === opportunitySlug)
    ?.course.lessons.flatMap((lesson) => lesson.chapters)
    .find((chapter) => chapter.slug === chapterSlug)?.content;
  if (authored) return authored;

  if (chapterSlug === "what-is-pod") {
    return {
      hook: "Print on demand means designs are produced after an order is placed.",
      blocks: [
        { type: "paragraph", text: "You upload a design to products such as shirts or mugs. A print partner produces and ships each item when a customer orders." },
        { type: "callout", title: "Verify before publishing", text: "Check the provider's current product costs, shipping destinations, production times, fees and return terms before making a customer promise." },
      ],
      takeaway: "POD can reduce inventory exposure, but design, marketing, quality and customer-service work remain yours.",
      closing: "Continue by comparing the practical trade-offs between POD and dropshipping.",
      quiz: {
        id: "what-is-pod-q1",
        type: "true-false",
        question: "In POD, an item is generally produced after a customer places an order.",
        options: [
          { id: "true", label: "True", correct: true },
          { id: "false", label: "False", correct: false },
        ],
        explanation: "Print-on-demand providers usually produce an item for a specific order; verify the provider's current fulfilment process and terms.",
      },
    };
  }

  return {
    hook: "Learn the mechanics before spending money.",
    blocks: [
      { type: "paragraph", text: "This chapter is part of Biza's structured guide to legitimate online work. Use the lesson objectives and examples to understand the model, then verify current provider terms before acting." },
      { type: "callout", title: "No guaranteed income", text: "Outcomes depend on skills, costs, execution and market conditions. Treat examples as learning tools—not forecasts or promises." },
    ],
    takeaway: "Build from evidence and understand the costs and responsibilities before making a commitment.",
    closing: "Review the next chapter in your course roadmap when you are ready.",
    quiz: {
      id: `${chapterSlug}-q1`,
      type: "mcq",
      question: "What is a responsible first step before spending on an online income idea?",
      options: [
        { id: "a", label: "Pay for a guaranteed shortcut", correct: false },
        { id: "b", label: "Understand the model, costs and risks", correct: true },
        { id: "c", label: "Borrow money and scale immediately", correct: false },
      ],
      explanation: "Understanding and validating the model helps avoid preventable costs and common scams.",
    },
  };
}

export function canAccessChapter(isFree: boolean, isPro: boolean): boolean {
  return isFree || isPro;
}
