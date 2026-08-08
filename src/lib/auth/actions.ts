"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export type AuthActionState = {
  error?: string;
  message?: string;
} | null;

function notConfiguredState(): AuthActionState {
  return {
    error:
      "Supabase is not set up yet. Copy .env.example to .env.local and add your project URL and publishable (anon) key — never a service-role key.",
  };
}

function supportiveAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
    return "That email or password did not match. Take another look and try again.";
  }
  if (lower.includes("password")) {
    return "Please choose a password that meets the minimum length, then try again.";
  }
  if (lower.includes("rate") || lower.includes("too many")) {
    return "A few too many attempts — pause a moment and try again shortly.";
  }
  return "Something paused during sign-in. You can try again when you are ready.";
}

/** Shared household login — create the account once in Supabase (no in-app signup). */
export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!getSupabasePublicEnv().isConfigured) {
    return notConfiguredState();
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Please enter both email and password to continue." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: supportiveAuthError(error.message) };
  }

  redirect("/dashboard");
}
