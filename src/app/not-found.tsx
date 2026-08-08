import Link from "next/link";
import { household } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <p className="text-3xl font-semibold tracking-tight text-navy">
        {PRODUCT_NAME}
      </p>
      <p className="mt-2 text-base text-muted">{household.tagline}</p>
      <h1 className="mt-8 text-2xl font-semibold text-navy">
        This page is not in Our Money Room
      </h1>
      <p className="mt-2 max-w-md text-base text-muted">
        No stress — that path may have moved or never existed. Let us head back
        to somewhere familiar.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 rounded-md bg-navy px-4 py-2.5 text-sm font-medium text-white"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
