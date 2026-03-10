"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AudiencePieChartProps {
  data: Array<{ name: string; count: number }>;
  title: string;
  loading?: boolean;
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function AudiencePieChart({ data, title, loading }: AudiencePieChartProps) {
  const chartConfig: ChartConfig = Object.fromEntries(
    data.map((d, i) => [
      d.name,
      { label: d.name, color: COLORS[i % COLORS.length] },
    ])
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="mx-auto h-[250px] w-[250px] animate-pulse rounded-full bg-muted" />
        ) : data.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No data available yet
          </p>
        ) : (
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <ChartContainer config={chartConfig} className="h-[250px] w-[250px]">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="count"
                  nameKey="name"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="space-y-2">
              {data.slice(0, 5).map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
