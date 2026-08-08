import { cookies } from "next/headers";
import { HOUSEHOLD_SESSION_COOKIE } from "@/lib/session-cookies";

const DEFAULT_LOGIN = "We are the child of God";
const DEFAULT_PASSWORD = "We live by Grace";

export function getHouseholdCredentials(): {
  login: string;
  password: string;
} {
  return {
    login: process.env.HOUSEHOLD_LOGIN ?? DEFAULT_LOGIN,
    password: process.env.HOUSEHOLD_PASSWORD ?? DEFAULT_PASSWORD,
  };
}

/** Preserve internal spaces; only trim ends. */
export function normalizeCredential(value: string): string {
  return value.replace(/^\s+|\s+$/g, "");
}

export function credentialsMatch(login: string, password: string): boolean {
  const expected = getHouseholdCredentials();
  return (
    normalizeCredential(login) === normalizeCredential(expected.login) &&
    normalizeCredential(password) === normalizeCredential(expected.password)
  );
}

export async function isHouseholdLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(HOUSEHOLD_SESSION_COOKIE)?.value === "1";
}

export async function setHouseholdSession() {
  const cookieStore = await cookies();
  cookieStore.set(HOUSEHOLD_SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearHouseholdSession() {
  const cookieStore = await cookies();
  cookieStore.delete(HOUSEHOLD_SESSION_COOKIE);
}
