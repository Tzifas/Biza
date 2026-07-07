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
  const [isPaying, setIsPaying] = useState(false);
  const [stkStatus, setStkStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [phoneError, setPhoneError] = useState("");

  const amount = plan === "monthly" ? pricing.proMonthly.kes : pricing.proAnnual.kes;

  const validatePhone = (num: string) => {
    const clean = num.replace(/[\s+-]/g, "");
    if (!clean) return "Phone number is required";
    if (/^(?:254|\+254|0)?(7|1)\d{8}$/.test(clean)) {
      return "";
    }
    return "Enter a valid Kenyan number (e.g. 0712345678 or 0112345678)";
  };

  const handlePay = () => {
    const error = validatePhone(phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    setPhoneError("");
    setIsPaying(true);
    setStkStatus("sending");

    // 1. Simulate sending STK Push
    setTimeout(() => {
      setStkStatus("sent");
      // 2. Simulate user typing PIN and Safaricom confirming callback
      setTimeout(() => {
        saveUser({ isPro: true });
        setPaid(true);
        setIsPaying(false);
        setStkStatus("idle");
      }, 3500);
    }, 2000);
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
            disabled={isPaying}
            onClick={() => setPlan(p)}
            className={`rounded-lg border p-4 text-left transition-colors ${plan === p ? "border-forest bg-white" : "border-border bg-white/50"} ${isPaying ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
          {stkStatus === "idle" && (
            <>
              <Input
                label="M-Pesa number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError(validatePhone(e.target.value));
                }}
                error={phoneError}
                placeholder="e.g. 0712345678"
                disabled={isPaying}
              />
              <Button variant="primary" className="w-full max-w-xs mx-auto flex" onClick={handlePay} disabled={isPaying}>
                Pay KES {amount.toLocaleString()} via M-Pesa
              </Button>
            </>
          )}

          {stkStatus === "sending" && (
            <div className="py-6 text-center space-y-3">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-leaf border-t-transparent" />
              <p className="font-display text-sm font-semibold text-forest">
                Initiating payment...
              </p>
              <p className="text-xs text-stone">
                Requesting M-Pesa STK Push for {phone}
              </p>
            </div>
          )}

          {stkStatus === "sent" && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold animate-pulse">
                <Sparkles size={24} />
              </div>
              <div className="space-y-2">
                <p className="font-display text-sm font-semibold text-forest">
                  STK Push Sent!
                </p>
                <p className="mx-auto max-w-xs text-xs text-stone leading-relaxed">
                  Please check your phone for the M-Pesa popup prompt. Enter your PIN to approve the payment of <strong>KES {amount.toLocaleString()}</strong>.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-[11px] text-leaf font-medium">
                <div className="h-2 w-2 rounded-full bg-leaf animate-ping" />
                Waiting for M-Pesa confirmation callback...
              </div>
            </div>
          )}
        </Card>
      ) : (
        <Card hover={false} className="space-y-4 text-center">
          <CheckCircle className="mx-auto text-leaf" size={40} />
          <p className="font-display text-sm font-bold text-forest">Pro Access Unlocked!</p>
          <p className="text-xs text-stone">Payment successfully mock-confirmed via Safaricom STK callback.</p>
          <Button variant="secondary" className="max-w-xs mx-auto flex" onClick={() => router.push("/app")}>
            Back to dashboard
          </Button>
        </Card>
      )}
    </div>
  );
}
