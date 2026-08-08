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
        label="Household login"
        type="text"
        autoComplete="username"
        placeholder="Spaces are allowed"
        required
        spellCheck={false}
      />
      <AuthField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Spaces are allowed"
        required
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Opening Our Money Room…" : "Log in"}
      </button>
      <p className="text-center text-xs text-muted">
        One shared login for both of you. Spaces in the login and password are
        allowed. After you sign in, choose who is using the app on the dashboard.
      </p>
    </form>
  );
}
