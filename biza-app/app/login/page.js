"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate auth success and redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 bg-[#FAF9F5]">
        <div className="bg-white border border-border-custom rounded-2xl w-full max-w-md p-8 space-y-6 shadow-sm">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="font-display font-bold text-2xl text-forest">
              {isLoginMode ? "Welcome Back to Biza" : "Create Your Account"}
            </h1>
            <p className="text-xs text-[#888]">
              {isLoginMode ? "Sign in to continue your roadmap learning path." : "Start learning legitimate online income categories."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. James Mwangi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-cream border border-border-custom text-xs rounded-full px-4 py-3.5 text-ink focus:outline-none focus:border-leaf"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. james.mwangi@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-cream border border-border-custom text-xs rounded-full px-4 py-3.5 text-ink focus:outline-none focus:border-leaf"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-cream border border-border-custom text-xs rounded-full px-4 py-3.5 text-ink focus:outline-none focus:border-leaf"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gold text-forest hover:opacity-90 transition-opacity text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5"
            >
              <span>{isLoginMode ? "Sign In" : "Sign Up"}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-between text-xs text-[#888] my-4">
            <span className="w-full h-[1px] bg-border-custom"></span>
            <span className="px-3 whitespace-nowrap">or continue with</span>
            <span className="w-full h-[1px] bg-border-custom"></span>
          </div>

          {/* Google OAuth Simulation Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-white border border-border-custom hover:bg-cream text-forest text-xs font-semibold py-3.5 rounded-full flex items-center justify-center gap-2"
          >
            <Globe size={16} className="text-forest" />
            <span>Continue with Google</span>
          </button>

          {/* Toggle login modes */}
          <div className="text-center pt-2">
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs text-leaf font-bold hover:text-forest focus:outline-none"
            >
              {isLoginMode ? "New to Biza? Register Now" : "Already have an account? Sign In"}
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
