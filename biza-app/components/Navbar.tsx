"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { LayoutDashboard, LogIn, Menu, ShieldAlert, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinkClass =
  "text-sm font-medium text-cream/90 transition-colors hover:text-gold";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo variant="nav" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/courses" className={navLinkClass}>
              Browse Courses
            </Link>
            <Link href="/app" className={cn(navLinkClass, "flex items-center gap-1.5")}>
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              href="/scam-radar"
              className="flex items-center gap-1.5 text-sm font-medium text-coral transition-colors hover:text-gold"
            >
              <ShieldAlert size={16} />
              Scam Radar
            </Link>

            <div className="h-4 w-px bg-white/20" />

            <Link href="/login" className={cn(navLinkClass, "flex items-center gap-1.5")}>
              <LogIn size={16} />
              Sign In
            </Link>
            <Button href="/app/upgrade" variant="primary" className="min-h-[44px] px-5">
              Get Pro Pass
            </Button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-white/10 focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} className="text-gold" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-forest md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-gold"
            >
              Browse Courses
            </Link>
            <Link
              href="/app"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-gold"
            >
              Dashboard
            </Link>
            <Link
              href="/scam-radar"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-coral hover:bg-white/10 hover:text-gold"
            >
              Scam Radar
            </Link>

            <div className="my-2 border-t border-white/10" />

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium hover:bg-white/10 hover:text-gold"
            >
              Sign In
            </Link>
            <Button
              href="/app/upgrade"
              variant="primary"
              className="mt-4 w-full"
              onClick={() => setIsOpen(false)}
            >
              Get Pro Pass
            </Button>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
