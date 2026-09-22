import { household } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";
import { LoginForm } from "@/components/auth-forms";

export default function LoginPage() {
  return (
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

        {/* Main Card */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-navy">Sign In</h2>
            <p className="mt-1 text-xs text-muted">
              Enter your shared household credentials to access your ledger.
            </p>
          </div>

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
        </div>

        {/* Calm Privacy Notice */}
        <p className="mt-6 text-center text-xs text-muted/70">
          Private & local household finance workspace.
        </p>
      </div>
    </main>
  );
}
