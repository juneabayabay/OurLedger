import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/nav";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-md border border-dashed border-border bg-surface px-5 py-8 text-center">
      <p className="text-base font-medium text-navy">{title}</p>
      <p className="mt-2 text-sm text-muted">{description}</p>
      {actionHref && actionLabel ? (
        <p className="mt-4">
          <Link
            href={actionHref}
            className="text-sm font-medium text-emerald hover:underline"
          >
            {actionLabel}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export function LoadingState({
  label = "Gathering your shared picture…",
}: {
  label?: string;
}) {
  return (
    <div
      className="mx-auto w-full max-w-3xl"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p className="text-sm font-medium text-navy">{PRODUCT_NAME}</p>
      <p className="mt-2 text-base text-muted">{label}</p>
      <div className="mt-8 space-y-4" aria-hidden="true">
        <div className="h-8 w-2/3 animate-pulse rounded-md bg-border" />
        <div className="h-4 w-full animate-pulse rounded-md bg-border" />
        <div className="h-4 w-5/6 animate-pulse rounded-md bg-border" />
        <div className="mt-6 space-y-3">
          <div className="h-14 animate-pulse rounded-md bg-border/80" />
          <div className="h-14 animate-pulse rounded-md bg-border/80" />
          <div className="h-14 animate-pulse rounded-md bg-border/80" />
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function ErrorMessage({
  title = "Something paused for a moment",
  description = "No worries — we can try again when you're ready. Your shared space is still here.",
  onRetry,
  retryLabel = "Try again",
  homeHref = "/dashboard",
  homeLabel = "Back to dashboard",
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  homeHref?: string;
  homeLabel?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <p className="text-sm font-medium text-navy">{PRODUCT_NAME}</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-navy">
        {title}
      </h1>
      <p className="mt-2 text-base text-muted">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white"
          >
            {retryLabel}
          </button>
        ) : null}
        <Link
          href={homeHref}
          className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-navy"
        >
          {homeLabel}
        </Link>
      </div>
    </div>
  );
}
