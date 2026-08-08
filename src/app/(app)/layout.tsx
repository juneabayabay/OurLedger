import { AppShell } from "@/components/app-shell";
import { getActiveMember } from "@/lib/member-session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeMember = await getActiveMember();

  return (
    <AppShell activeMemberName={activeMember?.displayName ?? null}>
      {children}
    </AppShell>
  );
}
