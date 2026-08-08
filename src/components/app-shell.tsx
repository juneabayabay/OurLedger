"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, PRODUCT_NAME, WORKSPACE_LABEL } from "@/lib/nav";

function NavLinks({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
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

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-1 bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-navy text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-lg font-semibold tracking-tight">{PRODUCT_NAME}</p>
          <p className="mt-1 text-xs text-white/60">{WORKSPACE_LABEL}</p>
        </div>
        <div className="flex-1 px-3 py-4">
          <NavLinks />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
          <div>
            <p className="text-sm font-semibold text-navy">{PRODUCT_NAME}</p>
            <p className="text-xs text-muted">{WORKSPACE_LABEL}</p>
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
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        ) : null}

        {/* Desktop workspace strip */}
        <div className="hidden border-b border-border bg-surface px-6 py-3 md:block">
          <p className="text-sm text-muted">
            Workspace ·{" "}
            <span className="font-medium text-navy">{WORKSPACE_LABEL}</span>
          </p>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
