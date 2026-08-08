import { household, workspaceSettings } from "@/lib/mock-data";
import { PRODUCT_NAME } from "@/lib/nav";

function yesNo(value: boolean): string {
  return value ? "On" : "Off";
}

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Settings
      </h1>
      <p className="mt-2 text-base text-muted">
        Workspace preferences for {PRODUCT_NAME}.
      </p>

      <section className="mt-8 border-b border-border pb-6">
        <h2 className="text-sm font-semibold text-navy">Workspace</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Name</dt>
            <dd className="font-medium text-navy">{household.workspaceName}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Tagline</dt>
            <dd className="font-medium text-navy">{household.tagline}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Members</dt>
            <dd className="font-medium text-navy">
              {household.members.map((member) => member.displayName).join(" · ")}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 border-b border-border pb-6">
        <h2 className="text-sm font-semibold text-navy">Preferences</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Currency</dt>
            <dd className="font-medium text-navy">{workspaceSettings.currency}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Week starts on</dt>
            <dd className="font-medium capitalize text-navy">
              {workspaceSettings.weekStartsOn}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Shared visibility</dt>
            <dd className="font-medium capitalize text-navy">
              {workspaceSettings.sharedVisibility}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-semibold text-navy">Notifications</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Budget alerts</dt>
            <dd className="font-medium text-navy">
              {yesNo(workspaceSettings.notifyBudgetAlerts)}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted">Goal milestones</dt>
            <dd className="font-medium text-navy">
              {yesNo(workspaceSettings.notifyGoalMilestones)}
            </dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-muted">
          Editing and real account security will arrive with authentication later.
        </p>
      </section>
    </div>
  );
}
