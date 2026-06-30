import { SiteLayout } from "@/components/layouts/SiteLayout";
import { Button, Card, Chip } from "@/components/ui";
import {
  formatKesRange,
  getCategoryBySlug,
  getOpportunityBySlug,
} from "@/lib/content";
import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ categorySlug: string; opportunitySlug: string }> };

function RiskDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < level ? "bg-leaf" : "bg-border"}`}
        />
      ))}
    </div>
  );
}

export default async function OpportunityPage({ params }: Props) {
  const { categorySlug, opportunitySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const opportunity = getOpportunityBySlug(categorySlug, opportunitySlug);

  if (!category || !opportunity) notFound();

  const { infoCard, course } = opportunity;

  return (
    <SiteLayout>
      <main className="flex-grow bg-cream pb-16">
        <section className="bg-forest py-12 text-white">
          <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-cream/70">
              <Link href="/courses" className="hover:text-gold">
                Courses
              </Link>
              <span>/</span>
              <Link href={`/courses/${categorySlug}`} className="hover:text-gold">
                {category.name}
              </Link>
              <span>/</span>
              <span className="text-white">{opportunity.name}</span>
            </nav>
            <h1 className="font-display text-3xl font-bold md:text-4xl">{opportunity.name}</h1>
            <p className="max-w-2xl text-sm text-cream/90">{course.title}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Chip variant="gold">{course.difficulty}</Chip>
              <Chip variant="default">{course.estimatedHours} hours</Chip>
              {opportunity.mvp ? <Chip variant="success">MVP live</Chip> : null}
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-8">
            <Card hover={false} className="space-y-4">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest">
                Skills needed
              </h2>
              <div className="flex flex-wrap gap-2">
                {infoCard.skillsNeeded.map((skill) => (
                  <Chip key={skill} variant="default" className="normal-case">
                    {skill}
                  </Chip>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Startup cost", value: formatKesRange(infoCard.startupCostMinKes, infoCard.startupCostMaxKes) },
                { label: "Timeline", value: infoCard.timeline },
                { label: "Devices", value: infoCard.devices.join(", ") },
                { label: "Success rate", value: infoCard.successRateNote },
              ].map((item) => (
                <Card key={item.label} hover={false} padding="sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-stone">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-forest">{item.value}</p>
                </Card>
              ))}
            </div>

            <Card hover={false} className="space-y-3">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest">
                Platforms used
              </h2>
              <div className="flex flex-wrap gap-2">
                {infoCard.platforms.map((p) => (
                  <Chip key={p} variant="default" className="normal-case">
                    {p}
                  </Chip>
                ))}
              </div>
            </Card>

            <Card hover={false} className="space-y-4">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest">
                Expected earnings (KES)
              </h2>
              <div className="divide-y divide-border text-sm">
                {[
                  ["Starting", infoCard.earnings.starting],
                  ["Growing", infoCard.earnings.growing],
                  ["Established", infoCard.earnings.established],
                ].map(([tier, amount]) => (
                  <div key={tier} className="flex justify-between py-2.5">
                    <span className="text-stone">{tier}</span>
                    <span className="font-medium text-forest">{amount}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false} className="space-y-4">
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-forest">
                Risk levels
              </h2>
              {(
                [
                  ["Financial", infoCard.risk.financial],
                  ["Time", infoCard.risk.time],
                  ["Scam exposure", infoCard.risk.scam],
                ] as const
              ).map(([label, level]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-stone">{label}</span>
                  <RiskDots level={level} />
                </div>
              ))}
            </Card>

            <div className="flex items-start gap-3 rounded-lg border border-coral/20 bg-coral-light p-4">
              <AlertTriangle className="mt-0.5 shrink-0 text-coral" size={18} />
              <div>
                <h3 className="text-xs font-bold text-coral">Scam Radar alert</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink">{infoCard.scamAlert}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-4">
            <Card hover={false} className="space-y-4">
              <h2 className="font-display text-sm font-semibold text-forest">Recommended path</h2>
              <ol className="list-decimal space-y-2 pl-4 text-sm text-ink/80">
                {infoCard.recommendedPath.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <Button href={`/courses/${categorySlug}/${opportunitySlug}/learn`} variant="primary" className="w-full">
                Start course
                <ArrowRight size={14} />
              </Button>
              <p className="text-center text-xs text-stone">
                First 2 chapters per lesson free · Full course KES {infoCard.perCoursePriceKes.toLocaleString()}
              </p>
            </Card>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
