import { SiteLayout } from "@/components/layouts/SiteLayout";
import { Card } from "@/components/ui";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <SiteLayout>
      <main className="flex-grow bg-cream py-12">
        <Card hover={false} className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl font-bold text-forest">{title}</h1>
          <p className="text-xs text-stone">Last updated: June 2026</p>
          <div className="space-y-5 text-sm leading-relaxed text-ink/80">{children}</div>
        </Card>
      </main>
    </SiteLayout>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="font-display text-base font-semibold text-forest">{title}</h2>
      {children}
    </section>
  );
}
