import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

type SiteLayoutProps = {
  children: ReactNode;
  /** Footer is landing-page only per product UX. */
  footer?: boolean;
};

/** Public pages — top Navbar. Footer only when `footer` is true (homepage). No bottom tab bar. */
export function SiteLayout({ children, footer = false }: SiteLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col">{children}</div>
      {footer ? <Footer /> : null}
    </>
  );
}
