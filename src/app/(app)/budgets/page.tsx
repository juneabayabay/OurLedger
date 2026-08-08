import { budgets, household, type Budget } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui-states";

const ALERT_RATIO = 0.9;

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function usageRatio(budget: Budget): number {
  if (budget.limit <= 0) return 0;
  return budget.spent / budget.limit;
}

function needsAlert(budget: Budget): boolean {
  return usageRatio(budget) >= ALERT_RATIO;
}

function statusMessage(budget: Budget): string {
  const remaining = budget.limit - budget.spent;
  const ratio = usageRatio(budget);

  if (remaining < 0) {
    return "A little over this month — small adjustments together can bring it back.";
  }
  if (ratio >= ALERT_RATIO) {
    return "Getting close to your plan — a gentle check-in keeps you on track.";
  }
  return "Under budget — nice work staying aligned with your plan.";
}

export default function BudgetsPage() {
  const underCount = budgets.filter((budget) => !needsAlert(budget)).length;
  const alertCount = budgets.filter((budget) => needsAlert(budget)).length;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Budgets
      </h1>
      <p className="mt-2 text-base text-muted">
        Monthly category plans for {household.workspaceName}. Supportive
        check-ins, not scorekeeping.
      </p>

      {budgets.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No budgets yet"
            description="Category plans will live here when you're ready — supportive check-ins, not scorekeeping."
          />
        </div>
      ) : (
        <>
      <div className="mt-6 flex flex-wrap gap-6 text-sm">
        <p>
          <span className="text-muted">On track</span>{" "}
          <span className="font-semibold text-emerald">{underCount}</span>
        </p>
        <p>
          <span className="text-muted">Worth a look</span>{" "}
          <span className="font-semibold text-amber">{alertCount}</span>
        </p>
      </div>

      <ul className="mt-8 space-y-6">
        {budgets.map((budget) => {
          const alert = needsAlert(budget);
          const ratio = Math.min(usageRatio(budget), 1);
          const remaining = budget.limit - budget.spent;
          const barColor = alert ? "bg-amber" : "bg-emerald";
          const accentText = alert ? "text-amber" : "text-emerald";

          return (
            <li key={budget.id} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-medium text-navy">{budget.category}</h2>
                <p className={`text-sm font-semibold tabular-nums ${accentText}`}>
                  {formatMoney(budget.spent)} of {formatMoney(budget.limit)}
                </p>
              </div>

              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={Math.round(ratio * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${budget.category} budget used`}
              >
                <div
                  className={`h-full rounded-full transition-[width] ${barColor}`}
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>

              <p className={`mt-3 text-sm ${accentText}`}>{statusMessage(budget)}</p>
              <p className="mt-1 text-sm text-muted">
                {remaining >= 0
                  ? `${formatMoney(remaining)} left this month`
                  : `${formatMoney(Math.abs(remaining))} over the plan — still recoverable`}
              </p>
            </li>
          );
        })}
      </ul>
        </>
      )}
    </div>
  );
}
