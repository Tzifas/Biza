"use client";

import { SiteLayout } from "@/components/layouts/SiteLayout";
import { getCategories } from "@/lib/content";
import { Button, Card, Chip } from "@/components/ui";
import { getUser } from "@/lib/user/storage";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Code,
  Map,
  Megaphone,
  Package,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Video,
  Eye,
  CheckCircle,
  HelpCircle,
  BadgeCheck,
  BrainCog,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "cat-freelancing": Briefcase,
  "cat-content": Video,
  "cat-selling": ShoppingBag,
  "cat-digital": Package,
  "cat-marketing": Megaphone,
  "cat-tech": Code,
};

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activePreviewTab, setActivePreviewTab] = useState<number>(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user.onboardingComplete) {
      router.replace("/app");
    } else {
      setLoading(false);
    }
  }, [router]);

  const launchCategories = getCategories().map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    badge: cat.mvp ? "MVP live" : "Coming soon",
    mvp: cat.mvp,
  }));

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-forest text-cream">
        <div className="relative flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent" />
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold/80 animate-pulse">
            Biza
          </p>
        </div>
      </div>
    );
  }

  const syllabusPreview = [
    {
      n: 1,
      title: "Mindset Check & Truths",
      desc: "Why 99% of 'online jobs' in Kenya fail, and how to spot them.",
      isFree: true,
      alert: "Guru scam warning: Never pay to get a freelance account."
    },
    {
      n: 2,
      title: "How Money Flows (Margins)",
      desc: "Direct-to-consumer dropshipping economics explained simply.",
      isFree: true,
      alert: "Platform trap: Beware of fake supplier activation fees."
    },
    {
      n: 3,
      title: "Kenya Payments Setup",
      desc: "Setting up M-Pesa, Stripe, and Payoneer as a local learner.",
      isFree: false,
      alert: "PRO Feature: Complete guide to payment gateway integration."
    }
  ];

  return (
    <SiteLayout footer>
      <main className="flex-grow bg-forest text-cream overflow-hidden">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden pt-16 pb-24 text-white md:pt-24 md:pb-32"
          style={{ backgroundImage: `url('/hero_bg.png')`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {/* Neon Radial Gradient Accents */}
          <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-leaf/20 blur-[120px] opacity-60" />
          <div className="pointer-events-none absolute top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-gold/10 blur-[150px] opacity-50 animate-pulse-slow" />

          {/* Grid lines background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
              
              {/* Left Column - Hero Text */}
              <div className="space-y-8 lg:col-span-7 animate-fade-in-up">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex"
                >
                  <Chip variant="gold" className="border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold normal-case tracking-normal">
                    <Sparkles className="mr-1.5 inline h-3.5 w-3.5 animate-pulse text-gold" />
                    Learn it. Earn it.
                  </Chip>
                </motion.div>
                
                <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Learn exactly how <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-emerald-400">online money works</span>.
                </h1>

                <p className="max-w-xl text-lg leading-relaxed text-cream/80">
                  No hype. No get-rich-quick scams. Verified, chapter-based learning paths for legitimate online income — built for the Kenyan context.
                </p>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sm:w-auto"
                  >
                    <Button href="/onboarding" variant="primary" className="sm:w-auto group px-5 py-2.5 text-sm shadow-lg shadow-gold/20 hover:scale-102 hover:shadow-gold/30 transition-all duration-300">
                      Start Free
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 duration-200" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      href="/login"
                      variant="outline"
                      className="w-full sm:w-auto border-white/20 text-white hover:border-gold hover:bg-white/5 hover:text-gold transition-colors duration-300"
                    >
                      Open Dashboard
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Right Column - Interactive Preview Card */}
              <div className="lg:col-span-5 animate-fade-in animate-float duration-1000">
                <div className="glass-panel p-6 rounded-2xl relative shadow-2xl premium-glow-gold">
                  {/* Glowing tag */}
                  <div className="absolute -top-3 right-6">
                    <Chip variant="success" className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs">
                      Live Curriculum Preview
                    </Chip>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cream/70">
                        Course: Dropshipping
                      </span>
                    </div>
                    <span className="text-xs text-gold/80">3 Chapters</span>
                  </div>

                  {/* Interactive Tab Selectors */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {syllabusPreview.map((item, index) => (
                      <button
                        key={item.n}
                        onClick={() => {
                          setActivePreviewTab(index);
                          setShowAlert(true);
                        }}
                        className={cn(
                          "rounded-lg py-2 text-center text-xs font-semibold border transition-all duration-300",
                          activePreviewTab === index
                            ? "bg-gold text-forest border-transparent"
                            : "bg-white/5 border-white/5 hover:bg-white/10 text-cream/80"
                        )}
                      >
                        Chapter {item.n}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Panel */}
                  <div className="min-h-[140px] rounded-xl bg-forest/80 p-4 border border-white/5 space-y-3 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <h4 className="font-display text-sm font-bold text-cream">
                        {syllabusPreview[activePreviewTab].title}
                      </h4>
                      <Chip variant={syllabusPreview[activePreviewTab].isFree ? "default" : "gold"} className="text-[9px] px-1.5 py-0.5">
                        {syllabusPreview[activePreviewTab].isFree ? "Free" : "PRO"}
                      </Chip>
                    </div>
                    
                    <p className="text-xs text-cream/70 leading-relaxed">
                      {syllabusPreview[activePreviewTab].desc}
                    </p>

                    {/* Scam Alert Feature inside tab */}
                    <div className="flex items-start gap-2.5 rounded-lg bg-coral/10 border border-coral/20 p-3 text-[11px] leading-normal text-coral-light mt-2 animate-fade-in">
                      <AlertTriangle size={15} className="shrink-0 mt-0.5 text-coral" />
                      <div>
                        <span className="font-bold">Scam Alert Tip: </span>
                        {syllabusPreview[activePreviewTab].alert}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/10">
                    <Button
                      href="/onboarding"
                      variant="secondary"
                      className="w-full text-xs font-bold py-2.5 bg-white text-forest hover:bg-cream transition-all duration-300 shadow-md group"
                    >
                      Try Onboarding Flow
                      <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Story / Problem & Solution Section */}
        <section className="relative bg-forest border-y border-white/5 py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-cream/10 via-transparent to-cream/5 pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mx-auto mb-20 max-w-3xl space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                The Honest Approach
              </span>
              <h2 className="font-display text-3xl font-bold text-cream md:text-5xl">
                What makes Biza different?
              </h2>
              <p className="text-sm text-cream/70 md:text-base max-w-2xl mx-auto leading-relaxed">
                We aren't here to promise overnight riches. We're here to build lasting skills.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  icon: BadgeCheck,
                  title: "Verified Methods",
                  body: "Every course is based on income strategies already working for Kenyans today. No theoretical hype.",
                  iconClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20",
                },
                {
                  icon: BrainCog,
                  title: "Structured Learning",
                  body: "Move from zero to pro with step-by-step curriculums designed for high retention and actual implementation.",
                  iconClass: "bg-gold/10 text-gold border border-gold/20",
                },
                {
                  icon: Shield,
                  title: "Scam-Free Zone",
                  body: "Our built-in Scam Radar warns you about common traps before you lose your hard-earned money.",
                  iconClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20",
                },
              ].map((feature, idx) => (
                <div
                  key={feature.title}
                  className="glass-panel bg-forest/90 border border-forest/20 p-6 rounded-xl hover:scale-105 hover:border-forest/30 transition-all duration-300 flex flex-col items-center justify-between group text-center"
                >
                  <div className="space-y-4 flex flex-col items-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${feature.iconClass} transition-transform group-hover:scale-110`}
                      >
                      <feature.icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-cream">{feature.title}</h3>
                    <p className="text-xs leading-relaxed text-cream/70">{feature.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="bg-forest py-24 relative">
          <div className="pointer-events-none absolute bottom-0 left-[20%] h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Explore Pathways
                </span>
                <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
                  Curated Income Categories
                </h2>
              </div>
              <Link
                href="/onboarding"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-white transition-colors"
              >
                Get Started on Your Path
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {launchCategories.map((cat, idx) => {
                const Icon = iconMap[cat.id] ?? Briefcase;
                return (
                  <div
                    key={cat.id}
                    className="glass-panel p-6 rounded-xl flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-105 hover:border-white/10 hover:shadow-lg hover:shadow-black/20 group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gold group-hover:bg-gold group-hover:text-forest transition-all duration-300">
                          <Icon size={18} />
                        </div>
                        <Chip variant={cat.mvp ? "gold" : "default"} className="text-[10px] px-2 py-0.5">
                          {cat.badge}
                        </Chip>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display text-base font-bold text-cream group-hover:text-gold transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs leading-relaxed text-cream/70">{cat.description}</p>
                      </div>
                    </div>
                    <div className="pt-5 border-t border-white/5 mt-4">
                      <Link
                        href="/onboarding"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gold/90 hover:text-white transition-colors"
                      >
                        Enroll to study
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Anti-Scam Callout Banner */}
        <section
          className="relative overflow-hidden border-t border-white/5 bg-white py-20"
          style={{ backgroundImage: "url('/scam_bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-coral/5 via-transparent to-gold/5 pointer-events-none" />
          <div className="mx-auto max-w-4xl space-y-8 px-6 text-center relative z-10">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-coral/20 bg-coral/10 text-coral animate-pulse">
              <AlertTriangle size={32} />
            </div>
            
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-coral md:text-4xl">
                Tired of get-rich-quick scams?
              </h2>
              <p className="mx-auto max-w-2xl text-xs leading-relaxed text-gold/95 font-semibold md:text-sm">
                If a job, manager, or site asks you to pay a &quot;registration fee&quot;, &quot;materials deposit&quot;, or &quot;activation charge&quot; before you start earning — it is a scam. Biza breaks down real setup costs, timelines, and verified tools before you spend a single shilling.
              </p>
            </div>
            
            <div className="pt-2">
              <Button
                href="/scam-radar"
                variant="danger"
                className="px-7 py-3 text-xs font-bold tracking-wide uppercase shadow-md shadow-coral/20"
              >
                Read the Scam Radar
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

