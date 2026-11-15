import { Button, Card } from "@/components/ui";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-3 text-center">
        <CreditCard className="mx-auto text-gold" size={30} aria-hidden="true" />
        <h1 className="font-display text-3xl font-bold text-forest">Membership options</h1>
        <p className="text-sm text-stone">Paid upgrades aren&apos;t available yet.</p>
      </div>

      <Card hover={false} className="space-y-4 text-center">
        <ShieldCheck className="mx-auto text-leaf" size={34} aria-hidden="true" />
        <h2 className="font-display text-lg font-semibold text-forest">Your learning stays free for now</h2>
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-stone">
          We haven&apos;t connected a real payment provider yet, so Biza will not ask for your M-Pesa number or simulate a payment. The free chapters remain available while we finish secure checkout.
        </p>
        <Button href="/app/courses" variant="primary" className="mx-auto">Browse free chapters</Button>
      </Card>
    </div>
  );
}
