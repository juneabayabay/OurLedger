import {
  clearMemberAction,
  selectMemberAction,
} from "@/lib/member-actions";
import {
  getTimeOfDayGreeting,
  household,
  type HouseholdMember,
} from "@/lib/mock-data";

export function MemberPicker({ members }: { members: HouseholdMember[] }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        Who is using Our Ledger?
      </h1>
      <p className="mt-2 text-base text-muted">
        One shared login for {household.workspaceName}. Choose who you are, then
        every feature is ready for both of you.
      </p>
      <p className="mt-1 text-sm text-muted">{household.tagline}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {members.map((member) => (
          <form key={member.id} action={selectMemberAction}>
            <input type="hidden" name="memberId" value={member.id} />
            <button
              type="submit"
              className="w-full rounded-md border border-border bg-surface px-5 py-8 text-left transition-colors hover:border-emerald hover:bg-emerald-soft"
            >
              <span className="block text-xl font-semibold text-navy">
                {member.displayName}
              </span>
              <span className="mt-2 block text-sm text-muted">
                Continue as {member.displayName}
              </span>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}

export function ActiveMemberHome({ member }: { member: HouseholdMember }) {
  const greeting = getTimeOfDayGreeting();
  const partner = household.members.find((item) => item.id !== member.id);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        {greeting}, {member.displayName}
      </h1>
      <p className="mt-3 text-lg font-medium text-navy">
        {household.workspaceName}
      </p>
      <p className="mt-1 text-base text-muted">{household.tagline}</p>
      <p className="mt-4 text-sm text-muted">
        You are signed in as {member.displayName}
        {partner ? ` · Sharing with ${partner.displayName}` : ""}. Use the menu
        for transactions, budgets, goals, and more.
      </p>
      <form action={clearMemberAction} className="mt-6">
        <button
          type="submit"
          className="text-sm font-medium text-emerald hover:underline"
        >
          Switch person
        </button>
      </form>
    </div>
  );
}
