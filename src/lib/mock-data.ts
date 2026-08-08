export type HouseholdMember = {
  id: string;
  displayName: string;
};

export type Account = {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "cash";
  balance: number;
  currency: "USD";
};

export type Transaction = {
  id: string;
  accountId: string;
  memberId: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: "income" | "expense";
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly";
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
};

export const household = {
  workspaceName: "Our Money Room",
  tagline: "Shared Money. Shared Goals.",
  members: [
    { id: "member-1", displayName: "Maya" },
    { id: "member-2", displayName: "Noah" },
  ] as const satisfies readonly HouseholdMember[],
};

export const accounts: Account[] = [
  {
    id: "acct-checking",
    name: "Joint Checking",
    type: "checking",
    balance: 4280.55,
    currency: "USD",
  },
  {
    id: "acct-savings",
    name: "Emergency Fund",
    type: "savings",
    balance: 12500,
    currency: "USD",
  },
  {
    id: "acct-credit",
    name: "Shared Card",
    type: "credit",
    balance: -640.22,
    currency: "USD",
  },
];

export const transactions: Transaction[] = [
  {
    id: "txn-1",
    accountId: "acct-checking",
    memberId: "member-1",
    description: "Payroll deposit",
    category: "Income",
    amount: 3200,
    date: "2026-08-01",
    type: "income",
  },
  {
    id: "txn-2",
    accountId: "acct-checking",
    memberId: "member-2",
    description: "Grocery run",
    category: "Groceries",
    amount: -128.4,
    date: "2026-08-03",
    type: "expense",
  },
  {
    id: "txn-3",
    accountId: "acct-credit",
    memberId: "member-1",
    description: "Electric bill",
    category: "Utilities",
    amount: -94.15,
    date: "2026-08-04",
    type: "expense",
  },
  {
    id: "txn-4",
    accountId: "acct-checking",
    memberId: "member-2",
    description: "Dinner out",
    category: "Dining",
    amount: -62.5,
    date: "2026-08-06",
    type: "expense",
  },
  {
    id: "txn-5",
    accountId: "acct-savings",
    memberId: "member-1",
    description: "Monthly savings transfer",
    category: "Savings",
    amount: 400,
    date: "2026-08-05",
    type: "income",
  },
];

export const budgets: Budget[] = [
  {
    id: "budget-groceries",
    category: "Groceries",
    limit: 500,
    spent: 128.4,
    period: "monthly",
  },
  {
    id: "budget-dining",
    category: "Dining",
    limit: 200,
    spent: 62.5,
    period: "monthly",
  },
  {
    id: "budget-utilities",
    category: "Utilities",
    limit: 250,
    spent: 94.15,
    period: "monthly",
  },
  {
    id: "budget-transport",
    category: "Transport",
    limit: 150,
    spent: 138,
    period: "monthly",
  },
  {
    id: "budget-fun",
    category: "Fun & Outings",
    limit: 120,
    spent: 135,
    period: "monthly",
  },
];

export const goals: Goal[] = [
  {
    id: "goal-emergency",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 12500,
    targetDate: "2026-12-31",
  },
  {
    id: "goal-vacation",
    name: "Summer Trip",
    targetAmount: 3000,
    currentAmount: 850,
    targetDate: "2027-06-01",
  },
];

/** Display names for household members, in mock-data order. */
export function getMemberDisplayNames(): string[] {
  return household.members.map((member) => member.displayName);
}

export function getTimeOfDayGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
