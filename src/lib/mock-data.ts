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

export type GoalStatus = "active" | "completed" | "paused" | "archived";
export type GoalScope = "shared" | "personal";
export type GoalPace = "on-track" | "behind";

export type GoalPartnerContribution = {
  memberId: string;
  monthlyAmount: number;
  totalContributed: number;
};

export type GoalHistoryEntry = {
  id: string;
  date: string;
  memberId: string;
  amount: number;
  note: string;
};

export type GoalMilestone = {
  id: string;
  label: string;
  targetAmount: number;
  reachedAt?: string;
};

export type Goal = {
  id: string;
  name: string;
  scope: GoalScope;
  /** Set for personal goals; omit for shared. */
  ownerMemberId?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  startedAt: string;
  monthlyContribution: number;
  partnerContributions: GoalPartnerContribution[];
  history: GoalHistoryEntry[];
  milestones: GoalMilestone[];
  status: GoalStatus;
  pace: GoalPace;
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
    scope: "shared",
    targetAmount: 15000,
    currentAmount: 12500,
    targetDate: "2026-12-31",
    startedAt: "2025-06-01",
    monthlyContribution: 500,
    partnerContributions: [
      { memberId: "member-1", monthlyAmount: 250, totalContributed: 6400 },
      { memberId: "member-2", monthlyAmount: 250, totalContributed: 6100 },
    ],
    history: [
      {
        id: "hist-em-1",
        date: "2026-06-01",
        memberId: "member-1",
        amount: 250,
        note: "June contribution",
      },
      {
        id: "hist-em-2",
        date: "2026-06-01",
        memberId: "member-2",
        amount: 250,
        note: "June contribution",
      },
      {
        id: "hist-em-3",
        date: "2026-07-01",
        memberId: "member-1",
        amount: 250,
        note: "July contribution",
      },
      {
        id: "hist-em-4",
        date: "2026-07-01",
        memberId: "member-2",
        amount: 250,
        note: "July contribution",
      },
      {
        id: "hist-em-5",
        date: "2026-08-05",
        memberId: "member-1",
        amount: 400,
        note: "Extra boost toward the cushion",
      },
    ],
    milestones: [
      {
        id: "ms-em-1",
        label: "First $5,000",
        targetAmount: 5000,
        reachedAt: "2025-11-12",
      },
      {
        id: "ms-em-2",
        label: "Halfway there",
        targetAmount: 7500,
        reachedAt: "2026-02-20",
      },
      {
        id: "ms-em-3",
        label: "Almost ready",
        targetAmount: 12000,
        reachedAt: "2026-07-15",
      },
      { id: "ms-em-4", label: "Fully funded", targetAmount: 15000 },
    ],
    status: "active",
    pace: "on-track",
  },
  {
    id: "goal-vacation",
    name: "Summer Trip",
    scope: "shared",
    targetAmount: 3000,
    currentAmount: 850,
    targetDate: "2027-06-01",
    startedAt: "2026-03-01",
    monthlyContribution: 250,
    partnerContributions: [
      { memberId: "member-1", monthlyAmount: 125, totalContributed: 450 },
      { memberId: "member-2", monthlyAmount: 125, totalContributed: 400 },
    ],
    history: [
      {
        id: "hist-vac-1",
        date: "2026-05-01",
        memberId: "member-1",
        amount: 125,
        note: "May trip savings",
      },
      {
        id: "hist-vac-2",
        date: "2026-05-01",
        memberId: "member-2",
        amount: 125,
        note: "May trip savings",
      },
      {
        id: "hist-vac-3",
        date: "2026-07-01",
        memberId: "member-1",
        amount: 100,
        note: "Partial July contribution",
      },
      {
        id: "hist-vac-4",
        date: "2026-08-01",
        memberId: "member-2",
        amount: 125,
        note: "August trip savings",
      },
    ],
    milestones: [
      { id: "ms-vac-1", label: "Flights fund", targetAmount: 1000 },
      { id: "ms-vac-2", label: "Stay covered", targetAmount: 2000 },
      { id: "ms-vac-3", label: "Trip ready", targetAmount: 3000 },
    ],
    status: "active",
    pace: "behind",
  },
  {
    id: "goal-maya-course",
    name: "Design Course",
    scope: "personal",
    ownerMemberId: "member-1",
    targetAmount: 800,
    currentAmount: 520,
    targetDate: "2026-10-31",
    startedAt: "2026-04-01",
    monthlyContribution: 100,
    partnerContributions: [
      { memberId: "member-1", monthlyAmount: 100, totalContributed: 520 },
    ],
    history: [
      {
        id: "hist-course-1",
        date: "2026-06-15",
        memberId: "member-1",
        amount: 100,
        note: "June course savings",
      },
      {
        id: "hist-course-2",
        date: "2026-07-15",
        memberId: "member-1",
        amount: 100,
        note: "July course savings",
      },
      {
        id: "hist-course-3",
        date: "2026-08-01",
        memberId: "member-1",
        amount: 120,
        note: "A little extra this month",
      },
    ],
    milestones: [
      {
        id: "ms-course-1",
        label: "Half funded",
        targetAmount: 400,
        reachedAt: "2026-07-01",
      },
      { id: "ms-course-2", label: "Ready to enroll", targetAmount: 800 },
    ],
    status: "active",
    pace: "on-track",
  },
  {
    id: "goal-noah-laptop",
    name: "Laptop Refresh",
    scope: "personal",
    ownerMemberId: "member-2",
    targetAmount: 1400,
    currentAmount: 280,
    targetDate: "2026-11-30",
    startedAt: "2026-05-01",
    monthlyContribution: 150,
    partnerContributions: [
      { memberId: "member-2", monthlyAmount: 150, totalContributed: 280 },
    ],
    history: [
      {
        id: "hist-lap-1",
        date: "2026-06-01",
        memberId: "member-2",
        amount: 150,
        note: "June set-aside",
      },
      {
        id: "hist-lap-2",
        date: "2026-07-01",
        memberId: "member-2",
        amount: 130,
        note: "July set-aside",
      },
    ],
    milestones: [
      { id: "ms-lap-1", label: "Accessories covered", targetAmount: 300 },
      { id: "ms-lap-2", label: "Ready to buy", targetAmount: 1400 },
    ],
    status: "paused",
    pace: "behind",
  },
  {
    id: "goal-furniture",
    name: "Living Room Refresh",
    scope: "shared",
    targetAmount: 2000,
    currentAmount: 2000,
    targetDate: "2026-05-01",
    startedAt: "2025-10-01",
    monthlyContribution: 300,
    partnerContributions: [
      { memberId: "member-1", monthlyAmount: 150, totalContributed: 1000 },
      { memberId: "member-2", monthlyAmount: 150, totalContributed: 1000 },
    ],
    history: [
      {
        id: "hist-furn-1",
        date: "2026-04-10",
        memberId: "member-1",
        amount: 200,
        note: "Final shared contribution",
      },
      {
        id: "hist-furn-2",
        date: "2026-04-10",
        memberId: "member-2",
        amount: 200,
        note: "Final shared contribution",
      },
    ],
    milestones: [
      {
        id: "ms-furn-1",
        label: "Halfway",
        targetAmount: 1000,
        reachedAt: "2026-01-18",
      },
      {
        id: "ms-furn-2",
        label: "Goal reached",
        targetAmount: 2000,
        reachedAt: "2026-04-10",
      },
    ],
    status: "completed",
    pace: "on-track",
  },
  {
    id: "goal-old-bike",
    name: "Weekend Bike Kit",
    scope: "personal",
    ownerMemberId: "member-1",
    targetAmount: 450,
    currentAmount: 120,
    targetDate: "2025-12-01",
    startedAt: "2025-07-01",
    monthlyContribution: 75,
    partnerContributions: [
      { memberId: "member-1", monthlyAmount: 75, totalContributed: 120 },
    ],
    history: [
      {
        id: "hist-bike-1",
        date: "2025-08-01",
        memberId: "member-1",
        amount: 75,
        note: "Early contribution",
      },
      {
        id: "hist-bike-2",
        date: "2025-09-01",
        memberId: "member-1",
        amount: 45,
        note: "Partial set-aside",
      },
    ],
    milestones: [
      { id: "ms-bike-1", label: "Starter gear", targetAmount: 200 },
      { id: "ms-bike-2", label: "Full kit", targetAmount: 450 },
    ],
    status: "archived",
    pace: "behind",
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
