"use client";

import { TrendingUp } from "lucide-react";
import React from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Recibe los datos como prop
type DailyMacro = {
  date: string;
  protein: number;
  carbohydrates: number;
  fat: number;
};

const chartConfig = {
  protein: {
    label: "Proteins",
    color: "var(--chart-1)",
  },
  carbohydrates: {
    label: "Carbs",
    color: "var(--chart-2)",
  },
  fat: {
    label: "Fats",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type ActiveProperty = keyof typeof chartConfig | "all";

export function GlowingBarChart({ data = [] }: { data?: DailyMacro[] }) {
  const [activeProperty, setActiveProperty] =
    React.useState<ActiveProperty>("all");

  const chartData = data.map((row) => ({
    day: row.date.slice(5),
    protein: row.protein ?? 0,
    carbohydrates: row.carbohydrates ?? 0,
    fat: row.fat ?? 0,
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>
            Macronutrients
            <Badge
              variant="outline"
              className="text-green-500 bg-green-500/10 border-none ml-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Últimos días</span>
            </Badge>
          </CardTitle>
          <Select
            value={activeProperty}
            onValueChange={(value: ActiveProperty) => {
              setActiveProperty(value);
            }}
          >
            <SelectTrigger className="text-xs !h-6 !px-1.5">
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Macronutrientes</SelectLabel>
                <SelectItem className="text-xs" value="all">
                  Todos
                </SelectItem>
                <SelectItem className="text-xs" value="protein">
                  Proteínas
                </SelectItem>
                <SelectItem className="text-xs" value="carbohydrates">
                  Carbohidratos
                </SelectItem>
                <SelectItem className="text-xs" value="fat">
                  Grasas
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>Consumo diario</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              stackId="a"
              barSize={8}
              className="dark:text-[#1A1A1C] text-[#E4E4E7]"
              dataKey="protein"
              fill="var(--color-protein)"
              radius={4}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              background={{ fill: "currentColor", radius: 4 }}
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="carbohydrates"
              fill="var(--color-carbohydrates)"
              radius={4}
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="fat"
              fill="var(--color-fat)"
              radius={4}
              overflow="visible"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const CustomGradientBar = (
  props: React.SVGProps<SVGRectElement> & {
    dataKey?: string;
    activeProperty?: ActiveProperty | null;
    glowOpacity?: number;
  },
) => {
  const { fill, x, y, width, height, dataKey, activeProperty, radius } = props;

  const isActive = activeProperty === "all" ? true : activeProperty === dataKey;

  return (
    <>
      <rect
        x={x}
        y={y}
        rx={radius}
        width={width}
        height={height}
        stroke="none"
        fill={fill}
        opacity={isActive ? 1 : 0.1}
        filter={
          isActive && activeProperty !== "all"
            ? `url(#glow-chart-${dataKey})`
            : undefined
        }
      />
      <defs>
        <filter
          id={`glow-chart-${dataKey}`}
          x="-200%"
          y="-200%"
          width="600%"
          height="600%"
        >
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </>
  );
};
