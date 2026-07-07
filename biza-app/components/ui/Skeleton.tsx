"use client";

import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      className="rounded-lg border border-border bg-white p-5 space-y-3"
    >
      <div className="h-4 bg-stone/10 rounded w-3/4" />
      <div className="h-3 bg-stone/5 rounded w-full" />
      <div className="h-3 bg-stone/5 rounded w-5/6" />
    </motion.div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
          className={`h-3 bg-stone/10 rounded ${i === lines - 1 ? "w-5/6" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      className="h-12 w-12 rounded-full bg-stone/10"
    />
  );
}

export function PageLoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="h-10 w-10 border-2 border-forest border-t-transparent rounded-full"
      />
    </div>
  );
}
