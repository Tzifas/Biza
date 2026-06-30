import { LearnShell } from "@/components/layouts/LearnShell";
import { Button, Card, Chip } from "@/components/ui";
import { countChapters, getCategoryBySlug, getOpportunityBySlug } from "@/lib/content";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ categorySlug: string; opportunitySlug: string }> };

export default async function LearnIndexPage({ params }: Props) {
  const { categorySlug, opportunitySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const opportunity = getOpportunityBySlug(categorySlug, opportunitySlug);
  if (!category || !opportunity) notFound();

  const totalChapters = countChapters(opportunity);
  const backHref = `/courses/${categorySlug}/${opportunitySlug}`;

  return (
    <LearnShell backHref={backHref}>
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <div className="space-y-2">
          <Link href={backHref} className="text-xs font-medium text-leaf hover:text-forest">
            ← {opportunity.name}
          </Link>
          <h1 className="font-display text-2xl font-bold text-forest">{opportunity.course.title}</h1>
          <p className="text-sm text-stone">{totalChapters} chapters · First 2 per lesson free</p>
        </div>

        <div className="space-y-6">
          {opportunity.course.lessons.map((lesson) => (
            <Card key={lesson.id} hover={false} className="space-y-4">
              <h2 className="font-display text-lg font-semibold text-forest">{lesson.title}</h2>
              <ul className="space-y-2">
                {lesson.chapters.map((ch) => (
                  <li key={ch.id}>
                    <Link
                      href={`/courses/${categorySlug}/${opportunitySlug}/learn/${lesson.slug}/${ch.slug}`}
                      className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:border-forest"
                    >
                      <span className="font-medium text-ink">{ch.title}</span>
                      {ch.isFree ? (
                        <Chip variant="success" className="normal-case">
                          Free
                        </Chip>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-semibold text-pro-purple">
                          <Lock size={12} /> PRO
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Button href="/app" variant="outline" className="text-xs">
          Go to dashboard
          <ArrowRight size={14} />
        </Button>
      </div>
    </LearnShell>
  );
}
