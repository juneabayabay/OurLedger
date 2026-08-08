import { Cormorant_Garamond } from "next/font/google";
import { household } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";
import { LoginForm } from "@/components/auth-forms";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const FEATURES = [
  {
    title: "Shared goals",
    body: "Save together with grace — milestones, progress, and steady monthly giving.",
  },
  {
    title: "Budgets & activity",
    body: "See income and expenses in one calm room, with gentle check-ins not judgment.",
  },
  {
    title: "Accounts & insights",
    body: "Balances, reports, and supportive notes so you walk one financial path.",
  },
] as const;

function GraceMark() {
  return (
    <div className="relative mx-auto h-28 w-28 login-ray" aria-hidden="true">
      <div className="login-glow absolute inset-x-8 top-0 h-full rounded-full bg-gradient-to-b from-sky/50 via-sky/15 to-transparent blur-md" />
      <svg
        viewBox="0 0 96 96"
        className="relative h-full w-full text-sky-soft/90"
        fill="none"
      >
        <path
          d="M48 8v80"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M28 34h40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.95"
        />
        <circle cx="48" cy="48" r="30" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path
          d="M22 72c8-10 18-16 26-16s18 6 26 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div
      className={`${display.variable} relative flex min-h-full flex-1 overflow-hidden bg-navy text-sky-soft`}
    >
      {/* Atmospheric blue field */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(90,140,190,0.45), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(21,42,71,0.9), transparent), linear-gradient(165deg, #0b1f3a 0%, #123052 45%, #0b1f3a 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(180,210,235,0.9) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center lg:gap-16 lg:px-10 lg:py-16">
        {/* Meaning panel */}
        <section className="login-rise flex-1 text-center lg:text-left">
          <GraceMark />
          <p
            className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {PRODUCT_NAME}
          </p>
          <p className="mt-3 text-lg text-sky-soft/90 sm:text-xl">
            {household.tagline}
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-sky-soft/75 mx-auto lg:mx-0">
            Built for two walking one path — by grace, toward shared goals.
            Enter your household login to open {household.workspaceName}, then
            choose who is here today.
          </p>

          <ul className="login-rise-delay mt-8 space-y-4 text-left mx-auto max-w-lg lg:mx-0">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium text-white">{feature.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-sky-soft/70">
                    {feature.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Login interaction */}
        <section className="login-rise-delay-2 w-full max-w-md mx-auto lg:mx-0 lg:w-[26rem] shrink-0">
          <div className="rounded-lg border border-white/15 bg-white/95 p-6 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-8">
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-navy">
              Enter in grace
            </h1>
            <p className="mt-2 text-sm text-muted">
              One shared household login. Spaces are welcome.
            </p>
            <div className="mt-6">
              <LoginForm variant="onLight" />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-sky-soft/60 lg:text-left">
            After you log in, each of you can choose who is using Our Ledger —
            then every feature is ready.
          </p>
        </section>
      </div>
    </div>
  );
}
