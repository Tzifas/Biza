import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow py-12 bg-[#FAF9F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-border-custom rounded-2xl p-8 space-y-6">
          <h1 className="font-display font-bold text-2xl text-forest">Refund Policy</h1>
          <p className="text-xs text-[#888]">Last Updated: June 2025</p>

          <div className="space-y-4 text-xs text-[#555] leading-relaxed">
            <h2 className="font-display font-bold text-sm text-forest">1. Digital Content Delivery</h2>
            <p>
              Due to the immediate access nature of digital downloads and course roadmaps, Biza does not offer refunds once you have unlocked steps 3-7 of any course.
            </p>

            <h2 className="font-display font-bold text-sm text-forest">2. Pro Pass Subscription Cancellation</h2>
            <p>
              You can cancel your Biza Pro Pass monthly or annual subscription at any time. Upon cancellation, your access to steps 3-7 will remain active until the end of your current paid billing period. No partial refunds are issued.
            </p>

            <h2 className="font-display font-bold text-sm text-forest">3. Billing Disputes</h2>
            <p>
              If you believe you have been double-charged or encountered checkout billing errors, please email support at <strong className="text-forest">info@biza.co.ke</strong> with receipt references. All disputes are resolved within 5 business days.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
