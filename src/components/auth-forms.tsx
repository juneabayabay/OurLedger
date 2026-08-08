"use client";

import { useActionState } from "react";
import { loginAction, type AuthActionState } from "@/lib/auth/actions";
import { AuthField } from "@/components/auth-brand";

function AuthFeedback({ state }: { state: AuthActionState }) {
  if (!state?.error && !state?.message) return null;

  if (state.error) {
    return (
      <p
        className="rounded-md border border-amber/30 bg-amber-soft px-3 py-2 text-sm text-amber"
        role="alert"
      >
        {state.error}
      </p>
    );
  }

  return (
    <p
      className="rounded-md border border-emerald/30 bg-emerald-soft px-3 py-2 text-sm text-emerald"
      role="status"
    >
      {state.message}
    </p>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form className="space-y-4" action={formAction}>
      <AuthFeedback state={state} />
      <AuthField
        id="email"
        label="Household email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />
      <AuthField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Signing you in…" : "Log in"}
      </button>
      <p className="text-center text-xs text-muted">
        One shared login for Our Money Room. After you sign in, each of you can
        choose who is using the app on the dashboard.
      </p>
    </form>
  );
}
