"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses } from "@/lib/data";
import { 
  Trophy, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Clock,
  CheckCircle,
  Play,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  // Mock active user profile data
  const [userProfile, setUserProfile] = useState({
    name: "James Mwangi",
    avatar: "JM",
    email: "james.mwangi@gmail.com",
    tier: "free", // free vs pro
  });

  // State to simulate M-Pesa STK Push popup
  const [showSTKPopup, setShowSTKPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("0712345678");
  const [stkStatus, setStkStatus] = useState("idle"); // idle, sending, prompt-sent, success

  // Start checkout simulation
  const handleUpgradeCheckout = (e) => {
    e.preventDefault();
    setStkStatus("sending");
    
    // Simulate Daraja API STK Push delay
    setTimeout(() => {
      setStkStatus("prompt-sent");
      
      // Simulate user entering M-Pesa PIN
      setTimeout(() => {
        setStkStatus("success");
        setUserProfile(prev => ({ ...prev, tier: "pro" }));
      }, 4000);
      
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow py-12 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Welcome User Banner */}
          <div className="bg-forest text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-xs text-[#9FC4A8] font-bold uppercase tracking-wider">Student Console</span>
              <h1 className="font-display font-bold text-2xl md:text-3xl">
                Jambo, {userProfile.name}!
              </h1>
              <p className="text-sm text-[#9FC4A8] max-w-md">
                Track your progress, view credentials, and review scam prevention reports from your learning panel.
              </p>
            </div>
            
            {/* Membership badge */}
            <div className="flex-shrink-0 relative z-10">
              {userProfile.tier === "pro" ? (
                <div className="bg-gold/20 border border-gold/40 text-gold rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Biza Pro Member
                </div>
              ) : (
                <button 
                  onClick={() => setShowSTKPopup(true)}
                  className="bg-gold text-forest hover:opacity-90 transition-opacity font-bold text-xs px-6 py-3 rounded-full flex items-center gap-1"
                >
                  <Sparkles size={14} />
                  Upgrade to Pro Pass
                </button>
              )}
            </div>
            
            {/* Background design accents */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 translate-y-12"></div>
          </div>

          {/* Stats Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-border-custom rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-success-bg text-success-text flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-forest">2</div>
                <div className="text-[11px] text-[#888] font-medium uppercase tracking-wider">Enrolled Roadmaps</div>
              </div>
            </div>

            <div className="bg-white border border-border-custom rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-warning-bg text-warning-text flex items-center justify-center">
                <Trophy size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-forest">9 / 14</div>
                <div className="text-[11px] text-[#888] font-medium uppercase tracking-wider">Steps Completed</div>
              </div>
            </div>

            <div className="bg-white border border-border-custom rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-forest">0</div>
                <div className="text-[11px] text-[#888] font-medium uppercase tracking-wider">Reported Scams</div>
              </div>
            </div>
          </div>

          {/* Main layout: Enrolled Courses & Upgrades */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Enrolled roadmaps progress cards */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-sm font-bold text-forest uppercase tracking-wider">
                My Learning Progress
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Course 1 progress card */}
                <div className="bg-white border border-border-custom rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#888]">
                      <span>Marketing</span>
                      <span className="font-semibold text-leaf">85% Done</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-forest leading-snug">
                      Affiliate Marketing Roadmap
                    </h3>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden">
                      <div className="bg-leaf h-1.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <Link 
                      href="/courses/affiliate-marketing"
                      className="w-full bg-forest text-white text-xs font-semibold py-3 rounded-full flex items-center justify-center gap-1.5 hover:bg-leaf transition-colors"
                    >
                      Continue Step 6
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Course 2 progress card */}
                <div className="bg-white border border-border-custom rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#888]">
                      <span>Freelancing</span>
                      <span className="font-semibold text-leaf">43% Done</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-forest leading-snug">
                      Writing & Transcription
                    </h3>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="w-full bg-cream rounded-full h-1.5 overflow-hidden">
                      <div className="bg-leaf h-1.5 rounded-full" style={{ width: "43%" }}></div>
                    </div>
                    <Link 
                      href="/courses/writing-transcription"
                      className="w-full bg-forest text-white text-xs font-semibold py-3 rounded-full flex items-center justify-center gap-1.5 hover:bg-leaf transition-colors"
                    >
                      Continue Step 3
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* Right side checkups / payment triggers */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Membership pass upgrade visual */}
              {userProfile.tier !== "pro" && (
                <div className="bg-gradient-to-br from-forest to-[#1A3A2A]/90 text-white border border-border-custom rounded-2xl p-6 space-y-4 shadow-sm relative overflow-hidden">
                  <div className="space-y-1 relative z-10">
                    <span className="text-xs text-gold font-bold uppercase tracking-wider">Unrestricted Access</span>
                    <h3 className="font-display font-bold text-lg text-white">Unlock All Roadmaps</h3>
                    <p className="text-[11px] text-[#9FC4A8] leading-relaxed">
                      Upgrade to Biza Pro Pass today to unlock steps 3-7 on all roadmaps, download PDF graduation certificates, and access our vetted local tools registry.
                    </p>
                  </div>
                  <div className="pt-2 relative z-10">
                    <button 
                      onClick={() => setShowSTKPopup(true)}
                      className="w-full bg-gold text-forest text-xs font-bold py-3 rounded-full flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                      Unlock Pro Pass (KES 1,500/mo)
                    </button>
                  </div>
                </div>
              )}

              {/* Security alerts widget */}
              <div className="bg-white border border-border-custom rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={15} />
                  Active Security Alerts
                </h3>
                <p className="text-[11px] text-[#555] leading-relaxed">
                  We've received reports of scammers posing as Biza support on Telegram and requesting registration money. Biza support will <strong>never</strong> request cash via WhatsApp or Telegram.
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* M-Pesa STK push simulation dialog modal */}
      {showSTKPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-ink border border-border-custom rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => { setShowSTKPopup(false); setStkStatus("idle"); }} 
              className="absolute top-4 right-4 text-xs font-bold text-[#888] hover:text-ink focus:outline-none"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <h3 className="font-display font-bold text-lg text-forest">Safaricom M-Pesa STK Push</h3>
              <p className="text-xs text-[#555]">Upgrade to Pro Pass for lifetime roadmap learning access.</p>
            </div>

            {stkStatus === "idle" && (
              <form onSubmit={handleUpgradeCheckout} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#888]">M-Pesa Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 0712345678"
                    className="w-full bg-cream border border-border-custom text-xs rounded-full px-4 py-3 text-ink focus:outline-none focus:border-leaf"
                  />
                </div>

                <div className="bg-cream border border-border-custom rounded-xl p-4 divide-y divide-border-custom text-xs text-[#555]">
                  <div className="flex items-center justify-between pb-2">
                    <span>Upgrade Item:</span>
                    <span className="font-semibold text-forest">Pro Monthly subscription</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span>Total Cost:</span>
                    <span className="font-bold text-forest">KES 1,500</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gold text-forest text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5"
                >
                  Send STK Push
                </button>
              </form>
            )}

            {stkStatus === "sending" && (
              <div className="py-8 text-center space-y-4">
                {/* Custom CSS loader */}
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest mx-auto"></div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-forest">Sending STK Push...</h4>
                  <p className="text-[10px] text-[#888]">Contacting Safaricom Daraja API servers.</p>
                </div>
              </div>
            )}

            {stkStatus === "prompt-sent" && (
              <div className="py-8 text-center space-y-4">
                <div className="animate-bounce rounded-full h-8 w-8 bg-success-bg text-success-text flex items-center justify-center mx-auto text-xs font-bold">
                  PIN
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-forest">Check Your Mobile Phone!</h4>
                  <p className="text-[10px] text-[#555] max-w-xs mx-auto leading-normal">
                    We have dispatched an STK Push to <strong>{phoneNumber}</strong>. Please check your phone, enter your M-Pesa PIN, and authorize payment of KES 1,500.
                  </p>
                </div>
              </div>
            )}

            {stkStatus === "success" && (
              <div className="py-8 text-center space-y-4">
                <div className="w-10 h-10 rounded-full bg-success-bg text-success-text flex items-center justify-center mx-auto">
                  <CheckCircle size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-forest">Payment Received!</h4>
                  <p className="text-[10px] text-[#555] max-w-xs mx-auto leading-normal">
                    Your transaction has cleared successfully. Your Biza Pro Pass is now active.
                  </p>
                </div>
                <button
                  onClick={() => setShowSTKPopup(false)}
                  className="bg-forest text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-leaf transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
