import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow py-12 bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-border-custom rounded-2xl p-8 space-y-6">
          <h1 className="font-display font-bold text-2xl text-forest">Privacy Policy</h1>
          <p className="text-xs text-[#888]">Last Updated: June 2025</p>

          <div className="space-y-4 text-xs text-[#555] leading-relaxed">
            <h2 className="font-display font-bold text-sm text-forest">1. Data Collected</h2>
            <p>
              We collect information you provide directly when creating an account or upgrading, including your name, email address, phone number (for M-Pesa callbacks), and billing details.
            </p>

            <h2 className="font-display font-bold text-sm text-forest">2. How We Use Data</h2>
            <p>
              We use your data to manage your learning roadmap progress, verify transactions and payments via M-Pesa or Card gateways, send transactional payment receipts, and improve platform speed.
            </p>

            <h2 className="font-display font-bold text-sm text-forest">3. Third-Party Integrations</h2>
            <p>
              We share details only with processors necessary to deliver our services, including Safaricom Daraja API (for M-Pesa), Flutterwave (for card checkout processing), and YouTube (for loading course iframe feeds). We never sell your personal information.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
