"use client";

import { SiteLayout } from "@/components/layouts/SiteLayout";
import { Button, Card, Input } from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthErrorInfo = { code?: string; status?: number };
type AuthFormProps = { mode: "login" | "signup" };

function authErrorMessage(error: unknown, login: boolean) {
  const { code, status } = (error ?? {}) as AuthErrorInfo;
  if (code === "weak_password") return "Choose a stronger password.";
  if (code === "email_address_invalid") return "Enter a valid email address.";
  if (code === "email_not_confirmed") return "Confirm your email using the link we sent, then sign in.";
  if (code === "over_email_send_rate_limit" || code === "over_request_rate_limit" || status === 429) {
    return "Too many attempts. Wait a moment and try again.";
  }
  if (login && code === "invalid_credentials") return "Invalid email or password.";
  return login ? "Something went wrong. Please try again." : "Unable to create your account. Please try again.";
}

function getNextPath() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next === "/onboarding" || next?.startsWith("/app/") || next === "/app" ? next : "/app";
}

export function AuthForm({ mode }: AuthFormProps) {
  const isLoginMode = mode === "login";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      if (isLoginMode) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (signInError) throw signInError;
        router.replace(getNextPath());
        router.refresh();
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: { display_name: name.trim() },
        },
      });
      if (signUpError) throw signUpError;

      if (data.session) {
        router.replace("/onboarding");
        router.refresh();
      } else {
        setNotice("Check your inbox for a confirmation link. Once confirmed, sign in to continue.");
      }
    } catch (caught) {
      setError(authErrorMessage(caught, isLoginMode));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <main className="flex flex-grow items-center justify-center bg-cream px-4 py-16">
        <Card hover={false} className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="font-display text-2xl font-bold text-forest">
              {isLoginMode ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-stone">
              {isLoginMode ? "Sign in to continue your learning path." : "Start with honest roadmaps—no hype."}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode ? (
              <Input label="Full name" required minLength={2} maxLength={80} autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
            ) : null}
            <Input label="Email address" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input label="Password" type="password" required minLength={8} autoComplete={isLoginMode ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} />
            {error ? <p className="text-sm text-coral" role="alert">{error}</p> : null}
            {notice ? <p className="text-sm text-leaf" role="status">{notice}</p> : null}
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Please wait…" : isLoginMode ? "Sign in" : "Create account"}
              <ArrowRight size={14} />
            </Button>
          </form>
          <div className="text-center">
            <Link
              href={isLoginMode ? "/register" : "/login"}
              className="inline-flex min-h-11 items-center px-4 py-2 text-sm font-semibold text-leaf hover:text-forest"
            >
              {isLoginMode ? "New to Biza? Create an account" : "Already have an account? Sign in"}
            </Link>
          </div>
        </Card>
      </main>
    </SiteLayout>
  );
}
