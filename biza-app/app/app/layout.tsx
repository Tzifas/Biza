import { AppShell } from "@/components/layouts/AppShell";
import type { ReactNode } from "react";

export default function AppRouteLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
