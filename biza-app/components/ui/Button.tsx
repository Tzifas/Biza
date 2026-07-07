"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "px-5 py-2.5 text-sm font-semibold bg-gold text-ink hover:bg-gold/90 border border-transparent shadow-sm hover:shadow-md",
  secondary:
    "px-5 py-2.5 text-sm font-semibold bg-forest text-cream hover:bg-leaf border border-transparent shadow-sm hover:shadow-md",
  outline:
    "px-5 py-2.5 text-sm font-semibold bg-transparent text-forest border border-forest hover:bg-leaf-light shadow-sm",
  ghost:
    "px-5 py-2.5 text-sm font-semibold bg-transparent text-forest border border-border hover:border-forest hover:bg-cream",
  danger:
    "px-5 py-2.5 text-sm font-semibold bg-coral text-white hover:opacity-90 border border-transparent shadow-sm hover:shadow-md",
};

const baseStyles =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-pill font-display transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:pointer-events-none disabled:opacity-50";

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="flex items-center justify-center gap-2 w-full h-full"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cn(baseStyles, variantStyles[variant], className);
}
