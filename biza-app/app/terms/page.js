import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow py-12 bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-border-custom rounded-2xl p-8 space-y-6">
          <h1 className="font-display font-bold text-2xl text-forest">Terms of Service</h1>
          <p className="text-xs text-[#888]">Last Updated: June 2025</p>

          <div className="space-y-4 text-xs text-[#555] leading-relaxed">
            <h2 className="font-display font-bold text-sm text-forest">1. Acceptable Use Policy</h2>
            <p>
              Biza grants you a personal, non-transferable, non-exclusive license to access our educational roadmaps. You agree not to resell, distribute, share, or modify any course material or content unlocked via the Pro Pass.
            </p>

            <h2 className="font-display font-bold text-sm text-forest">2. User Eligibility</h2>
            <p>
              By creating an account on Biza, you represent that you are at least 18 years of age. Users under the age of 18 must obtain explicit parental or legal guardian consent to access courses and payment options.
            </p>

            <h2 className="font-display font-bold text-sm text-forest">3. Limitation of Liability</h2>
            <p>
              Biza is strictly an online educational platform. We provide tutorials, roadmaps, and scam warning information for informational purposes only. We do not provide financial, investment, or tax advice. We do not guarantee income results.
            </p>

            <h2 className="font-display font-bold text-sm text-forest">4. Intellectual Property</h2>
            <p>
              All course content, logo designs (including the Compass B logo mark), layout systems, graphics, and text are owned exclusively by Biza. Unauthorized reproduction is strictly prohibited.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
