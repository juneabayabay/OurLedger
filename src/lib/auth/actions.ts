"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  clearHouseholdSession,
  credentialsMatch,
  setHouseholdSession,
} from "@/lib/household-auth";
import { ACTIVE_MEMBER_COOKIE } from "@/lib/session-cookies";

export type AuthActionState = {
  error?: string;
  message?: string;
} | null;

/** One shared household login. Spaces in login and password are allowed. */
export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const login = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!login.replace(/^\s+|\s+$/g, "") || !password.replace(/^\s+|\s+$/g, "")) {
    return {
      error: "Please enter the household login and password to continue.",
    };
  }

  if (!credentialsMatch(login, password)) {
    return {
      error:
        "That household login or password did not match. Check the spaces and try again.",
    };
  }

  await setHouseholdSession();

  const cookieStore = await cookies();
  cookieStore.delete(ACTIVE_MEMBER_COOKIE);

  redirect("/dashboard");
}

export async function logoutAction() {
  await clearHouseholdSession();
  const cookieStore = await cookies();
  cookieStore.delete(ACTIVE_MEMBER_COOKIE);
  redirect("/login");
}
