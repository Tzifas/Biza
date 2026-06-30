"use client";

import { Button, Card, Input } from "@/components/ui";
import { getPricing } from "@/lib/content";
import { saveUser } from "@/lib/user/storage";
import { CheckCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const pricing = getPricing();

export default function UpgradePage() {
  const router = useRouter();
  const [plan, setPlan] = useState<"monthly" | "annual">("monthly");
  const [phone, setPhone] = useState("");
  const [paid, setPaid] = useState(false);

  const amount = plan === "monthly" ? pricing.proMonthly.kes : pricing.proAnnual.kes;

  const handlePay = () => {
    saveUser({ isPro: true });
    setPaid(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
      <div className="space-y-2 text-center">
        <Sparkles className="mx-auto text-gold" size={28} />
        <h1 className="font-display text-3xl font-bold text-forest">Upgrade to Pro Pass</h1>
        <p className="text-sm text-stone">First 2 chapters per lesson stay free.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(["monthly", "annual"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlan(p)}
            className={`rounded-lg border p-4 text-left ${plan === p ? "border-forest bg-white" : "border-border"}`}
          >
            <p className="text-xs font-semibold uppercase text-stone">{p}</p>
            <p className="font-display text-xl font-bold text-forest">
              KES {(p === "monthly" ? pricing.proMonthly.kes : pricing.proAnnual.kes).toLocaleString()}
            </p>
          </button>
        ))}
      </div>

      {!paid ? (
        <Card hover={false} className="space-y-4">
          <Input label="M-Pesa number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
          <Button variant="primary" className="w-full" onClick={handlePay}>
            Pay KES {amount.toLocaleString()} (demo)
          </Button>
        </Card>
      ) : (
        <Card hover={false} className="space-y-4 text-center">
          <CheckCircle className="mx-auto text-leaf" size={40} />
          <p className="text-sm text-stone">Pro unlocked locally (demo).</p>
          <Button variant="secondary" onClick={() => router.push("/app")}>
            Back to home
          </Button>
        </Card>
      )}
    </div>
  );
}
