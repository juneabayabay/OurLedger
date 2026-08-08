import Link from "next/link";
import { household } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";

export function AuthBrand({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <p className="text-center text-3xl font-semibold tracking-tight text-navy">
          {PRODUCT_NAME}
        </p>
        <p className="mt-2 text-center text-base text-muted">{household.tagline}</p>
        <p className="mt-1 text-center text-sm text-muted">
          {household.workspaceName}
        </p>

        <h1 className="mt-10 text-center text-xl font-semibold text-navy">
          {title}
        </h1>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function AuthField({
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  required = false,
  spellCheck,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  spellCheck?: boolean;
}) {
  return (
    <label className="block text-sm" htmlFor={id}>
      <span className="font-medium text-navy">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        spellCheck={spellCheck}
        className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-navy outline-none focus:border-emerald"
      />
    </label>
  );
}

export function AuthFooterLink({
  prompt,
  href,
  label,
}: {
  prompt: string;
  href: string;
  label: string;
}) {
  return (
    <p className="mt-6 text-center text-sm text-muted">
      {prompt}{" "}
      <Link href={href} className="font-medium text-emerald hover:underline">
        {label}
      </Link>
    </p>
  );
}
