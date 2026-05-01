import * as React from "react";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  }
};

export function ChartContainer({ children }: { children: React.ReactNode, config: ChartConfig }) {
  return <div>{children}</div>;
}

export function ChartTooltip() {
  return null;
}

export function ChartTooltipContent() {
  return null;
}

export function ChartLegend() {
  return null;
}

export function ChartLegendContent() {
  return null;
}

export function ChartStyle() {
  return null;
}