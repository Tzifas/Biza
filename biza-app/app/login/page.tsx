"use client";

import { SiteLayout } from "@/components/layouts/SiteLayout";
import { Button, Card, Input } from "@/components/ui";
import { ArrowRight, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  return (
    <SiteLayout>
      <main className="flex flex-grow items-center justify-center bg-cream py-16">
        <Card hover={false} className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="font-display text-2xl font-bold text-forest">
              {isLoginMode ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-xs text-stone">
              {isLoginMode
                ? "Sign in to continue your learning path."
                : "Start with honest roadmaps — no hype."}
            </p>
            <p className="text-[10px] text-stone/80">
              Auth goes live in Phase 2. This form routes to onboarding UI (demo).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode ? (
              <Input
                label="Full name"
                required
                placeholder="e.g. James Mwangi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            ) : null}
            <Input
              label="Email address"
              type="email"
              required
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Button type="submit" variant="primary" className="w-full">
              {isLoginMode ? "Sign in" : "Sign up"}
              <ArrowRight size={14} />
            </Button>
          </form>

          <div className="flex items-center gap-3 text-xs text-stone">
            <span className="h-px flex-1 bg-border" />
            or continue with
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={() => router.push("/onboarding")}>
            <Globe size={16} />
            Continue with Google (demo)
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs font-semibold text-leaf hover:text-forest"
            >
              {isLoginMode ? "New to Biza? Register" : "Already have an account? Sign in"}
            </button>
          </div>
        </Card>
      </main>
    </SiteLayout>
  );
}
