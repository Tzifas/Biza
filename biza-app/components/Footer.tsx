import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui";
import { Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-forest pt-12 pb-8 text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Logo variant="nav" />
            <p className="max-w-md text-sm text-cream/90">
              Verified, structured learning paths guiding young Kenyans toward legitimate online
              income models — and away from financial scams.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="mailto:hello@getbiza.co.ke"
                className="flex items-center gap-1.5 text-xs text-cream/90 hover:text-gold"
              >
                <Mail size={14} />
                hello@getbiza.co.ke
              </Link>
              <span className="text-cream/30">|</span>
              <span className="flex items-center gap-1.5 text-xs text-cream/90">
                <ShieldCheck size={14} />
                Kenya registered company
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="transition-colors hover:text-gold">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/app" className="transition-colors hover:text-gold">
                  Learning Dashboard
                </Link>
              </li>
              <li>
                <Link href="/scam-radar" className="text-coral transition-colors hover:text-gold">
                  Scam Radar
                </Link>
              </li>
              <li>
                <Link href="/app/upgrade" className="text-gold transition-colors hover:text-gold/80">
                  Upgrade to Pro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="transition-colors hover:text-gold">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="transition-colors hover:text-gold">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 border-t border-white/10 pt-8 text-center">
          <Card
            hover={false}
            padding="sm"
            className="mx-auto max-w-4xl border-gold/20 bg-forest text-left"
          >
            <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
              <ShieldCheck size={14} />
              Important income disclaimer
            </h4>
            <p className="text-xs leading-relaxed text-cream/90">
              IMPORTANT: Biza provides educational information only. We do not guarantee any
              specific income results. Actual earnings depend on individual effort, market
              conditions, experience, and many other factors. Nothing on this platform constitutes
              financial advice.
            </p>
          </Card>

          <p className="pt-4 text-xs text-cream/60">
            &copy; {new Date().getFullYear()} Biza. All rights reserved. getbiza.co.ke
          </p>
        </div>
      </div>
    </footer>
  );
}
