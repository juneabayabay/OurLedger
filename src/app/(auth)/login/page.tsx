import { Cormorant_Garamond } from "next/font/google";
import { household } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";
import { LoginForm } from "@/components/auth-forms";
import { LoginAngel } from "@/components/login-angel";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const FEATURES = [
  {
    title: "Shared goals",
    body: "Track milestones and monthly contributions together.",
  },
  {
    title: "Budgets & activity",
    body: "See income and spending with calm, clear check-ins.",
  },
  {
    title: "Accounts & insights",
    body: "Balances, reports, and guidance in one private room.",
  },
] as const;

export default function LoginPage() {
  return (
    <div
      className={`${display.variable} relative flex min-h-full flex-1 bg-[#f5f7fa]`}
    >
      {/* Full-height professional split */}
      <div className="relative z-10 mx-auto grid min-h-full w-full lg:grid-cols-2">
        {/* Brand column */}
        <section className="relative flex flex-col justify-between overflow-hidden bg-navy px-8 py-10 text-sky-soft sm:px-12 sm:py-12 lg:px-14 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 0% 0%, rgba(90,140,190,0.22), transparent 55%), linear-gradient(165deg, #0b1f3a 0%, #122845 100%)",
            }}
          />
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center bg-[#f7f5f1] px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white shadow-md shadow-navy/10 ring-1 ring-white/20">
            {/* Vault / Ledger Icon */}
            <svg
              className="h-7 w-7 text-emerald-soft"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>

          <LoginAngel className="absolute -right-4 top-10 h-40 w-32 text-sky-soft opacity-40 sm:right-6 sm:top-16 sm:h-48 sm:w-40 sm:opacity-50" />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {PRODUCT_NAME}
          </h1>
          <p className="mt-1 text-sm font-medium text-emerald">
            {household.workspaceName}
          </p>
          <p className="mt-0.5 text-xs text-muted">
            {household.tagline}
          </p>
        </div>

          <div className="login-rise relative z-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky/90">
              Private household workspace
        {/* Main Card */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-navy">Sign In</h2>
            <p className="mt-1 text-xs text-muted">
              Enter your shared household credentials to access your ledger.
            </p>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              {PRODUCT_NAME}
            </h1>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-sky-soft/85">
              {household.tagline}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sky-soft/65">
              Steward money together with clarity and grace — one shared login,
              then each of you chooses who is here.
            </p>
          </div>

          <div className="login-rise-delay relative z-10 mt-12 border-t border-white/10 pt-8 lg:mt-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky/75">
              {household.workspaceName}
            </p>
            <ol className="mt-5 space-y-5">
              {FEATURES.map((feature, index) => (
                <li key={feature.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-[family-name:var(--font-display)] text-lg text-sky/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {feature.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-sky-soft/60">
                      {feature.body}
                    </p>
                  </div>
                </li>
              ))}
          <LoginForm />

          {/* Simple Explanation / How it works */}
          <div className="mt-6 border-t border-border pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
              How it works
            </h3>
            <ol className="mt-2.5 space-y-2 text-xs text-muted">
              <li className="flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy/10 text-[10px] font-semibold text-navy">
                  1
                </span>
                <span>Both of you use this single household login.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-navy/10 text-[10px] font-semibold text-navy">
                  2
                </span>
                <span>
                  Next, select who you are (Maya or Noah) to see personal and
                  shared money.
                </span>
              </li>
            </ol>
          </div>
        </section>
        </div>

        {/* Sign-in column */}
        <section className="login-rise-delay-2 relative flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-[26rem]">
            <div className="mb-8">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-navy">
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Use your shared household credentials. Spaces are allowed in
                both fields.
              </p>
            </div>

            <LoginForm variant="onLight" />

            <div className="mt-8 border-t border-border pt-5">
              <p className="text-xs leading-relaxed text-muted">
                After sign-in, select who is using the app. All features unlock
                once a person is chosen.
              </p>
            </div>
          </div>
        </section>
        {/* Calm Privacy Notice */}
        <p className="mt-6 text-center text-xs text-muted/70">
          Private & local household finance workspace.
        </p>
      </div>
    </div>
    </main>
  );
}
