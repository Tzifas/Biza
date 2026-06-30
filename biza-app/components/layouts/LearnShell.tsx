import { Logo } from "@/components/Logo";
import Link from "next/link";
import type { ReactNode } from "react";

/** In-course flow — compact header, no Footer, no 3-tab app nav. */
export function LearnShell({ children, backHref }: { children: ReactNode; backHref?: string }) {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="sticky top-0 z-40 border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/app">
            <Logo variant="nav-light" className="h-7" />
          </Link>
          {backHref ? (
            <Link href={backHref} className="text-xs font-semibold text-leaf hover:text-forest">
              ← Back
            </Link>
          ) : null}
        </div>
      </header>
      <main className="flex-grow pb-20">{children}</main>
    </div>
  );
}
