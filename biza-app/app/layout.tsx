import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1A3A2A",
};

export const metadata: Metadata = {
  title: "Biza — Learn it. Earn it.",
  description: "Legitimate online income roadmaps and scam warnings for young Kenyans.",
  metadataBase: new URL("https://getbiza.co.ke"),
  icons: {
    icon: [{ url: "/B-B[1].png", type: "image/png" }],
    apple: [{ url: "/B-B[1].png", type: "image/png" }],
  },
  openGraph: {
    title: "Biza — Learn it. Earn it.",
    description: "Legitimate online income roadmaps and scam warnings for young Kenyans.",
    siteName: "Biza",
    locale: "en_KE",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
