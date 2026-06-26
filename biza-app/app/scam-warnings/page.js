import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, ShieldAlert, EyeOff } from "lucide-react";

export default function ScamRadarPage() {
  const commonScams = [
    {
      title: "The 'Activation Fee' Scam",
      dangerLevel: "High",
      format: "Freelance portals or direct messages offering transcription/writing tasks.",
      modusOperandi: "The scammer says you must send KES 1,000 to KES 5,000 for 'account activation', 'software lease', or 'security deposit' before receiving work.",
      redFlag: "Any work opportunity requiring you to pay money to work is a scam. Legitimate employers pay you; you do not pay them.",
    },
    {
      title: "The Telegram / WhatsApp Escrow Bypass",
      dangerLevel: "Critical",
      format: "Clients met on Upwork or Fiverr requesting to move chats off-platform.",
      modusOperandi: "Scammer suggests moving chats to Telegram. They offer high pay rates (e.g. $50/page). After completion, they request you to pay a 'linked bank processing fee' to release funds.",
      redFlag: "Refuse to move off-platform before an official contract starts. External payments are 100% unsecured and are almost always fraudulent.",
    },
    {
      title: "The MLM 'Passive Income' Guru Masterclass",
      dangerLevel: "Medium",
      format: "Instagram, TikTok, or YouTube ads showing luxury cars and quick riches.",
      modusOperandi: "Guru claims to make $10,000/mo and sells a KES 45,000 masterclass showing you 'the secret' which is actually recruiting more members to sell the same masterclass.",
      redFlag: "Legitimate income sources require hours of hard skill building. Avoid gurus who sell course packages that focus primarily on recruitment.",
    }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow py-12 bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Page header */}
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <div className="inline-flex w-14 h-14 bg-rose-50 text-rose-700 rounded-full items-center justify-center border border-rose-100 shadow-sm">
              <ShieldAlert size={28} />
            </div>
            <h1 className="font-display font-bold text-3xl text-forest">
              Biza Anti-Scam Radar
            </h1>
            <p className="text-xs md:text-sm text-[#555] leading-relaxed">
              We catalog active online recruitment fraud formats targeting young Kenyans. Review this page to secure your wallet before launching your online business.
            </p>
          </div>

          {/* Scam warning alerts list */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-forest uppercase tracking-wider">
              Common Online Income Fraud Formats
            </h2>

            <div className="space-y-4">
              {commonScams.map((scam, idx) => (
                <div key={idx} className="bg-white border border-border-custom rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-border-custom pb-3">
                    <h3 className="font-display font-bold text-base text-forest">
                      {scam.title}
                    </h3>
                    <span 
                      className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        scam.dangerLevel === "Critical" 
                          ? "bg-rose-50 text-rose-700 border border-rose-100" 
                          : "bg-orange-50 text-orange-700 border border-orange-100"
                      }`}
                    >
                      {scam.dangerLevel} Danger
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#888] uppercase tracking-wider">Common Channel</span>
                      <p className="text-[#555] leading-relaxed">{scam.format}</p>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <span className="text-[10px] font-bold text-[#888] uppercase tracking-wider">Modus Operandi</span>
                      <p className="text-[#555] leading-relaxed">{scam.modusOperandi}</p>
                    </div>
                  </div>

                  <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 flex gap-3 text-xs">
                    <AlertTriangle size={18} className="text-[#A32D2D] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#A32D2D]">Anti-Scam Flag:</strong>
                      <p className="text-[#A32D2D]/90 mt-0.5 leading-relaxed">{scam.redFlag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Checklist Widget */}
          <div className="bg-white border border-border-custom rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={16} />
              Vetting Rules Checklist
            </h2>
            <p className="text-xs text-[#555] leading-relaxed">
              Before taking any job online, ensure you can tick these checkmarks:
            </p>

            <ul className="space-y-3 text-xs text-[#555]">
              <li className="flex items-start gap-2.5">
                <input type="checkbox" defaultChecked disabled className="mt-0.5 rounded text-leaf" />
                <span>I have not paid any money, purchase requirements, or security deposits to apply.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <input type="checkbox" defaultChecked disabled className="mt-0.5 rounded text-leaf" />
                <span>We are communicating inside official freelance platforms before a contract is funded.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <input type="checkbox" defaultChecked disabled className="mt-0.5 rounded text-leaf" />
                <span>The client has not requested any passwords, bank credentials, or verification PINs.</span>
              </li>
            </ul>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
