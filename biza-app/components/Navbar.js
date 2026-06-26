"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Compass, LogIn, ShieldAlert, GraduationCap, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-forest text-white border-b border-forest/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Compass B Logo Mark Concept in SVG/CSS */}
              <div className="relative w-9 h-9 bg-forest rounded-lg border border-gold flex items-center justify-center overflow-hidden flex-shrink-0">
                <span className="font-display font-bold text-lg text-gold z-10 select-none">B</span>
                {/* Diagonal compass needle */}
                <div className="absolute w-[2px] h-[36px] bg-white rotate-45 transform origin-center z-0">
                  <div className="absolute top-0 left-[-3px] w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight tracking-wide text-white group-hover:text-gold transition-colors">Biza</span>
                <span className="text-[10px] text-[#9FC4A8] font-sans tracking-wider leading-none">Learn it. Earn it.</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/courses" className="text-sm font-medium hover:text-gold transition-colors">
              Browse Courses
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-gold transition-colors flex items-center gap-1.5">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link href="/scam-warnings" className="text-sm font-medium hover:text-gold transition-colors text-rose-300 flex items-center gap-1.5">
              <ShieldAlert size={16} />
              Scam Radar
            </Link>
            
            <div className="h-4 w-[1px] bg-white/20"></div>

            <Link href="/login" className="text-sm font-medium hover:text-gold transition-colors flex items-center gap-1.5">
              <LogIn size={16} />
              Sign In
            </Link>
            <Link href="/courses?join=pro" className="bg-gold text-forest text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
              Get Pro Pass
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-forest/80 focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? <X size={24} className="text-gold" /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu, slide-down */}
      {isOpen && (
        <div className="md:hidden bg-forest border-t border-white/10 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-gold"
            >
              Browse Courses
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-gold"
            >
              Dashboard
            </Link>
            <Link
              href="/scam-warnings"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-rose-300 hover:bg-white/10 hover:text-gold"
            >
              Scam Radar
            </Link>
            
            <div className="border-t border-white/10 my-2"></div>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 hover:text-gold"
            >
              Sign In
            </Link>
            <Link
              href="/courses?join=pro"
              onClick={() => setIsOpen(false)}
              className="block text-center mt-4 bg-gold text-forest text-base font-bold py-2.5 px-4 rounded-full"
            >
              Get Pro Pass
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
