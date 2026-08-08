import {
  AuthBrand,
  AuthField,
  AuthFooterLink,
} from "@/components/auth-brand";

export default function LoginPage() {
  return (
    <AuthBrand title="Welcome back">
      <form className="space-y-4" action="#">
        <AuthField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
        />
        <button
          type="button"
          className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white"
        >
          Log in
        </button>
        <p className="text-center text-xs text-muted">
          Branding only for now — authentication comes later.
        </p>
      </form>
      <AuthFooterLink
        prompt="New to Our Ledger?"
        href="/signup"
        label="Create an account"
      />
    </AuthBrand>
  );
}
