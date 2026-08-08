import {
  AuthBrand,
  AuthField,
  AuthFooterLink,
} from "@/components/auth-brand";

export default function SignupPage() {
  return (
    <AuthBrand title="Create your shared ledger">
      <form className="space-y-4" action="#">
        <AuthField
          id="display-name"
          label="Your display name"
          autoComplete="nickname"
          placeholder="Maya"
        />
        <AuthField
          id="partner-name"
          label="Partner display name"
          autoComplete="off"
          placeholder="Noah"
        />
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
          autoComplete="new-password"
          placeholder="••••••••"
        />
        <button
          type="button"
          className="w-full rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white"
        >
          Sign up
        </button>
        <p className="text-center text-xs text-muted">
          Branding only for now — authentication comes later.
        </p>
      </form>
      <AuthFooterLink
        prompt="Already have an account?"
        href="/login"
        label="Log in"
      />
    </AuthBrand>
  );
}
