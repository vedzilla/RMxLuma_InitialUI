import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/supabase_lib/auth/server";
import { getSocietyAccount } from "@/supabase_lib/societies";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  params,
  children,
}: {
  params: Promise<{ societyId: string }>;
  children: React.ReactNode;
}) {
  const { societyId } = await params;

  const supabase = await createAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const account = await getSocietyAccount(supabase, user.id, societyId);

  if (!account) {
    notFound();
  }

  const status = account.society_account_approval_status.name;
  if (status !== "approved" && status !== "trusted") {
    redirect("/society");
  }

  return <DashboardShell societyId={societyId}>{children}</DashboardShell>;
}
