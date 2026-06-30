import { SiteLayout } from "@/components/layouts/SiteLayout";
import { getCategories } from "@/lib/content";
import { Button, Card, Chip } from "@/components/ui";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Code,
  Map,
  Megaphone,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "cat-freelancing": Briefcase,
  "cat-content": Video,
  "cat-selling": ShoppingBag,
  "cat-digital": Package,
  "cat-marketing": Megaphone,
  "cat-tech": Code,
};

export default function Home() {
  const launchCategories = getCategories().map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    badge: cat.mvp ? "MVP live" : "Coming soon",
    mvp: cat.mvp,
  }));

  return (
    <SiteLayout footer>
      <main className="flex-grow">
        <section className="relative overflow-hidden bg-forest py-20 text-white md:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 h-full w-px rotate-12 bg-white" />
            <div className="absolute top-0 left-2/4 h-full w-px rotate-12 bg-white" />
            <div className="absolute top-0 left-3/4 h-full w-px rotate-12 bg-white" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <Chip variant="gold" className="border border-gold/30 bg-gold/10 normal-case tracking-normal">
                  <Sparkles className="mr-1 inline h-3.5 w-3.5" />
                  Now live in Kenya
                </Chip>
                <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Learn exactly how <span className="text-gold">online money works</span>.
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-cream/90">
                  No hype. No get-rich-quick scams. Verified, chapter-based learning paths for
                  legitimate online income — built for the Kenyan context.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button href="/courses" variant="primary" className="px-8">
                    Start learning free
                    <ArrowRight size={18} />
                  </Button>
                  <Button
                    href="/app/upgrade"
                    variant="outline"
                    className="border-cream/30 text-cream hover:border-cream hover:bg-white/10 hover:text-white"
                  >
                    Explore Pro Pass
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Card hover={false} className="space-y-5 text-ink">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-stone">
                      Active learning path
                    </span>
                    <Chip variant="success">Free access</Chip>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-semibold text-forest">Dropshipping</h3>
                    <p className="text-xs text-stone">Launch a store without holding inventory.</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      { n: 1, title: "What dropshipping actually is", free: true },
                      { n: 2, title: "How money flows and margin works", free: true },
                      { n: 3, title: "Dropshipping from Kenya — payments", locked: true },
                    ].map((ch) => (
                      <div key={ch.n} className="flex items-start gap-3">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                            ch.locked
                              ? "bg-leaf-light text-forest"
                              : "bg-forest text-white"
                          }`}
                        >
                          {ch.n}
                        </div>
                        <div className="text-xs font-medium text-ink">
                          {ch.title}{" "}
                          <span className={ch.locked ? "font-medium text-pro-purple" : "font-normal text-stone"}>
                            {ch.locked ? "(PRO locked)" : "(Free)"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-coral/10 bg-coral-light p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-coral">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-coral">Anti-scam alert</h4>
                      <p className="text-[10px] leading-normal text-ink">
                        Legitimate suppliers never charge upfront membership fees. Guard your money.
                      </p>
                    </div>
                  </div>

                  <Button
                    href="/courses/selling-online/dropshipping"
                    variant="secondary"
                    className="w-full text-sm"
                  >
                    Try this course
                    <ArrowRight size={14} />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
              <h2 className="font-display text-3xl font-bold text-forest md:text-4xl">
                What makes Biza different?
              </h2>
              <p className="text-sm leading-relaxed text-stone md:text-base">
                We bridge digital ambition and practical achievement — with honest data and scam
                awareness built in.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: Map,
                  title: "Flexible learning paths",
                  body: "Chapter-based courses where content depth drives structure — no fixed fluff templates.",
                  iconClass: "bg-leaf-light text-forest",
                },
                {
                  icon: ShieldCheck,
                  title: "Built-in Scam Radar",
                  body: "Red flags, fee traps, and guru patterns — so you save money before you earn.",
                  iconClass: "bg-coral-light text-coral",
                },
                {
                  icon: TrendingUp,
                  title: "Kenya-optimized",
                  body: "M-Pesa, local platforms, and realistic KES timelines — not generic Western advice.",
                  iconClass: "bg-leaf-light text-forest",
                },
              ].map((feature) => (
                <Card key={feature.title} className="space-y-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconClass}`}
                  >
                    <feature.icon size={24} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-forest">{feature.title}</h3>
                  <p className="text-xs leading-relaxed text-stone">{feature.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-3">
                <span className="text-xs font-medium uppercase tracking-wider text-forest">
                  Choose your path
                </span>
                <h2 className="font-display text-3xl font-bold text-forest md:text-4xl">
                  Explore income categories
                </h2>
              </div>
              <Link
                href="/courses"
                className="flex items-center gap-1 text-sm font-medium text-forest hover:text-leaf"
              >
                View all courses
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {launchCategories.map((cat) => {
                const Icon = iconMap[cat.id] ?? Briefcase;
                return (
                  <Card key={cat.id} className="flex min-h-[220px] flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest text-white">
                          <Icon size={20} />
                        </div>
                        <Chip variant={cat.mvp ? "gold" : "default"}>{cat.badge}</Chip>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-lg font-semibold text-forest">{cat.name}</h3>
                        <p className="text-xs leading-relaxed text-stone">{cat.description}</p>
                      </div>
                    </div>
                    <div className="pt-6">
                      <Link
                        href={`/courses/${cat.slug}`}
                        className="flex items-center gap-1 text-xs font-medium text-forest hover:text-leaf"
                      >
                        Explore category
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-coral/10 bg-coral-light py-16">
          <div className="mx-auto max-w-4xl space-y-6 px-4 text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-coral/10 bg-white text-coral">
              <AlertTriangle size={28} />
            </div>
            <h2 className="font-display text-2xl font-bold text-coral md:text-3xl">
              Tired of get-rich-quick scams?
            </h2>
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-coral/90 md:text-sm">
              If a job asks you to pay an activation fee before you work, it is a scam. Biza shows
              honest startup costs, timelines, and verified platforms — before you spend a shilling.
            </p>
            <Button href="/scam-radar" variant="danger">
              Read our Scam Radar
              <ArrowRight size={14} />
            </Button>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
