import Link from "next/link";
import { ShieldCheck, Mail, Globe, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest text-white/80 border-t border-white/10 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand block */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-forest rounded-lg border border-gold flex items-center justify-center overflow-hidden">
                <span className="font-display font-bold text-base text-gold z-10 select-none">B</span>
                <div className="absolute w-[2px] h-[30px] bg-white rotate-45 transform origin-center z-0"></div>
              </div>
              <span className="font-display font-bold text-lg text-white">Biza</span>
            </div>
            <p className="text-sm max-w-md text-[#9FC4A8]">
              Providing verified, structured 7-step roadmaps to guide young Kenyans towards legitimate online income models and away from financial scams.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="mailto:info@biza.co.ke" className="hover:text-gold text-[#9FC4A8] flex items-center gap-1.5 text-xs">
                <Mail size={14} />
                info@biza.co.ke
              </Link>
              <span className="text-[#9FC4A8]/30">|</span>
              <span className="text-xs text-[#9FC4A8] flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Kenya Registered company
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-gold transition-colors">
                  Browse Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gold transition-colors">
                  Learning Dashboard
                </Link>
              </li>
              <li>
                <Link href="/scam-warnings" className="hover:text-gold transition-colors text-rose-300">
                  Scam Radar
                </Link>
              </li>
              <li>
                <Link href="/courses?join=pro" className="hover:text-gold transition-colors text-gold flex items-center gap-1">
                  <Sparkles size={12} />
                  Upgrade to Pro
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-gold transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Income Disclaimer */}
        <div className="border-t border-white/10 pt-8 mt-8 text-center space-y-4">
          <div className="bg-[#132c1f] border border-gold/20 rounded-xl p-5 text-left max-w-4xl mx-auto">
            <h4 className="text-gold text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck size={14} />
              Important Income Disclaimer
            </h4>
            <p className="text-xs text-[#9FC4A8] leading-relaxed">
              Biza provides educational information only. We do not guarantee any specific income results. Actual earnings depend on individual effort, market conditions, experience, and other factors beyond our control. Nothing on this platform constitutes financial or investment advice.
            </p>
          </div>

          <p className="text-xs text-[#9FC4A8]/60 pt-4">
            &copy; {new Date().getFullYear()} Biza. All rights reserved. Made for Kenya and East Africa.
          </p>
        </div>
      </div>
    </footer>
  );
}
