import { household, reportMonths } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function ReportsPage() {
  const latest = reportMonths[reportMonths.length - 1];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Reports
      </h1>
      <p className="mt-2 text-base text-muted">
        A calm look at income, spending, and saving for {household.workspaceName}.
      </p>
      <p className="mt-1 text-sm text-muted">{PRODUCT_NAME}</p>

      {latest ? (
        <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <p>
            <span className="text-muted">This month income</span>
            <br />
            <span className="font-semibold tabular-nums text-emerald">
              {formatMoney(latest.income)}
            </span>
          </p>
          <p>
            <span className="text-muted">This month expenses</span>
            <br />
            <span className="font-semibold tabular-nums text-navy">
              {formatMoney(latest.expenses)}
            </span>
          </p>
          <p>
            <span className="text-muted">This month saved</span>
            <br />
            <span className="font-semibold tabular-nums text-emerald">
              {formatMoney(latest.saved)}
            </span>
          </p>
        </div>
      ) : null}

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {reportMonths.map((month) => {
          const net = month.income - month.expenses;
          return (
            <li
              key={month.id}
              className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-navy">{month.label}</p>
                <p className="mt-0.5 text-sm text-muted">
                  Income {formatMoney(month.income)} · Expenses{" "}
                  {formatMoney(month.expenses)} · Saved{" "}
                  {formatMoney(month.saved)}
                </p>
              </div>
              <p
                className={`text-sm font-semibold tabular-nums ${
                  net >= 0 ? "text-emerald" : "text-amber"
                }`}
              >
                Net {formatMoney(net)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
