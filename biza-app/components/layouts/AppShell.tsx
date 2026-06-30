"use client";

import { AppBottomNav } from "@/components/AppBottomNav";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Authenticated app shell — compact header + 3-tab bottom nav. No Footer. */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideBottomNav = pathname === "/app/upgrade";

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="sticky top-0 z-40 border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/app">
            <Logo variant="nav-light" className="h-7" />
          </Link>
          <Link
            href="/scam-radar"
            className="text-xs font-semibold text-coral hover:text-forest"
          >
            Scam Radar
          </Link>
        </div>
      </header>

      <main className={cn("flex-grow", !hideBottomNav && "pb-[calc(5rem+env(safe-area-inset-bottom))]")}>{children}</main>

      {!hideBottomNav ? <AppBottomNav /> : null}
    </div>
  );
}
