import fs from "node:fs/promises";
import path from "node:path";
import {
  accounts as initialAccounts,
  budgets as initialBudgets,
  transactions as initialTransactions,
  type Account,
  type Budget,
  type Transaction,
} from "@/lib/mock-data";

export type LedgerStoreData = {
  transactions: Transaction[];
  accounts: Account[];
  budgets: Budget[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "ledger-store.json");

async function ensureDataFile(): Promise<LedgerStoreData> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const content = await fs.readFile(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content) as LedgerStoreData;
      if (
        Array.isArray(parsed.transactions) &&
        Array.isArray(parsed.accounts) &&
        Array.isArray(parsed.budgets)
      ) {
        return parsed;
      }
    } catch {
      // File doesn't exist or is invalid, seed it
    }

    const initialData: LedgerStoreData = {
      transactions: [...initialTransactions],
      accounts: [...initialAccounts],
      budgets: [...initialBudgets],
    };

    await fs.writeFile(
      DATA_FILE,
      JSON.stringify(initialData, null, 2),
      "utf-8",
    );
    return initialData;
  } catch (error) {
    console.error("Failed to access ledger-store.json:", error);
    return {
      transactions: [...initialTransactions],
      accounts: [...initialAccounts],
      budgets: [...initialBudgets],
    };
  }
}

async function saveStoreData(data: LedgerStoreData): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write to ledger-store.json:", error);
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  const data = await ensureDataFile();
  return data.transactions;
}

export async function getAccounts(): Promise<Account[]> {
  const data = await ensureDataFile();
  return data.accounts;
}

export async function getBudgets(): Promise<Budget[]> {
  const data = await ensureDataFile();
  return data.budgets;
}

export async function addTransaction(input: {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  accountId: string;
  memberId: string;
  date: string;
}): Promise<Transaction> {
  const data = await ensureDataFile();

  const newTxn: Transaction = {
    id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    description: input.description.trim(),
    amount:
      input.type === "expense"
        ? -Math.abs(input.amount)
        : Math.abs(input.amount),
    type: input.type,
    category: input.category.trim(),
    accountId: input.accountId,
    memberId: input.memberId,
    date: input.date || new Date().toISOString().split("T")[0],
  };

  data.transactions.unshift(newTxn);

  // Update account balance
  const account = data.accounts.find((acc) => acc.id === input.accountId);
  if (account) {
    if (input.type === "income") {
      account.balance += Math.abs(input.amount);
    } else {
      account.balance -= Math.abs(input.amount);
    }
  }

  // Update budget spent if matching category
  if (input.type === "expense") {
    const budget = data.budgets.find(
      (b) => b.category.toLowerCase() === input.category.toLowerCase(),
    );
    if (budget) {
      budget.spent = Math.round((budget.spent + Math.abs(input.amount)) * 100) / 100;
    }
  }

  await saveStoreData(data);
  return newTxn;
}

export async function deleteTransaction(id: string): Promise<boolean> {
  const data = await ensureDataFile();
  const index = data.transactions.findIndex((t) => t.id === id);
  if (index === -1) return false;

  const [removed] = data.transactions.splice(index, 1);

  // Revert account balance
  const account = data.accounts.find((acc) => acc.id === removed.accountId);
  if (account) {
    if (removed.type === "income") {
      account.balance -= Math.abs(removed.amount);
    } else {
      account.balance += Math.abs(removed.amount);
    }
  }

  // Revert budget spent
  if (removed.type === "expense") {
    const budget = data.budgets.find(
      (b) => b.category.toLowerCase() === removed.category.toLowerCase(),
    );
    if (budget) {
      budget.spent = Math.max(
        0,
        Math.round((budget.spent - Math.abs(removed.amount)) * 100) / 100,
      );
    }
  }

  await saveStoreData(data);
  return true;
}

