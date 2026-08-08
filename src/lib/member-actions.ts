"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACTIVE_MEMBER_COOKIE,
  findMemberById,
} from "@/lib/member-session";

export async function selectMemberAction(formData: FormData) {
  const memberId = String(formData.get("memberId") ?? "");
  if (!findMemberById(memberId)) {
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_MEMBER_COOKIE, memberId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/dashboard");
}

export async function clearMemberAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ACTIVE_MEMBER_COOKIE);
  redirect("/dashboard");
}
