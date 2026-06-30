import { LegalPage, LegalSection } from "@/components/LegalPage";

export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy">
      <LegalSection title="Digital course access">
        <p>
          Because Biza delivers digital content with immediate access, we do not offer refunds once
          you have unlocked paid chapters or accessed PRO course material.
        </p>
      </LegalSection>
      <LegalSection title="Pro Pass subscriptions">
        <p>
          You may cancel Pro Pass at any time. Your access continues until the end of the current
          billing period (monthly or annual). No partial refunds are issued for unused time within a
          billing cycle.
        </p>
      </LegalSection>
      <LegalSection title="Per-course purchases">
        <p>
          One-time course unlocks are non-refundable after the first paid chapter has been opened.
        </p>
      </LegalSection>
      <LegalSection title="Billing disputes">
        <p>
          If you believe you were double-charged or billed in error, email{" "}
          <a href="mailto:hello@getbiza.co.ke" className="font-medium text-leaf hover:text-forest">
            hello@getbiza.co.ke
          </a>{" "}
          with your M-Pesa or receipt reference. Disputes are reviewed within five business days.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
