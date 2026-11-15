export type ContentMap = {
  version: string;
  updated: string;
  status: string;
  pricing: {
    free: { kes: number; label: string };
    proMonthly: { kes: number; label: string };
    proAnnual: { kes: number; label: string };
    perCourseRange: { minKes: number; maxKes: number };
  };
  categories: Category[];
  opportunities: Opportunity[];
  scamPatterns: ScamPattern[];
  personas: {
    id: string;
    label: string;
    homeEmphasis: string;
    recommendedOpportunitySlugs: string[];
  }[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  mvp: boolean;
  opportunities: CategoryOpportunityRef[];
};

export type CategoryOpportunityRef = {
  slug: string;
  name: string;
  mvp: boolean;
};

export type Chapter = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  isFree: boolean;
  quizTypes?: string[];
};

export type Lesson = {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
  chapters: Chapter[];
};

export type Opportunity = {
  id: string;
  categorySlug: string;
  name: string;
  slug: string;
  mvp: boolean;
  infoCard: OpportunityInfoCard;
  course: {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
    estimatedHours: string;
    lessons: Lesson[];
  };
};

export type OpportunityInfoCard = {
  skillsNeeded: string[];
  startupCostMinKes: number;
  startupCostMaxKes: number;
  devices: string[];
  platforms: string[];
  timeline: string;
  earnings: {
    starting: string;
    growing: string;
    established: string;
  };
  successRateNote: string;
  risk: { financial: number; time: number; scam: number };
  recommendedPath: string[];
  scamAlert: string;
  perCoursePriceKes: number;
};

export type ScamPattern = {
  id: string;
  slug: string;
  name: string;
  categoryTags: string[];
  dangerLevel: "medium" | "high" | "critical";
};

export type OpportunityListItem = {
  categorySlug: string;
  categoryName: string;
  slug: string;
  name: string;
  mvp: boolean;
  timeline: string;
  startupCostLabel: string;
  chapterCount: number;
  perCoursePriceKes: number;
};
