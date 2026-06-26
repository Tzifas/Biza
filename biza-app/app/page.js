import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/lib/data";
import { 
  ArrowRight, 
  ShieldCheck, 
  Map, 
  TrendingUp, 
  CheckCircle, 
  Video,
  Award,
  AlertTriangle,
  Briefcase,
  Play,
  ShoppingBag,
  Code,
  Database,
  BarChart
} from "lucide-react";

const iconMap = {
  "content-creation": Video,
  "freelancing-services": Briefcase,
  "ecommerce-selling": ShoppingBag,
  "marketing-traffic": BarChart,
  "software-tech": Code,
  "data-ai-ops": Database,
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-forest text-white py-20 md:py-28 relative overflow-hidden">
          {/* Diagonal abstract lines for design accent */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white rotate-12"></div>
            <div className="absolute top-0 left-2/4 w-[1px] h-full bg-white rotate-12"></div>
            <div className="absolute top-0 left-3/4 w-[1px] h-full bg-white rotate-12"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-leaf/20 border border-leaf/30 rounded-full px-4 py-1.5 text-gold text-xs font-semibold uppercase tracking-wider">
                  <SparklesIcon className="w-3.5 h-3.5" />
                  Now Live in Kenya
                </div>
                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                  Learn how online money <span className="text-gold">actually works</span>.
                </h1>
                <p className="text-lg text-[#9FC4A8] max-w-xl leading-relaxed">
                  No hype. No get-rich-quick scams. Get verified, step-by-step 7-step roadmaps for legitimate online income models optimized for the Kenyan context.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/courses" className="btn-pill-primary text-base px-8 flex items-center gap-2">
                    Start Learning Free
                    <ArrowRight size={18} />
                  </Link>
                  <Link href="/courses?join=pro" className="btn-pill-outline border-white/20 text-white hover:border-white flex items-center gap-2">
                    Explore Pro Pass
                  </Link>
                </div>
              </div>

              {/* Visual Card / Preview Widget */}
              <div className="lg:col-span-5">
                <div className="bg-white text-ink border border-border-custom rounded-2xl p-6 shadow-xl space-y-5 relative animate-fade-in">
                  {/* Compass mark label */}
                  <div className="flex items-center justify-between border-b border-border-custom pb-4">
                    <span className="text-xs font-semibold text-[#888] uppercase tracking-wider">Active roadmap</span>
                    <span className="text-xs bg-success-bg text-success-text px-2.5 py-0.5 rounded-full font-medium">Free Access</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl text-forest">Affiliate Marketing</h3>
                    <p className="text-xs text-[#555]">Earn commissions recommending global services.</p>
                  </div>

                  {/* 7 step process preview dots */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest text-gold text-[10px] flex items-center justify-center font-bold">1</div>
                      <div className="text-xs font-semibold">Understand the Model <span className="text-[#888] font-normal">(Free)</span></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-forest text-gold text-[10px] flex items-center justify-center font-bold">2</div>
                      <div className="text-xs font-semibold">Requirements & Setup <span className="text-[#888] font-normal">(Free)</span></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cream text-[#888] border border-border-custom text-[10px] flex items-center justify-center font-bold">3</div>
                      <div className="text-xs text-[#888]">How Money Flows <span className="font-normal text-rose-500">(Pro Locked)</span></div>
                    </div>
                  </div>

                  <div className="bg-cream border border-border-custom rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFEBEB] text-[#A32D2D] flex items-center justify-center flex-shrink-0">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#A32D2D]">Anti-Scam Alert</h4>
                      <p className="text-[10px] text-[#555] leading-normal">Legitimate affiliate programs never charge entry fees. Guard your money.</p>
                    </div>
                  </div>

                  <Link href="/courses/affiliate-marketing" className="w-full bg-forest text-white text-xs font-semibold py-3 rounded-full flex items-center justify-center gap-1.5 hover:bg-leaf transition-colors">
                    Try this roadmap
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature section: Why Biza? */}
        <section className="py-20 bg-[#FAF9F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-forest">
                What makes Biza different?
              </h2>
              <p className="text-[#555] text-sm md:text-base leading-relaxed">
                We bridge the gap between digital ambition and actual, practical achievement through a specialized layout format.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white border border-border-custom rounded-2xl p-6 space-y-4">
                <div className="w-12 h-12 bg-success-bg text-success-text rounded-xl flex items-center justify-center">
                  <Map size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-forest">7-Step Roadmaps Only</h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  Every single course follows the exact same logical journey. You don't have to wade through fragmented, bloated videos. Follow the map.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-border-custom rounded-2xl p-6 space-y-4">
                <div className="w-12 h-12 bg-warning-bg text-warning-text rounded-xl flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-forest">Built-in Scam Radar</h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  We expose the dark side of every model: red flags, fee traps, and Gurus. Our goal is to ensure you save your money before earning.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-border-custom rounded-2xl p-6 space-y-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-xl flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <h3 className="font-display font-bold text-lg text-forest">Kenya-Optimized</h3>
                <p className="text-xs text-[#555] leading-relaxed">
                  We verify payments (M-Pesa support, bank wire), local tax requirements, and platforms that accept Kenyan identity verifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div className="space-y-3">
                <span className="text-xs font-bold text-leaf uppercase tracking-wider">Choose your path</span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-forest">
                  Explore income categories
                </h2>
              </div>
              <Link href="/courses" className="text-sm font-bold text-leaf hover:text-forest flex items-center gap-1">
                View all roadmaps
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const IconComponent = iconMap[cat.id] || Briefcase;
                return (
                  <div key={cat.id} className="flat-card p-6 flex flex-col justify-between min-h-[220px]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white" 
                          style={{ backgroundColor: cat.color }}
                        >
                          <IconComponent size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-success-text bg-success-bg px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {cat.badge}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-lg text-forest">{cat.name}</h3>
                        <p className="text-xs text-[#555] leading-relaxed">{cat.description}</p>
                      </div>
                    </div>
                    <div className="pt-6">
                      <Link 
                        href={`/courses?category=${cat.slug}`}
                        className="text-xs font-bold text-forest flex items-center gap-1 hover:text-leaf"
                      >
                        Explore roadmaps
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Anti-Scam Callout Section */}
        <section className="py-16 bg-[#FCEBEB] border-y border-[#F9D2D2]">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <div className="inline-flex w-14 h-14 bg-white text-[#A32D2D] rounded-full items-center justify-center shadow-sm">
              <AlertTriangle size={28} />
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#A32D2D]">
              Tired of get-rich-quick scams?
            </h2>
            <p className="text-xs md:text-sm text-[#A32D2D]/90 max-w-2xl mx-auto leading-relaxed">
              If an online job asks you to pay an "activation fee", "package fee", or "upgrade fee" to write articles, transcribe files, or watch videos, it is a scam. Biza provides honest roadmaps outlining true startup costs, timelines, and verified platforms.
            </p>
            <div>
              <Link href="/scam-warnings" className="inline-flex items-center gap-2 bg-[#A32D2D] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-red-800 transition-colors">
                Read our Scam Warning Guides
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" />
    </svg>
  );
}
