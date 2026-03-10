"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventComparisonBarProps {
  data: Array<{ title: string; likes: number; attending: number }>;
  loading?: boolean;
}

const chartConfig: ChartConfig = {
  likes: { label: "Likes", color: "var(--chart-1)" },
  attending: { label: "RSVPs", color: "var(--chart-2)" },
};

export function EventComparisonBar({ data, loading }: EventComparisonBarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Event comparison</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] animate-pulse rounded bg-muted" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" className="text-xs" />
              <YAxis
                dataKey="title"
                type="category"
                width={120}
                className="text-xs"
                tickFormatter={(val) =>
                  val.length > 18 ? val.slice(0, 18) + "..." : val
                }
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="likes" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="attending" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
