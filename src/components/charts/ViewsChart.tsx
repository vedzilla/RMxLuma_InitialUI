"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ViewsChartProps {
  data: Array<{ date: string; views: number }>;
  loading?: boolean;
}

const chartConfig: ChartConfig = {
  views: { label: "Views", color: "var(--chart-1)" },
};

export function ViewsChart({ data, loading }: ViewsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Event views</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[250px] animate-pulse rounded bg-muted" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tickFormatter={(val) =>
                  new Date(val).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })
                }
                className="text-xs"
              />
              <YAxis className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
