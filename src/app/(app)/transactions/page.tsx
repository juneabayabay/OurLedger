import {
  accounts,
  household,
  transactions,
  type Transaction,
} from "@/lib/mock-data";

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function memberName(memberId: string): string {
  return (
    household.members.find((member) => member.id === memberId)?.displayName ??
    "Unknown"
  );
}

function accountName(accountId: string): string {
  return accounts.find((account) => account.id === accountId)?.name ?? "Account";
}

function amountLabel(txn: Transaction): string {
  const formatted = formatMoney(txn.amount);
  return txn.type === "income" ? `+${formatted}` : `−${formatted}`;
}

export default function TransactionsPage() {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date));
  const incomeTotal = transactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
  const expenseTotal = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Our Financial Activity
      </h1>
      <p className="mt-2 text-base text-muted">
        Income and expenses for {household.workspaceName}.
      </p>

      <div className="mt-6 flex flex-wrap gap-6 text-sm">
        <p>
          <span className="text-muted">Income</span>{" "}
          <span className="font-semibold text-emerald">
            +{formatMoney(incomeTotal)}
          </span>
        </p>
        <p>
          <span className="text-muted">Expenses</span>{" "}
          <span className="font-semibold text-navy">
            −{formatMoney(expenseTotal)}
          </span>
        </p>
      </div>

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {sorted.map((txn) => (
          <li
            key={txn.id}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="min-w-0">
              <p className="font-medium text-navy">{txn.description}</p>
              <p className="mt-0.5 text-sm text-muted">
                {txn.category} · {memberName(txn.memberId)} ·{" "}
                {accountName(txn.accountId)}
              </p>
              <p className="mt-0.5 text-sm text-muted sm:hidden">
                {formatDate(txn.date)}
              </p>
            </div>
            <div className="flex shrink-0 items-baseline justify-between gap-4 sm:flex-col sm:items-end">
              <p
                className={`text-base font-semibold tabular-nums ${
                  txn.type === "income" ? "text-emerald" : "text-navy"
                }`}
              >
                {amountLabel(txn)}
              </p>
              <p className="hidden text-sm text-muted sm:block">
                {formatDate(txn.date)}
              </p>
              <p
                className={`text-xs font-medium uppercase tracking-wide sm:hidden ${
                  txn.type === "income" ? "text-emerald" : "text-muted"
                }`}
              >
                {txn.type}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
