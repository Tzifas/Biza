"use client";

import { cn } from "@/lib/utils/cn";
import { BookOpen, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/app", label: "Home", icon: Home, exact: true },
  { href: "/app/courses", label: "Courses", icon: BookOpen, exact: false },
  { href: "/app/profile", label: "Profile", icon: User, exact: false },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-white pb-[env(safe-area-inset-bottom)]"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-lg items-stretch justify-around px-2 pt-1">
        {tabs.map((tab) => {
          const active = tab.exact
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors",
                active ? "text-forest" : "text-stone hover:text-forest"
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
