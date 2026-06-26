"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, courses } from "@/lib/data";
import { 
  Clock, 
  Wallet, 
  Smartphone, 
  Map, 
  Filter, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Search
} from "lucide-react";
import { useState, Suspense } from "react";

function CoursesCatalog() {
  const searchParams = useSearchParams();
  const catFilter = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");

  // Get active category if filter matches
  const activeCategory = categories.find(c => c.slug === catFilter);

  // Filter courses based on query parameters and search query
  const filteredCourses = courses.filter(course => {
    const matchesCat = !catFilter || course.categoryId === activeCategory?.id;
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header block */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-leaf uppercase tracking-wider">
              <Map size={14} />
              Educational Roadmaps
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-forest">
              {activeCategory ? `${activeCategory.name} Roadmaps` : "All Learning Roadmaps"}
            </h1>
            <p className="text-[#555] text-sm max-w-2xl leading-relaxed">
              Explore step-by-step paths designed for legitimate digital income. Select a roadmap to understand requirements, platform integrations, scam cautions, and action plans.
            </p>
          </div>

          {/* Filters and Search Bar Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar Categories Filters */}
            <div className="lg:col-span-3 bg-white border border-border-custom rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 border-b border-border-custom pb-3">
                <Filter size={14} />
                Filter by Category
              </h2>
              
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/courses"
                  className={`text-xs px-3 py-2.5 rounded-lg font-medium transition-all flex items-center justify-between ${
                    !catFilter 
                      ? "bg-forest text-white" 
                      : "text-[#555] hover:bg-cream hover:text-forest"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                    {courses.length}
                  </span>
                </Link>

                {categories.map((cat) => {
                  const courseCount = courses.filter(c => c.categoryId === cat.id).length;
                  const isActive = catFilter === cat.slug;
                  return (
                    <Link
                      key={cat.id}
                      href={`/courses?category=${cat.slug}`}
                      className={`text-xs px-3 py-2.5 rounded-lg font-medium transition-all flex items-center justify-between ${
                        isActive 
                          ? "bg-forest text-white" 
                          : "text-[#555] hover:bg-cream hover:text-forest"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-cream text-[#888]"}`}>
                        {courseCount}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Courses Listing */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Search Bar Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888]">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search income roadmaps (e.g. dropshipping, Upwork...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-border-custom text-xs rounded-full pl-10 pr-4 py-3.5 text-ink focus:outline-none focus:border-leaf transition-colors focus:ring-1 focus:ring-leaf"
                />
              </div>

              {/* Grid of Courses */}
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => {
                    const isFree = course.tier === "free";
                    return (
                      <div key={course.id} className="flat-card p-6 flex flex-col justify-between min-h-[260px] bg-white">
                        <div className="space-y-4">
                          {/* Top Row: Tier badge & Details */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-[#888] uppercase tracking-wider">
                              7 steps
                            </span>
                            <span 
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                isFree 
                                  ? "bg-success-bg text-success-text" 
                                  : "bg-warning-bg text-warning-text"
                              }`}
                            >
                              {isFree ? "Free" : "Pro"}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-display font-bold text-lg text-forest leading-snug">
                              {course.title}
                            </h3>
                            <p className="text-xs text-[#555] leading-relaxed line-clamp-2">
                              {course.description}
                            </p>
                          </div>
                        </div>

                        {/* Meta Specifications */}
                        <div className="border-t border-border-custom pt-4 mt-6 space-y-2.5">
                          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#555]">
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} className="text-leaf" />
                              <span>{course.timeToIncome}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Wallet size={12} className="text-leaf" />
                              <span>{course.capitalRequired}</span>
                            </div>
                            <div className="flex items-center gap-1.5 col-span-2">
                              <Smartphone size={12} className="text-leaf" />
                              <span>{course.deviceRequired} required</span>
                            </div>
                          </div>

                          {/* Try Roadmap CTA */}
                          <div className="pt-2">
                            <Link 
                              href={`/courses/${course.slug}`}
                              className="w-full bg-cream text-forest text-xs font-bold py-3 rounded-full flex items-center justify-center gap-1 hover:bg-forest hover:text-white transition-all border border-border-custom"
                            >
                              View Roadmap
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-border-custom rounded-2xl p-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-cream text-[#888] rounded-full flex items-center justify-center mx-auto">
                    <ShieldAlert size={24} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-forest">No roadmaps found</h3>
                  <p className="text-xs text-[#555] max-w-sm mx-auto">
                    We currently don't have active course roadmaps matching your search query. Try filtering by another category.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest"></div>
      </div>
    }>
      <CoursesCatalog />
    </Suspense>
  );
}
