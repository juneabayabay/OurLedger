"use client";

import { useActionState, useEffect, useState } from "react";
import {
  createTransactionAction,
  type TransactionActionState,
} from "@/lib/transaction-actions";
import type { Account, HouseholdMember } from "@/lib/mock-data";

const EXPENSE_CATEGORIES = [
  "Groceries",
  "Dining",
  "Utilities",
  "Housing & Rent",
  "Transport & Gas",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Personal Care",
  "Subscriptions",
  "Other",
];

const INCOME_CATEGORIES = [
  "Income",
  "Payroll",
  "Freelance",
  "Gifts",
  "Investment",
  "Refund",
  "Other",
];

export function AddTransactionModal({
  accounts,
  members,
  defaultMemberId,
}: {
  accounts: Account[];
  members: readonly HouseholdMember[];
  defaultMemberId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("Groceries");

  const [state, formAction, pending] = useActionState(
    async (prev: TransactionActionState, formData: FormData) => {
      const res = await createTransactionAction(prev, formData);
      if (res?.success) {
        setIsOpen(false);
        setType("expense");
        setCategory("Groceries");
      }
      return res;
    },
    null,
  );

  // Switch default category when type toggles
  const handleTypeChange = (newType: "expense" | "income") => {
    setType(newType);
    setCategory(newType === "expense" ? "Groceries" : "Income");
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-navy-soft active:scale-95"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span>Add Transaction</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-navy/40 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop click */}
          <div
            className="fixed inset-0"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-7">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-navy"
                >
                  Add Transaction
                </h2>
                <p className="mt-0.5 text-xs text-muted">
                  Log shared or personal spending and income.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-background hover:text-navy"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Error banner */}
            {state?.error && (
              <div
                className="mt-4 flex items-center gap-2 rounded-xl border border-danger/30 bg-danger-soft/60 px-3.5 py-2.5 text-xs text-danger"
                role="alert"
              >
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 7.5h.008v.008H12v-.008Z"
                  />
                </svg>
                <span>{state.error}</span>
              </div>
            )}

            <form action={formAction} className="mt-5 space-y-4">
              <input type="hidden" name="type" value={type} />

              {/* Type Switcher */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
                  Transaction Type
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background/50 p-1">
                  <button
                    type="button"
                    onClick={() => handleTypeChange("expense")}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                      type === "expense"
                        ? "bg-navy text-white shadow-xs"
                        : "text-muted hover:text-navy"
                    }`}
                  >
                    <span>− Expense</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange("income")}
                    className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                      type === "income"
                        ? "bg-emerald text-white shadow-xs"
                        : "text-muted hover:text-navy"
                    }`}
                  >
                    <span>+ Income</span>
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label
                  htmlFor="txn-amount"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  Amount
                </label>
                <div className="relative mt-1.5">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-semibold text-muted">
                    $
                  </span>
                  <input
                    id="txn-amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    required
                    className="w-full rounded-xl border border-border bg-white pl-8 pr-3.5 py-2.5 text-base font-semibold text-navy shadow-xs placeholder:text-muted/40 focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="txn-desc"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted"
                >
                  Description
                </label>
                <input
                  id="txn-desc"
                  name="description"
                  type="text"
                  placeholder={
                    type === "expense"
                      ? "e.g. Weekly grocery run"
                      : "e.g. Monthly salary deposit"
                  }
                  required
                  className="mt-1.5 w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-navy shadow-xs placeholder:text-muted/40 focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
                />
              </div>

              {/* Category & Account in 2 columns */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="txn-cat"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    Category
                  </label>
                  <select
                    id="txn-cat"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-navy shadow-xs focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="txn-account"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    Account
                  </label>
                  <select
                    id="txn-account"
                    name="accountId"
                    defaultValue={accounts[0]?.id}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-navy shadow-xs focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
                  >
                    {accounts.map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Paid By & Date in 2 columns */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="txn-member"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    {type === "expense" ? "Paid By" : "Received By"}
                  </label>
                  <select
                    id="txn-member"
                    name="memberId"
                    defaultValue={defaultMemberId || members[0]?.id}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-navy shadow-xs focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="txn-date"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    Date
                  </label>
                  <input
                    id="txn-date"
                    name="date"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-navy shadow-xs focus:border-navy focus:outline-hidden focus:ring-2 focus:ring-navy/15"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-navy"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-navy-soft disabled:opacity-60"
                >
                  {pending ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      <span>Saving…</span>
                    </>
                  ) : (
                    "Save Transaction"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

