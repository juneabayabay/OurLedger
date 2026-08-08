import { cookies } from "next/headers";
import { household, type HouseholdMember } from "@/lib/mock-data";
import { ACTIVE_MEMBER_COOKIE } from "@/lib/session-cookies";

export { ACTIVE_MEMBER_COOKIE };

export function getHouseholdMembers(): HouseholdMember[] {
  return [...household.members];
}

export function findMemberById(memberId: string): HouseholdMember | null {
  return household.members.find((member) => member.id === memberId) ?? null;
}

export async function getActiveMemberId(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ACTIVE_MEMBER_COOKIE)?.value;
  if (!value) return null;
  return findMemberById(value) ? value : null;
}

export async function getActiveMember(): Promise<HouseholdMember | null> {
  const id = await getActiveMemberId();
  if (!id) return null;
  return findMemberById(id);
}
