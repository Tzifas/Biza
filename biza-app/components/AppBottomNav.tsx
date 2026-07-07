"use client";

import { cn } from "@/lib/utils/cn";
import { BookOpen, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { href: "/app", label: "Home", icon: Home, exact: true },
  { href: "/app/courses", label: "Courses", icon: BookOpen, exact: false },
  { href: "/app/profile", label: "Profile", icon: User, exact: false },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
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
                "flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold transition-colors relative",
                active ? "text-forest" : "text-stone hover:text-forest"
              )}
            >
              {/* Active indicator animation */}
              {active && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 rounded-t-lg bg-gold/5 border-t-2 border-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              </motion.div>
              <span className="relative z-10">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
