"use server";

import { revalidatePath } from "next/cache";
import { addTransaction, deleteTransaction } from "@/lib/data-store";

export type TransactionActionState = {
  success?: boolean;
  error?: string;
} | null;

export async function createTransactionAction(
  _prev: TransactionActionState,
  formData: FormData,
): Promise<TransactionActionState> {
  const description = String(formData.get("description") ?? "").trim();
  const rawAmount = String(formData.get("amount") ?? "").replace(/[^0-9.]/g, "");
  const type = String(formData.get("type") ?? "expense") as "income" | "expense";
  const category = String(formData.get("category") ?? "Other").trim();
  const accountId = String(formData.get("accountId") ?? "");
  const memberId = String(formData.get("memberId") ?? "");
  const date = String(formData.get("date") ?? "").trim();

  const amount = parseFloat(rawAmount);

  if (!description) {
    return { error: "Please enter a description for the transaction." };
  }

  if (isNaN(amount) || amount <= 0) {
    return { error: "Please enter a valid amount greater than $0." };
  }

  if (!accountId) {
    return { error: "Please select an account." };
  }

  if (!memberId) {
    return { error: "Please select who made this transaction." };
  }

  try {
    await addTransaction({
      description,
      amount,
      type: type === "income" ? "income" : "expense",
      category: category || "General",
      accountId,
      memberId,
      date: date || new Date().toISOString().split("T")[0],
    });

    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/budgets");
    revalidatePath("/reports");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { error: "Failed to save transaction. Please try again." };
  }
}

export async function deleteTransactionAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  try {
    await deleteTransaction(id);
    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/budgets");
    revalidatePath("/reports");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
}

