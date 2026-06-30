import { logos } from "@/lib/design/tokens";
import { cn } from "@/lib/utils/cn";

export type LogoVariant = "nav" | "nav-light" | "onboarding" | "brandmark";

const logoSources: Record<LogoVariant, string> = {
  nav: logos.nav,
  "nav-light": logos.navLight,
  onboarding: logos.onboarding,
  brandmark: logos.brandmark,
};

export type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

export function Logo({ variant = "nav", className }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoSources[variant]}
      alt="Biza — Learn it. Earn it."
      className={cn(
        "h-8 w-auto object-contain",
        variant === "onboarding" && "h-12",
        className
      )}
      height={variant === "onboarding" ? 48 : 32}
    />
  );
}
