import { SiteLayout } from "@/components/layouts/SiteLayout";
import { Button, Card, Chip } from "@/components/ui";
import { getCategoryBySlug, getOpportunityBySlug } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ categorySlug: string }> };

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  return (
    <SiteLayout>
      <main className="flex-grow bg-cream py-12">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            <Link href="/courses" className="text-xs font-medium text-leaf hover:text-forest">
              ← All categories
            </Link>
            <h1 className="font-display text-3xl font-bold text-forest">{category.name}</h1>
            <p className="max-w-2xl text-sm text-stone">{category.description}</p>
            {category.mvp ? <Chip variant="gold">MVP category</Chip> : null}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.opportunities.map((ref) => {
              const live = getOpportunityBySlug(categorySlug, ref.slug);
              return (
                <Card key={ref.slug} className="flex flex-col justify-between">
                  <div className="space-y-2">
                    <h2 className="font-display text-lg font-semibold text-forest">{ref.name}</h2>
                    <Chip variant={ref.mvp && live ? "gold" : "default"}>
                      {live ? "Available" : "Coming soon"}
                    </Chip>
                  </div>
                  <div className="pt-6">
                    {live ? (
                      <Button href={`/courses/${categorySlug}/${ref.slug}`} variant="secondary" className="w-full text-xs">
                        View opportunity
                        <ArrowRight size={14} />
                      </Button>
                    ) : (
                      <p className="text-xs text-stone">Course content is in production.</p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
