export type QuizOption = { id: string; label: string; correct?: boolean };

export type ChapterQuiz = {
  id: string;
  type: "mcq" | "true-false" | "scenario" | "fill-blank";
  question: string;
  options: QuizOption[];
  explanation: string;
};

export type ChapterContent = {
  hook: string;
  paragraphs: string[];
  visualLabel: string;
  takeaway: string;
  closing: string;
  quiz: ChapterQuiz;
};

/** Stub chapter body copy — editorial replaces in Phase 2 */
export function getChapterContent(
  opportunitySlug: string,
  chapterSlug: string
): ChapterContent {
  const defaults: ChapterContent = {
    hook: "Most people skip this part. Don't.",
    paragraphs: [
      "This chapter breaks down how the model works in plain Kenyan context — no hype, no guru promises.",
      "Read slowly. The quiz checks whether you actually understood the idea, not whether you memorised jargon.",
    ],
    visualLabel: "Process overview",
    takeaway: "Understanding the model beats chasing shortcuts every time.",
    closing: "In the next chapter, you'll go deeper with real numbers and platforms.",
    quiz: {
      id: `${chapterSlug}-q1`,
      type: "mcq",
      question: "What is the most honest first step in this income model?",
      options: [
        { id: "a", label: "Pay a mentor for a guaranteed blueprint", correct: false },
        { id: "b", label: "Learn how money flows before spending on tools", correct: true },
        { id: "c", label: "Borrow capital and scale ads immediately", correct: false },
      ],
      explanation:
        "Legitimate models reward understanding and consistency. Paying for 'guarantees' is a common scam pattern.",
    },
  };

  const overrides: Record<string, Partial<ChapterContent>> = {
    "what-is-dropshipping": {
      hook: "Dropshipping is not magic inventory — it's retail without warehousing.",
      paragraphs: [
        "You list products online. When a customer buys, your supplier ships directly to them. You keep the margin between your price and the supplier cost.",
        "From Kenya, this works — but payment processors, delivery times, and ad costs determine whether you profit or burn cash.",
      ],
      quiz: {
        id: "what-is-dropshipping-q1",
        type: "mcq",
        question: "Who holds inventory in a dropshipping model?",
        options: [
          { id: "a", label: "You warehouse products at home", correct: false },
          { id: "b", label: "The supplier holds and ships stock", correct: true },
          { id: "c", label: "Safaricom holds products until M-Pesa clears", correct: false },
        ],
        explanation: "You never hold stock. The supplier fulfils orders after you forward customer details.",
      },
    },
    "what-is-pod": {
      hook: "Print on demand means zero stock — designs printed only after someone orders.",
      paragraphs: [
        "You upload designs to products like t-shirts or mugs. A print partner manufactures each item when ordered.",
        "Margins are smaller than hype sellers claim, but startup cost can genuinely start at KES 0 if you use free tiers.",
      ],
      quiz: {
        id: "what-is-pod-q1",
        type: "true-false",
        question: "In POD, products are printed before you get your first sale.",
        options: [
          { id: "true", label: "True", correct: false },
          { id: "false", label: "False", correct: true },
        ],
        explanation: "POD prints after an order — that's the whole point. No upfront inventory.",
      },
    },
  };

  const merged = { ...defaults, ...overrides[chapterSlug] };
  if (overrides[chapterSlug]?.quiz) merged.quiz = overrides[chapterSlug].quiz as ChapterQuiz;
  return merged;
}

export function canAccessChapter(isFree: boolean, isPro: boolean): boolean {
  return isFree || isPro;
}
