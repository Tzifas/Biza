"use client";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import { AvatarIcon } from "@/components/avatars/AvatarIcon";
import { cn } from "@/lib/utils/cn";
import { getUser, saveUser, logoutUser, UserProfile } from "@/lib/user/storage";
import { LayoutDashboard, LogIn, LogOut, Menu, ShieldAlert, X, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Initial fetch
    setUser(getUser());

    const sync = () => {
      setUser(getUser());
    };
    window.addEventListener("biza-user-updated", sync);
    return () => window.removeEventListener("biza-user-updated", sync);
  }, []);

  const handleSignOut = () => {
    logoutUser();
    router.push("/");
  };

  const isLoggedIn = user?.onboardingComplete;

  // Paths
  const coursesPath = isLoggedIn ? "/app/courses" : "/courses";
  const dashboardPath = "/app";
  const scamRadarPath = "/scam-radar";

  const isLinkActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname?.startsWith(path);
  };

  const linkClass = (path: string) =>
    cn(
      "relative py-1 text-sm font-medium transition-colors hover:text-gold",
      isLinkActive(path) ? "text-gold font-semibold" : "text-cream/80"
    );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-forest/95 backdrop-blur-md text-white premium-glow-forest">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={isLoggedIn ? "/app" : "/"} className="flex items-center gap-3 transition-transform hover:scale-102 duration-200">
            <Logo variant="nav" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href={coursesPath} className={linkClass(coursesPath)}>
              Browse Courses
              {isLinkActive(coursesPath) && (
                <span className="absolute bottom-[-18px] left-0 right-0 h-[3px] rounded-full bg-gold animate-fade-in" />
              )}
            </Link>
            
            {isLoggedIn ? (
              <Link href={dashboardPath} className={cn(linkClass(dashboardPath), "flex items-center gap-1.5")}>
                <LayoutDashboard size={15} />
                Dashboard
                {isLinkActive(dashboardPath) && (
                  <span className="absolute bottom-[-18px] left-0 right-0 h-[3px] rounded-full bg-gold animate-fade-in" />
                )}
              </Link>
            ) : null}

            <Link
              href={scamRadarPath}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-gold relative py-1",
                isLinkActive(scamRadarPath) ? "text-coral font-semibold" : "text-coral/90"
              )}
            >
              <ShieldAlert size={15} />
              Scam Radar
              {isLinkActive(scamRadarPath) && (
                <span className="absolute bottom-[-18px] left-0 right-0 h-[3px] rounded-full bg-coral animate-fade-in" />
              )}
            </Link>

            <div className="h-4 w-px bg-white/10" />

            {isLoggedIn && user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/app/profile"
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-2 pr-3 py-1 text-xs font-semibold text-cream hover:bg-white/10 transition-colors",
                    pathname === "/app/profile" && "border-gold/30 bg-gold/5 text-gold"
                  )}
                >
                  <AvatarIcon id={user.avatarId} size={24} />
                  <span>{user.name.split(" ")[0]}</span>
                  {user.isPro && (
                    <span className="rounded bg-gold/15 px-1 py-0.5 text-[9px] font-bold text-gold uppercase tracking-wider">
                      Pro
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 text-xs text-cream/60 hover:text-coral transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className={cn(linkClass("/login"), "flex items-center gap-1.5")}>
                  <LogIn size={15} />
                  Sign In
                </Link>
                <Button href="/onboarding" variant="primary" className="min-h-[38px] py-1 px-4 text-xs tracking-wide shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:scale-102">
                  Get Started Free
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {isLoggedIn && user ? (
              <Link href="/app/profile" className="mr-3 flex items-center justify-center rounded-full border border-white/10 p-0.5 bg-white/5">
                <AvatarIcon id={user.avatarId} size={28} />
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-cream/80 hover:bg-white/5 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={22} className="text-gold animate-rotate" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen ? (
        <div className="border-t border-white/5 bg-forest md:hidden animate-slide-down">
          <div className="space-y-1 px-3 pb-4 pt-3">
            <Link
              href={coursesPath}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                isLinkActive(coursesPath) ? "bg-white/10 text-gold" : "hover:bg-white/5 text-cream/90"
              )}
            >
              Browse Courses
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  href={dashboardPath}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    isLinkActive(dashboardPath) ? "bg-white/10 text-gold" : "hover:bg-white/5 text-cream/90"
                  )}
                >
                  Learning Dashboard
                </Link>
                <Link
                  href="/app/profile"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    pathname === "/app/profile" ? "bg-white/10 text-gold" : "hover:bg-white/5 text-cream/90"
                  )}
                >
                  My Profile
                </Link>
              </>
            ) : null}

            <Link
              href={scamRadarPath}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-base font-medium transition-colors text-coral",
                isLinkActive(scamRadarPath) ? "bg-white/10 font-bold" : "hover:bg-white/5"
              )}
            >
              Scam Radar
            </Link>

            <div className="my-3 border-t border-white/5" />

            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleSignOut();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-cream/60 hover:bg-coral/10 hover:text-coral transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            ) : (
              <div className="space-y-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-center text-base font-medium border border-white/10 hover:bg-white/5 text-cream/90 transition-colors"
                >
                  Sign In
                </Link>
                <Button
                  href="/onboarding"
                  variant="primary"
                  className="w-full justify-center shadow-md shadow-gold/5"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started Free
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

