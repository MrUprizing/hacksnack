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

const chartData = [
  { month: "January", desktop: 342, mobile: 245, tablet: 123 },
  { month: "February", desktop: 876, mobile: 654, tablet: 234 },
  { month: "March", desktop: 512, mobile: 387, tablet: 156 },
  { month: "April", desktop: 629, mobile: 521, tablet: 267 },
  { month: "May", desktop: 458, mobile: 412, tablet: 213 },
  { month: "June", desktop: 781, mobile: 598, tablet: 321 },
  { month: "July", desktop: 394, mobile: 312, tablet: 145 },
  { month: "August", desktop: 925, mobile: 743, tablet: 150 },
  { month: "September", desktop: 647, mobile: 489, tablet: 212 },
  { month: "October", desktop: 532, mobile: 476, tablet: 187 },
  { month: "November", desktop: 803, mobile: 687, tablet: 298 },
  { month: "December", desktop: 271, mobile: 198, tablet: 123 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type ActiveProperty = keyof typeof chartConfig | "all";

export function GlowingBarChart() {
  const [activeProperty, setActiveProperty] =
    React.useState<ActiveProperty>("all");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>
            Bar Chart
            <Badge
              variant="outline"
              className="text-green-500 bg-green-500/10 border-none ml-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>5.2%</span>
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
                <SelectLabel>Properties</SelectLabel>
                <SelectItem className="text-xs" value="all">
                  All
                </SelectItem>
                <SelectItem className="text-xs" value="desktop">
                  Proteins
                </SelectItem>
                <SelectItem className="text-xs" value="mobile">
                  Carbs
                </SelectItem>
                <SelectItem className="text-xs" value="tablet">
                  Fats
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              stackId="a"
              barSize={8}
              className="dark:text-[#1A1A1C] text-[#E4E4E7]"
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={4}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              background={{ fill: "currentColor", radius: 4 }} // Only Top Bar will have background else it will give render errors
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="tablet"
              fill="var(--color-tablet)"
              radius={4}
              overflow="visible"
            />
            <Bar
              stackId="a"
              barSize={8}
              shape={<CustomGradientBar activeProperty={activeProperty} />}
              dataKey="desktop"
              fill="var(--color-desktop)"
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
