import { redirect } from "next/navigation";

export default async function DashboardRoot({
  params,
}: {
  params: Promise<{ societyId: string }>;
}) {
  const { societyId } = await params;
  redirect(`/society/${societyId}/dashboard/overview`);
}
