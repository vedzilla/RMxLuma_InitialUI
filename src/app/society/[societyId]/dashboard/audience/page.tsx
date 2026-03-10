"use client";

import { useEffect, useState } from "react";
import { useSocietyAuth } from "@/hooks/useSocietyAuth";
import { useAnalytics } from "@/hooks/useAnalytics";
import { DateRangeFilter } from "@/components/dashboard/DateRangeFilter";
import { AudiencePieChart } from "@/components/charts/AudiencePieChart";

type TimeRange = "7d" | "30d" | "90d";

export default function AudiencePage() {
  const { society } = useSocietyAuth();
  const { analytics, loading, fetchAnalytics } = useAnalytics(society?.id);
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  useEffect(() => {
    if (society?.id) {
      fetchAnalytics(timeRange);
    }
  }, [society?.id, timeRange, fetchAnalytics]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audience</h1>
          <p className="text-muted-foreground">
            Understand the demographics of your audience
          </p>
        </div>
        <DateRangeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AudiencePieChart
          title="University Breakdown"
          data={analytics?.audienceByUniversity ?? []}
          loading={loading}
        />
        <AudiencePieChart
          title="Study Level Breakdown"
          data={analytics?.audienceByStudyLevel ?? []}
          loading={loading}
        />
      </div>
    </div>
  );
}
