import { ActiveMemberHome, MemberPicker } from "@/components/member-picker";
import {
  getActiveMember,
  getHouseholdMembers,
} from "@/lib/member-session";

export default async function DashboardPage() {
  const activeMember = await getActiveMember();

  if (!activeMember) {
    return <MemberPicker members={getHouseholdMembers()} />;
  }

  return <ActiveMemberHome member={activeMember} />;
}
