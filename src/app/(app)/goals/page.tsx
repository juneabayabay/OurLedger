import {
  goals,
  household,
  type Goal,
  type GoalPace,
  type GoalStatus,
} from "@/lib/mock-data";

function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
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
    "Partner"
  );
}

function progressPercent(goal: Goal): number {
  if (goal.targetAmount <= 0) return 0;
  return Math.min(
    100,
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
  );
}

function statusLabel(status: GoalStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "completed":
      return "Completed";
    case "paused":
      return "Paused";
    case "archived":
      return "Archived";
  }
}

function paceMessage(pace: GoalPace, status: GoalStatus): string {
  if (status === "completed") {
    return "You reached this goal — wonderful teamwork.";
  }
  if (status === "paused") {
    return "Paused for now — ready whenever you both are.";
  }
  if (status === "archived") {
    return "Kept for reference — no pressure to reopen it.";
  }
  if (pace === "on-track") {
    return "You are on track.";
  }
  return "A little behind the plan — steady contributions will help you catch up gently.";
}

function scopeLabel(goal: Goal): string {
  if (goal.scope === "shared") {
    return "Shared goal";
  }
  const owner = goal.ownerMemberId
    ? memberName(goal.ownerMemberId)
    : "Personal";
  return `Personal · ${owner}`;
}

function paceTone(goal: Goal): string {
  if (goal.status === "completed" || goal.pace === "on-track") {
    return "text-emerald";
  }
  if (goal.status === "paused" || goal.status === "archived") {
    return "text-muted";
  }
  return "text-amber";
}

function barTone(goal: Goal): string {
  if (goal.status === "completed" || goal.pace === "on-track") {
    return "bg-emerald";
  }
  if (goal.status === "paused" || goal.status === "archived") {
    return "bg-border";
  }
  return "bg-amber";
}

const STATUS_ORDER: GoalStatus[] = [
  "active",
  "paused",
  "completed",
  "archived",
];

export default function GoalsPage() {
  const sorted = [...goals].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Our Goals
      </h1>
      <p className="mt-2 text-base text-muted">
        Shared and personal savings plans for {household.workspaceName}. Progress
        together, never against each other.
      </p>

      <ul className="mt-8 space-y-10">
        {sorted.map((goal) => {
          const percent = progressPercent(goal);
          const accent = paceTone(goal);
          const recentHistory = [...goal.history]
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 4);

          return (
            <li
              key={goal.id}
              className="border-b border-border pb-10 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-navy">{goal.name}</h2>
                  <p className="mt-1 text-sm text-muted">{scopeLabel(goal)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-navy">
                    {statusLabel(goal.status)}
                  </p>
                  {goal.status === "active" ? (
                    <p className={`mt-1 text-sm font-medium ${accent}`}>
                      {goal.pace === "on-track"
                        ? "On track"
                        : "Needs a gentle nudge"}
                    </p>
                  ) : null}
                </div>
              </div>

              <p className={`mt-3 text-sm ${accent}`}>
                {paceMessage(goal.pace, goal.status)}
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <p>
                  <span className="text-muted">Target</span>
                  <br />
                  <span className="font-semibold tabular-nums text-navy">
                    {formatMoney(goal.targetAmount)}
                  </span>
                </p>
                <p>
                  <span className="text-muted">Saved</span>
                  <br />
                  <span className="font-semibold tabular-nums text-navy">
                    {formatMoney(goal.currentAmount)} ({percent}%)
                  </span>
                </p>
                <p>
                  <span className="text-muted">Deadline</span>
                  <br />
                  <span className="font-semibold text-navy">
                    {formatDate(goal.targetDate)}
                  </span>
                </p>
              </div>

              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-border"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${goal.name} progress`}
              >
                <div
                  className={`h-full rounded-full ${barTone(goal)}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-navy">
                  Monthly contribution
                </h3>
                <p className="mt-1 text-sm text-muted">
                  Planned together:{" "}
                  <span className="font-medium text-navy">
                    {formatMoney(goal.monthlyContribution)}/month
                  </span>
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {goal.partnerContributions.map((contribution) => (
                    <li key={`${goal.id}-${contribution.memberId}`}>
                      {memberName(contribution.memberId)} sets aside{" "}
                      <span className="font-medium text-navy">
                        {formatMoney(contribution.monthlyAmount)}/month
                      </span>
                      <span className="text-muted">
                        {" "}
                        · {formatMoney(contribution.totalContributed)} so far
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-navy">Milestones</h3>
                <ul className="mt-2 space-y-2">
                  {goal.milestones.map((milestone) => {
                    const reached = Boolean(milestone.reachedAt);
                    return (
                      <li
                        key={milestone.id}
                        className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                      >
                        <span className={reached ? "text-emerald" : "text-muted"}>
                          {reached ? "Reached · " : "Upcoming · "}
                          {milestone.label}
                        </span>
                        <span className="tabular-nums text-muted">
                          {formatMoney(milestone.targetAmount)}
                          {milestone.reachedAt
                            ? ` · ${formatDate(milestone.reachedAt)}`
                            : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-navy">Recent history</h3>
                <ul className="mt-2 space-y-2">
                  {recentHistory.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                    >
                      <span className="text-muted">
                        {formatDate(entry.date)} · {memberName(entry.memberId)} ·{" "}
                        {entry.note}
                      </span>
                      <span className="font-medium tabular-nums text-emerald">
                        +{formatMoney(entry.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
