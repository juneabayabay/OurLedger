import { accounts, household } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function memberName(memberId?: string): string | null {
  if (!memberId) return null;
  return (
    household.members.find((member) => member.id === memberId)?.displayName ??
    null
  );
}

function typeLabel(type: (typeof accounts)[number]["type"]): string {
  switch (type) {
    case "checking":
      return "Checking";
    case "savings":
      return "Savings";
    case "credit":
      return "Credit";
    case "cash":
      return "Cash";
  }
}

export default function AccountsPage() {
  const sharedTotal = accounts
    .filter((account) => account.scope === "shared")
    .reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Accounts
      </h1>
      <p className="mt-2 text-base text-muted">
        Shared and personal balances in {household.workspaceName} · {PRODUCT_NAME}
      </p>

      <p className="mt-6 text-sm text-muted">
        Shared net{" "}
        <span className="font-semibold tabular-nums text-navy">
          {formatMoney(sharedTotal)}
        </span>
      </p>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {accounts.map((account) => {
          const owner = memberName(account.ownerMemberId);
          const isCredit = account.type === "credit";
          return (
            <li
              key={account.id}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-navy">{account.name}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {typeLabel(account.type)} · {account.institution} ·{" "}
                  {account.scope === "shared"
                    ? "Shared"
                    : `Personal${owner ? ` · ${owner}` : ""}`}
                </p>
              </div>
              <p
                className={`text-base font-semibold tabular-nums ${
                  isCredit ? "text-amber" : "text-navy"
                }`}
              >
                {formatMoney(account.balance)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
