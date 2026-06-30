import { SiteLayout } from "@/components/layouts/SiteLayout";
import { Button, Card, Chip } from "@/components/ui";
import { scamDetails } from "@/lib/scam/details";
import { AlertTriangle, ArrowRight, ShieldAlert, ShieldCheck } from "lucide-react";

const dangerVariant = {
  Critical: "danger" as const,
  High: "danger" as const,
  Medium: "gold" as const,
};

export default function ScamRadarPage() {
  return (
    <SiteLayout>
      <main className="flex-grow bg-cream py-12">
        <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-coral/10 bg-coral-light text-coral">
              <ShieldAlert size={28} />
            </div>
            <h1 className="font-display text-3xl font-bold text-forest">Scam Radar</h1>
            <p className="text-sm leading-relaxed text-stone">
              Documented fraud patterns targeting young Kenyans seeking online income. Review before
              you spend a shilling.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-forest">
              Scam pattern library
            </h2>
            <div className="space-y-4">
              {scamDetails.map((scam) => (
                <Card key={scam.slug} hover={false} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-display text-base font-semibold text-forest">{scam.title}</h3>
                    <Chip variant={dangerVariant[scam.dangerLevel]}>{scam.dangerLevel}</Chip>
                  </div>
                  <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone">
                        Common channel
                      </span>
                      <p className="leading-relaxed text-ink/80">{scam.format}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone">
                        How it works
                      </span>
                      <p className="leading-relaxed text-ink/80">{scam.modusOperandi}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 rounded-lg border border-coral/10 bg-coral-light p-4 text-xs">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0 text-coral" />
                    <div>
                      <strong className="text-coral">Red flag:</strong>
                      <p className="mt-0.5 leading-relaxed text-ink/80">{scam.redFlag}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card hover={false} className="space-y-4">
            <h2 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-forest">
              <ShieldCheck size={16} />
              Vetting checklist
            </h2>
            <ul className="space-y-3 text-xs text-ink/80">
              {[
                "I have not paid any activation, package, or security deposit to apply.",
                "We communicate inside official platforms before a contract is funded.",
                "No one has asked for passwords, bank credentials, or M-Pesa PINs.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-leaf bg-leaf-light text-[10px] text-leaf">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/courses" variant="secondary" className="text-xs">
              Learn legitimate methods
              <ArrowRight size={14} />
            </Button>
          </Card>
        </div>
      </main>
    </SiteLayout>
  );
}
