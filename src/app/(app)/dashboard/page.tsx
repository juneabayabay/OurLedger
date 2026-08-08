import {
  getMemberDisplayNames,
  getTimeOfDayGreeting,
  household,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const [firstName, secondName] = getMemberDisplayNames();
  const greeting = getTimeOfDayGreeting();

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
        {greeting}, {firstName} and {secondName}
      </h1>
      <p className="mt-3 text-lg font-medium text-navy">
        {household.workspaceName}
      </p>
      <p className="mt-1 text-base text-muted">{household.tagline}</p>
    </div>
  );
}
