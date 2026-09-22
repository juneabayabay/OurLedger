import { household, type Transaction } from "@/lib/mock-data";
import { getAccounts, getTransactions } from "@/lib/data-store";
import { getActiveMember } from "@/lib/member-session";
import { EmptyState } from "@/components/ui-states";
import { AddTransactionModal } from "@/components/add-transaction-modal";
import { DeleteTransactionButton } from "@/components/delete-transaction-button";

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

function amountLabel(txn: Transaction): string {
  const formatted = formatMoney(txn.amount);
  return txn.type === "income" ? `+${formatted}` : `−${formatted}`;
}

export default async function TransactionsPage() {
  const [transactionsList, accountsList, activeMember] = await Promise.all([
    getTransactions(),
    getAccounts(),
    getActiveMember(),
  ]);

  const sorted = [...transactionsList].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  const incomeTotal = transactionsList
    .filter((txn) => txn.type === "income")
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  const expenseTotal = transactionsList
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  const netTotal = incomeTotal - expenseTotal;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Top Header with Add Transaction Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
            Our Financial Activity
          </h1>
          <p className="mt-1 text-base text-muted">
            Income and expenses for {household.workspaceName}.
          </p>
        </div>

        <AddTransactionModal
          accounts={accountsList}
          members={household.members}
          defaultMemberId={activeMember?.id}
        />
      </div>

      {/* Summary Stat Cards */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Total Income
          </p>
          <p className="mt-1 text-xl font-bold tabular-nums text-emerald">
            +{formatMoney(incomeTotal)}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Total Expenses
          </p>
          <p className="mt-1 text-xl font-bold tabular-nums text-navy">
            −{formatMoney(expenseTotal)}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Net Cashflow
          </p>
          <p
            className={`mt-1 text-xl font-bold tabular-nums ${
              netTotal >= 0 ? "text-emerald" : "text-danger"
            }`}
          >
            {netTotal >= 0 ? "+" : "−"}
            {formatMoney(netTotal)}
          </p>
        </div>
      </div>

      {/* Transactions List */}
      {sorted.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No activity yet"
            description="When shared income and expenses arrive, they'll show up here gently — click 'Add Transaction' to log your first entry."
          />
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Recent Transactions ({sorted.length})
            </h2>
            <span className="text-xs text-muted">Sorted by date</span>
          </div>

          <ul className="divide-y divide-border">
            {sorted.map((txn) => {
              const account = accountsList.find((a) => a.id === txn.accountId);
              return (
                <li
                  key={txn.id}
                  className="group flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 transition-colors hover:bg-background/40"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-navy">{txn.description}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      <span className="inline-block rounded-md bg-background px-1.5 py-0.5 font-medium text-navy/80">
                        {txn.category}
                      </span>{" "}
                      · {memberName(txn.memberId)} · {account?.name ?? "Account"}
                    </p>
                    <p className="mt-1 text-xs text-muted sm:hidden">
                      {formatDate(txn.date)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                    <div className="text-right">
                      <p
                        className={`text-base font-semibold tabular-nums ${
                          txn.type === "income" ? "text-emerald" : "text-navy"
                        }`}
                      >
                        {amountLabel(txn)}
                      </p>
                      <p className="hidden text-xs text-muted sm:block">
                        {formatDate(txn.date)}
                      </p>
                    </div>

                    <DeleteTransactionButton
                      id={txn.id}
                      description={txn.description}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
