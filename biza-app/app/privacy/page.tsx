import { LegalPage, LegalSection } from "@/components/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <LegalSection title="Data we collect">
        <p>
          We collect information you provide directly: name, email address, phone number (for M-Pesa
          callbacks), payment references, learning progress, and profile preferences such as persona
          and avatar selection.
        </p>
      </LegalSection>
      <LegalSection title="How we use data">
        <p>
          Data is used to operate your account, track course progress, process payments, send
          transactional receipts, and improve platform performance. We do not sell your personal
          information.
        </p>
      </LegalSection>
      <LegalSection title="Third-party services">
        <p>
          We use processors necessary to deliver the service, including Supabase (hosting and auth),
          Safaricom Daraja (M-Pesa), Flutterwave or Stripe (card payments, when enabled), and Google
          Analytics (usage analytics, when enabled). Each processor handles data under their own
          policies.
        </p>
      </LegalSection>
      <LegalSection title="Data retention">
        <p>
          Account data is retained for up to three years after last activity, unless you request
          earlier deletion or we are required by law to retain records longer.
        </p>
      </LegalSection>
      <LegalSection title="Your rights">
        <p>
          You may request a copy of your data or request account deletion by emailing{" "}
          <a href="mailto:hello@getbiza.co.ke" className="font-medium text-leaf hover:text-forest">
            hello@getbiza.co.ke
          </a>
          . We respond within 30 days.
        </p>
      </LegalSection>
      <LegalSection title="Cookies">
        <p>
          We use session cookies required for login and platform functionality. We do not use
          third-party advertising cookies without your consent.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
