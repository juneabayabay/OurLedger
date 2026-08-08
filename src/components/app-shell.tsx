"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutAction } from "@/lib/auth/actions";
import { NAV_ITEMS, PRODUCT_NAME, WORKSPACE_LABEL } from "@/lib/nav";

function NavLinks({
  onNavigate,
  featuresEnabled,
}: {
  onNavigate?: () => void;
  featuresEnabled: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        const isDashboard = item.href === "/dashboard";
        const locked = !featuresEnabled && !isDashboard;

        if (locked) {
          return (
            <span
              key={item.href}
              className="cursor-not-allowed rounded-md px-3 py-2 text-sm font-medium text-white/35"
              title="Choose who you are on the dashboard first"
            >
              {item.label}
            </span>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-emerald-soft text-emerald"
                : "text-white/80 hover:bg-navy-soft hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  children,
  activeMemberName,
}: {
  children: React.ReactNode;
  activeMemberName: string | null;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const featuresEnabled = Boolean(activeMemberName);

  useEffect(() => {
    if (!featuresEnabled && pathname !== "/dashboard") {
      router.replace("/dashboard");
    }
  }, [featuresEnabled, pathname, router]);

  return (
    <div className="flex min-h-full flex-1 bg-background">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-lg font-semibold tracking-tight">{PRODUCT_NAME}</p>
          <p className="mt-1 text-xs text-white/60">{WORKSPACE_LABEL}</p>
          <p className="mt-3 text-sm text-white/80">
            {activeMemberName
              ? `Using as ${activeMemberName}`
              : "Choose who you are"}
          </p>
        </div>
        <div className="flex-1 px-3 py-4">
          <NavLinks featuresEnabled={featuresEnabled} />
        </div>
        <div className="border-t border-white/10 px-3 py-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-white/70 hover:bg-navy-soft hover:text-white"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
          <div>
            <p className="text-sm font-semibold text-navy">{PRODUCT_NAME}</p>
            <p className="text-xs text-muted">
              {activeMemberName
                ? `Using as ${activeMemberName}`
                : WORKSPACE_LABEL}
            </p>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-navy"
          >
            {open ? "Close" : "Menu"}
          </button>
        </header>

        {open ? (
          <div
            id="mobile-nav"
            className="border-b border-border bg-navy px-3 py-3 md:hidden"
          >
            <NavLinks
              featuresEnabled={featuresEnabled}
              onNavigate={() => setOpen(false)}
            />
            <form action={logoutAction} className="mt-3 px-3">
              <button
                type="submit"
                className="text-sm font-medium text-white/80"
              >
                Log out
              </button>
            </form>
          </div>
        ) : null}

        <div className="hidden border-b border-border bg-surface px-6 py-3 md:block">
          <p className="text-sm text-muted">
            Workspace ·{" "}
            <span className="font-medium text-navy">{WORKSPACE_LABEL}</span>
            {activeMemberName ? (
              <>
                {" "}
                · Using as{" "}
                <span className="font-medium text-navy">{activeMemberName}</span>
              </>
            ) : null}
          </p>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
