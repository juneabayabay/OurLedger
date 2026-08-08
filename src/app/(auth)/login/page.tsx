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

          <LoginAngel className="absolute -right-4 top-10 h-40 w-32 text-sky-soft opacity-40 sm:right-6 sm:top-16 sm:h-48 sm:w-40 sm:opacity-50" />

          <div className="login-rise relative z-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky/90">
              Private household workspace
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
            </ol>
          </div>
        </section>

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
      </div>
    </div>
  );
}
