"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FollowerGrowthChartProps {
  data: Array<{ date: string; count: number }>;
  loading?: boolean;
}

const chartConfig: ChartConfig = {
  count: { label: "New followers", color: "var(--chart-1)" },
};

export function FollowerGrowthChart({ data, loading }: FollowerGrowthChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Follower growth</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] animate-pulse rounded bg-muted" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={data}>
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
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
