"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EngagementChartProps {
  data: Array<{ date: string; likes: number; attending: number; views: number }>;
  loading?: boolean;
}

const chartConfig: ChartConfig = {
  likes: { label: "Likes", color: "var(--chart-1)" },
  attending: { label: "RSVPs", color: "var(--chart-2)" },
  views: { label: "Views", color: "var(--chart-3)" },
};

export function EngagementChart({ data, loading }: EngagementChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Engagement over time</CardTitle>
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
                dataKey="likes"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="attending"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="var(--chart-3)"
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
