import { LegalPage, LegalSection } from "@/components/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <LegalSection title="User eligibility">
        <p>
          You must be at least 18 years old to use Biza, or have explicit parental or guardian
          consent. By creating an account, you confirm you meet this requirement.
        </p>
      </LegalSection>
      <LegalSection title="Acceptable use">
        <p>
          Biza grants a personal, non-transferable licence to access educational content. You may
          not resell, redistribute, share, or publicly republish PRO content. You may not scrape,
          mirror, or automate bulk access to the platform.
        </p>
      </LegalSection>
      <LegalSection title="Payment terms">
        <p>
          Fees are charged in Kenyan Shillings (KES). No refunds are issued once paid course content
          has been accessed — see the Refund Policy. Pro Pass subscriptions may be cancelled at any
          time; access continues until the end of the paid billing period.
        </p>
      </LegalSection>
      <LegalSection title="Intellectual property">
        <p>
          All course content, the Compass B logo, graphics, and platform design are owned by Biza.
          Unauthorized reproduction or derivative use is prohibited.
        </p>
      </LegalSection>
      <LegalSection title="Limitation of liability">
        <p>
          Biza is an education platform only. We do not provide financial, investment, tax, or legal
          advice. We do not guarantee any specific income results. Actual earnings depend on
          individual effort, skills, market conditions, and many other factors.
        </p>
      </LegalSection>
      <LegalSection title="Income disclaimer">
        <p>
          IMPORTANT: Nothing on this platform constitutes financial advice. Educational information
          is provided for general learning purposes only.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
