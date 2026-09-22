"use client";

import { useActionState, useState } from "react";
import { loginAction, type AuthActionState } from "@/lib/auth/actions";
import { DEFAULT_HOUSEHOLD_CREDENTIALS } from "@/lib/household-constants";

function AuthFeedback({ state }: { state: AuthActionState }) {
  if (!state?.error && !state?.message) return null;

  if (state.error) {
    return (
      <div
        className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger-soft/60 px-3.5 py-3 text-sm text-danger"
        role="alert"
      >
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-danger"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 7.5h.008v.008H12v-.008Z"
          />
        </svg>
        <p className="leading-snug">{state.error}</p>
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-2.5 rounded-xl border border-emerald/30 bg-emerald-soft/60 px-3.5 py-3 text-sm text-emerald"
      role="status"
    >
      <svg
        className="mt-0.5 h-4 w-4 shrink-0 text-emerald"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p className="leading-snug">{state.message}</p>
    </div>
  );
}

export function LoginForm({
  variant = "default",
}: {
  variant?: "default" | "onLight";
} = {}) {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [filledNotice, setFilledNotice] = useState(false);

  const handleAutoFill = () => {
    setLogin(DEFAULT_HOUSEHOLD_CREDENTIALS.login);
    setPassword(DEFAULT_HOUSEHOLD_CREDENTIALS.password);
    setFilledNotice(true);
    setTimeout(() => setFilledNotice(false), 2500);
  };

  return (
    <div className="space-y-5">
      {/* Quick Demo Credentials Box */}
      <div className="rounded-xl border border-sky/25 bg-sky-soft/45 p-3.5 transition-colors">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-navy">
            <svg
              className="h-4 w-4 text-sky"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
            <span>Demo Credentials</span>
          </div>

          <button
            type="button"
            onClick={handleAutoFill}
            className="inline-flex items-center gap-1 rounded-lg bg-navy px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-navy-soft active:scale-95"
          >
            {filledNotice ? "✓ Filled!" : "Auto-fill demo"}
          </button>
        </div>

        <div className="mt-2 text-[11px] leading-relaxed text-muted">
          <p>
            <span className="font-medium text-navy">Login:</span>{" "}
            <code className="rounded bg-white/70 px-1 py-0.5 text-navy">
              {DEFAULT_HOUSEHOLD_CREDENTIALS.login}
            </code>
          </p>
          <p className="mt-1">
            <span className="font-medium text-navy">Password:</span>{" "}
            <code className="rounded bg-white/70 px-1 py-0.5 text-navy">
              {DEFAULT_HOUSEHOLD_CREDENTIALS.password}
            </code>
          </p>
        </div>
      </div>

      <form className="space-y-4" action={formAction} noValidate>
        <AuthFeedback state={state} />

        {/* Household Login Field */}
        <div>
          <label
            htmlFor="login"
            className="block text-xs font-semibold uppercase tracking-wider text-navy"
          >
            Household Login
          </label>
          <div className="relative mt-1.5">
            <input
              id="login"
              name="login"
              type="text"
              autoComplete="username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="e.g. We are the child of God"
              required
              spellCheck={false}
              className="w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm text-navy shadow-xs transition-colors placeholder:text-muted/45 focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
            />
          </div>
          <p className="mt-1 text-[11px] text-muted">
            The shared name or passphrase for your household.
          </p>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-navy"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs font-medium text-sky transition-colors hover:text-navy"
              tabIndex={-1}
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>
          </div>
          <div className="relative mt-1.5">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-xl border border-border bg-white px-3.5 py-3 pr-11 text-sm text-navy shadow-xs transition-colors placeholder:text-muted/45 focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted/70 transition-colors hover:text-navy"
            >
              {showPassword ? (
                /* Eye Off Icon */
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.75"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                /* Eye Icon */
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.75"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-1 text-[11px] text-muted">
            Spaces are allowed. Default passphrase has spaces.
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={pending}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-navy-soft active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Signing in…</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {variant === "default" ? (
          <p className="text-center text-xs text-muted">
            One shared login for both of you. Spaces are allowed.
          </p>
        ) : null}
      </form>
    </div>
  );
}
