"use client";

import { Button, Card, Chip, Input } from "@/components/ui";
import {
  getCategories,
  getCategoryBySlug,
  getOpportunityBySlug,
  getOpportunityListItems,
} from "@/lib/content";
import { ArrowRight, Clock, Filter, Map, Search, ShieldAlert, Wallet } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Props = { basePath?: string };

export function CoursesCatalogContent({ basePath = "/courses" }: Props) {
  const searchParams = useSearchParams();
  const catFilter = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = getCategories();
  const activeCategory = catFilter ? getCategoryBySlug(catFilter) : undefined;
  const allOpportunities = getOpportunityListItems();

  const filtered = useMemo(() => {
    return allOpportunities.filter((opp) => {
      const matchesCat = !catFilter || opp.categorySlug === catFilter;
      const matchesSearch =
        !searchQuery ||
        opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [allOpportunities, catFilter, searchQuery]);

  const comingSoonRefs = useMemo(() => {
    if (!activeCategory) return [];
    return activeCategory.opportunities.filter(
      (ref) => !getOpportunityBySlug(activeCategory.slug, ref.slug)
    );
  }, [activeCategory]);

  return (
    <main className="flex-grow bg-cream py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-forest">
            <Map size={14} />
            Verified learning paths
          </div>
          <h1 className="font-display text-3xl font-bold text-forest sm:text-4xl">
            {activeCategory ? activeCategory.name : "All categories"}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-stone">
            {activeCategory?.description ??
              "Explore legitimate online income opportunities with honest Kenyan data."}
          </p>
        </div>

        {/* Mobile: horizontal category chips */}
        <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
          <Link
            href={basePath}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
              !catFilter ? "bg-forest text-white" : "border border-border bg-white text-stone"
            }`}
          >
            All ({allOpportunities.length})
          </Link>
          {categories.map((cat) => {
            const count = allOpportunities.filter((o) => o.categorySlug === cat.slug).length;
            const isActive = catFilter === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`${basePath}?category=${cat.slug}`}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                  isActive ? "bg-forest text-white" : "border border-border bg-white text-stone"
                }`}
              >
                {cat.name.split(" ")[0]} ({count || "0"})
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <Card hover={false} padding="sm" className="hidden space-y-4 lg:col-span-3 lg:block">
            <h2 className="flex items-center gap-1.5 border-b border-border pb-3 text-xs font-medium uppercase tracking-wider text-ink">
              <Filter size={14} />
              Categories
            </h2>
            <div className="flex flex-col gap-1.5">
              <Link
                href={basePath}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium ${
                  !catFilter ? "bg-forest text-white" : "text-stone hover:bg-cream"
                }`}
              >
                <span>All</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                  {allOpportunities.length}
                </span>
              </Link>
              {categories.map((cat) => {
                const count = allOpportunities.filter((o) => o.categorySlug === cat.slug).length;
                const isActive = catFilter === cat.slug;
                return (
                  <Link
                    key={cat.id}
                    href={`${basePath}?category=${cat.slug}`}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium ${
                      isActive ? "bg-forest text-white" : "text-stone hover:bg-cream"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${isActive ? "bg-white/20" : "bg-cream"}`}>
                      {count || "—"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </Card>

          <div className="space-y-6 lg:col-span-9">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-stone" />
              <Input
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filtered.map((opp) => (
                  <Card key={`${opp.categorySlug}-${opp.slug}`} className="flex min-h-[240px] flex-col justify-between">
                    <div className="space-y-2">
                      <Chip variant={opp.mvp ? "gold" : "default"}>{opp.mvp ? "MVP" : "Soon"}</Chip>
                      <h3 className="font-display text-lg font-semibold text-forest">{opp.name}</h3>
                      <p className="text-[10px] uppercase text-stone">{opp.categoryName}</p>
                    </div>
                    <div className="mt-4 space-y-2 border-t border-border pt-4">
                      <div className="flex gap-4 text-[11px] text-stone">
                        <span className="flex items-center gap-1"><Clock size={12} />{opp.timeline}</span>
                        <span className="flex items-center gap-1"><Wallet size={12} />{opp.startupCostLabel}</span>
                      </div>
                      <Button href={`/courses/${opp.categorySlug}/${opp.slug}`} variant="outline" className="w-full text-xs">
                        View opportunity <ArrowRight size={14} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card hover={false} className="p-12 text-center">
                <ShieldAlert className="mx-auto text-stone" size={24} />
                <p className="mt-2 text-sm text-stone">No live courses in this category yet.</p>
              </Card>
            )}

            {comingSoonRefs.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {comingSoonRefs.map((ref) => (
                  <Card key={ref.slug} hover={false} padding="sm" className="flex justify-between">
                    <span className="text-sm">{ref.name}</span>
                    <Chip variant="default">Soon</Chip>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
