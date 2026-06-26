"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/lib/data";
import { 
  Clock, 
  Wallet, 
  Smartphone, 
  Map, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  Play,
  ShieldCheck,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

export default function CourseRoadmapPage() {
  const params = useParams();
  const slug = params.slug;

  // Find course matching the slug
  const course = courses.find(c => c.slug === slug);

  // States for accordion expand/collapse
  const [expandedStep, setExpandedStep] = useState(1); // Default first step expanded
  
  // State for mock progress tracking
  const [completedSteps, setCompletedSteps] = useState([1]);
  
  // State for simulating Pro tier upgrade
  const [isProUser, setIsProUser] = useState(false);

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-24">
          <div className="text-center space-y-4">
            <h2 className="font-display font-bold text-2xl text-forest">Roadmap not found</h2>
            <p className="text-xs text-[#555]">The requested course roadmap does not exist.</p>
            <Link href="/courses" className="btn-pill-primary text-xs">
              Back to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Toggle step completion
  const toggleComplete = (stepNum, e) => {
    e.stopPropagation();
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNum));
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
    }
  };

  const progressPercentage = Math.round((completedSteps.length / 7) * 100);

  return (
    <>
      <Navbar />

      {/* Simulator bar to test Free vs Pro locking */}
      <div className="bg-[#FEF8E1] border-b border-[#F5C842] py-2 px-4 text-center text-xs text-[#633806] flex items-center justify-center gap-3">
        <span className="font-semibold flex items-center gap-1">
          <AlertTriangle size={14} className="text-[#854F0B]" />
          Demo Mode:
        </span>
        <span>You are currently viewing as a <strong>{isProUser ? "PRO User" : "FREE User"}</strong>.</span>
        <button 
          onClick={() => setIsProUser(!isProUser)} 
          className="bg-forest text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-leaf transition-colors"
        >
          Switch to {isProUser ? "FREE Version" : "PRO Version"}
        </button>
      </div>

      <main className="flex-grow">
        {/* Course Header Hero */}
        <section className="bg-forest text-white py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="text-xs text-[#9FC4A8] flex items-center gap-1.5">
              <Link href="/courses" className="hover:text-gold transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-white">{course.title}</span>
            </div>
            
            <h1 className="font-display font-bold text-2xl md:text-3xl leading-snug tracking-tight">
              {course.title}
            </h1>

            {/* Meta tags details grid */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-xs text-[#9FC4A8]">
              <span className="flex items-center gap-1.5">
                <Map size={14} className="text-gold" />
                7 steps roadmap
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-gold" />
                {course.timeToIncome} to first income
              </span>
              <span className="flex items-center gap-1.5">
                <Wallet size={14} className="text-gold" />
                {course.capitalRequired}
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone size={14} className="text-gold" />
                {course.deviceRequired}
              </span>
            </div>
          </div>
        </section>

        {/* Course layout grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: The 7 steps list */}
            <div className="lg:col-span-8 space-y-4">
              
              {course.steps.map((step) => {
                const isStepLocked = step.stepNumber > 2 && !isProUser;
                const isExpanded = expandedStep === step.stepNumber;
                const isCompleted = completedSteps.includes(step.stepNumber);

                return (
                  <div 
                    key={step.stepNumber} 
                    className={`bg-white border rounded-xl overflow-hidden transition-all ${
                      isStepLocked 
                        ? "border-border-custom opacity-70" 
                        : isExpanded 
                          ? "border-forest ring-1 ring-forest" 
                          : "border-border-custom hover:border-forest/50"
                    }`}
                  >
                    {/* Header trigger */}
                    <div 
                      onClick={() => !isStepLocked && setExpandedStep(isExpanded ? null : step.stepNumber)}
                      className={`flex items-center justify-between p-4 cursor-pointer select-none ${
                        isStepLocked ? "cursor-not-allowed bg-cream/30" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Step circle indicator */}
                        {isStepLocked ? (
                          <div className="w-6 h-6 rounded-full bg-cream border border-border-custom text-[#888] flex items-center justify-center">
                            <Lock size={12} />
                          </div>
                        ) : (
                          <button
                            onClick={(e) => toggleComplete(step.stepNumber, e)}
                            className="focus:outline-none"
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-leaf fill-success-bg" />
                            ) : (
                              <Circle className="w-6 h-6 text-[#888] hover:text-forest" />
                            )}
                          </button>
                        )}
                        <span className={`text-xs font-semibold uppercase tracking-wider ${isStepLocked ? "text-[#888]" : "text-[#555]"}`}>
                          Step {step.stepNumber}: {step.title}
                        </span>
                      </div>

                      {/* Expand / Lock states icons */}
                      <div>
                        {isStepLocked ? (
                          <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Pro locked
                          </span>
                        ) : isExpanded ? (
                          <ChevronUp size={18} className="text-forest" />
                        ) : (
                          <ChevronDown size={18} className="text-[#888]" />
                        )}
                      </div>
                    </div>

                    {/* Step expand body */}
                    {isExpanded && !isStepLocked && (
                      <div className="p-4 border-t border-border-custom space-y-4">
                        
                        {/* Body description text */}
                        <p className="text-xs text-[#555] leading-relaxed">
                          {step.bodyText}
                        </p>

                        {/* Platform tags */}
                        {step.platforms && step.platforms.length > 0 && (
                          <div className="space-y-1.5 pt-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Verified Platforms</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {step.platforms.map((p, idx) => (
                                <span key={idx} className="text-[10px] font-semibold bg-success-bg text-success-text px-3 py-1 rounded-full">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Video section */}
                        {step.video && (
                          <div className="pt-4 border-t border-border-custom space-y-3">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Curated video tutorial</h4>
                            
                            {/* Privacy-enhanced YouTube Iframe player mock */}
                            <div className="relative aspect-video w-full bg-forest/5 border border-border-custom rounded-xl overflow-hidden flex items-center justify-center">
                              {/* Using youtube-nocookie embed */}
                              <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube-nocookie.com/embed/${step.video.youtubeId}`}
                                title={step.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                            <div className="flex items-start gap-2 text-[10px] text-[#555] italic bg-cream p-2.5 rounded-lg">
                              <HelpCircle size={14} className="text-forest mt-0.5 flex-shrink-0" />
                              <div>
                                <strong>Admin Note:</strong> {step.video.note}
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                    {/* Locked step fallback screen */}
                    {isStepLocked && isExpanded && (
                      <div className="p-6 border-t border-border-custom bg-cream/20 text-center space-y-4">
                        <div className="w-10 h-10 bg-warning-bg text-warning-text rounded-full flex items-center justify-center mx-auto">
                          <Lock size={18} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-display font-bold text-sm text-forest">Unlock Steps 3–7</h3>
                          <p className="text-[11px] text-[#555] max-w-sm mx-auto leading-normal">
                            This step is locked. Upgrade to Biza Pro Pass to get lifetime access to all 7-step roadmaps, verified platforms list, and scam caution logs.
                          </p>
                        </div>
                        <div>
                          <button 
                            onClick={() => setIsProUser(true)}
                            className="bg-gold text-forest text-xs font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                          >
                            Upgrade for KES 1,500/mo
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            {/* Right side: Sidebar widgets */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Progress bar card */}
              <div className="bg-white border border-border-custom rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Your Progress</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#888] font-medium">{completedSteps.length} of 7 steps</span>
                    <span className="font-bold text-forest">{progressPercentage}%</span>
                  </div>
                  {/* Outer track */}
                  <div className="w-full bg-cream rounded-full h-2 overflow-hidden">
                    {/* Inner fill */}
                    <div 
                      className="bg-leaf h-2 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Requirements widget */}
              <div className="bg-white border border-border-custom rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Course Specifications</h3>
                
                <div className="divide-y divide-border-custom text-xs">
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-[#888]">Timeline:</span>
                    <span className="font-semibold text-forest">{course.timeToIncome}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-[#888]">Startup Capital:</span>
                    <span className="font-semibold text-forest">{course.capitalRequired}</span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-[#888]">Primary Device:</span>
                    <span className="font-semibold text-forest">{course.deviceRequired}</span>
                  </div>
                </div>
              </div>

              {/* Scam caution widget */}
              <div className="bg-white border border-border-custom rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle size={14} />
                  Scam Caution Board
                </h3>
                
                <div className="space-y-3 text-[11px] text-[#555] leading-relaxed">
                  <div className="flex gap-2 bg-rose-50/50 p-3 border border-[#F9D2D2] rounded-xl">
                    <AlertTriangle size={16} className="text-[#A32D2D] flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Zero Entry Payouts:</strong> Never accept contracts asking you to pay any registration deposits via M-Pesa.
                    </p>
                  </div>
                  <div className="flex gap-2 bg-rose-50/50 p-3 border border-[#F9D2D2] rounded-xl">
                    <AlertTriangle size={16} className="text-[#A32D2D] flex-shrink-0 mt-0.5" />
                    <p>
                      <strong>Outside Communication:</strong> Clients offering direct work outside Escrow via Telegram are scams.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
