"use client";

import { useActionState } from "react";
import { loginAction, type AuthActionState } from "@/lib/auth/actions";
import { AuthField } from "@/components/auth-brand";

function AuthFeedback({ state }: { state: AuthActionState }) {
  if (!state?.error && !state?.message) return null;

  if (state.error) {
    return (
      <p
        className="border border-amber/25 bg-amber-soft px-3.5 py-2.5 text-sm text-amber"
        role="alert"
      >
        {state.error}
      </p>
    );
  }

  return (
    <p
      className="border border-emerald/25 bg-emerald-soft px-3.5 py-2.5 text-sm text-emerald"
      role="status"
    >
      {state.message}
    </p>
  );
}

export function LoginForm({
  variant = "default",
}: {
  variant?: "default" | "onLight";
}) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form className="space-y-5" action={formAction} noValidate>
      <AuthFeedback state={state} />
      <AuthField
        id="login"
        label="Household login"
        type="text"
        autoComplete="username"
        placeholder="Enter household login"
        required
        spellCheck={false}
      />
      <AuthField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter password"
        required
      />
      <button
        type="submit"
        disabled={pending}
        className="mt-1 w-full bg-navy px-4 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
      {variant === "default" ? (
        <p className="text-center text-xs text-muted">
          One shared login for both of you. Spaces are allowed.
        </p>
      ) : null}
    </form>
  );
}
