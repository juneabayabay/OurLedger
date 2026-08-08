import { household, insights } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui-states";
import { PRODUCT_NAME } from "@/lib/nav";

export default function InsightsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Insights
      </h1>
      <p className="mt-2 text-base text-muted">
        Supportive notes for {household.workspaceName} — guidance, not judgment.
      </p>
      <p className="mt-1 text-sm text-muted">{PRODUCT_NAME}</p>

      {insights.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No insights just yet"
            description="As patterns settle in, gentle notes will appear here. Nothing urgent — just helpful context."
            actionHref="/budgets"
            actionLabel="Check budgets"
          />
        </div>
      ) : (
        <ul className="mt-8 space-y-6">
          {insights.map((insight) => (
            <li
              key={insight.id}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <p
                className={`text-xs font-medium uppercase tracking-wide ${
                  insight.tone === "positive" ? "text-emerald" : "text-amber"
                }`}
              >
                {insight.tone === "positive" ? "Encouraging" : "Gentle check-in"}
              </p>
              <h2 className="mt-2 text-lg font-medium text-navy">
                {insight.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{insight.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
