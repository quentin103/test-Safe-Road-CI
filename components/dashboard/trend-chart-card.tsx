"use client"

import { Bar, CartesianGrid, Cell, ComposedChart, Line, XAxis, YAxis } from "recharts"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import type { PeriodKind, TrendPoint } from "@/lib/dashboard/types"
import { formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"

const chartConfig = {
  score: { label: "Score moyen", color: "var(--chart-1)" },
  eventsPer100Km: { label: "Événements pour 100 km", color: "var(--chart-2)" },
  current: { label: "Période affichée", color: "var(--chart-3)" },
} satisfies ChartConfig

type TrendChartCardProps = {
  data: TrendPoint[]
  periodKind: PeriodKind
  className?: string
}

const trendTitles: Record<PeriodKind, (count: number) => string> = {
  week: (count) => `Tendance des ${count} dernières semaines`,
  month: (count) => `Tendance des ${count} derniers mois`,
  quarter: (count) => `Tendance des ${count} derniers trimestres`,
}

/** Tendance sur les dernières périodes terminées : score (courbe) et événements (barres). */
export function TrendChartCard({ data, periodKind, className }: TrendChartCardProps) {
  const lastIndex = data.length - 1
  const title = trendTitles[periodKind](data.length)

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <CardTitle>
          <h2>{title}</h2>
        </CardTitle>
        <CardAction>
          <ul className="flex flex-wrap gap-3 text-xs text-soft-foreground">
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-[3px] w-4 rounded-[2px] bg-chart-1" />
              {chartConfig.score.label}
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-chart-2" />
              {chartConfig.eventsPer100Km.label}
            </li>
          </ul>
        </CardAction>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto min-h-44 w-full flex-1"
          aria-label={`${title} : score moyen et événements pour 100 km`}
        >
          <ComposedChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--track)" yAxisId="score" />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              tickMargin={8}
            />
            <YAxis
              yAxisId="score"
              domain={[50, 100]}
              ticks={[50, 75, 100]}
              tickLine={false}
              axisLine={false}
              width={28}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              yAxisId="events"
              orientation="right"
              domain={[0, 4]}
              ticks={[0, 2, 4]}
              tickLine={false}
              axisLine={false}
              width={20}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={lastIndex}
              content={<TrendTooltip />}
            />
            <Bar
              yAxisId="events"
              dataKey="eventsPer100Km"
              radius={[8, 8, 0, 0]}
              maxBarSize={32}
            >
              {data.map((point, index) => (
                <Cell
                  key={point.period}
                  fill={index === lastIndex ? "var(--color-current)" : "var(--color-eventsPer100Km)"}
                />
              ))}
            </Bar>
            <Line
              yAxisId="score"
              dataKey="score"
              type="monotone"
              stroke="var(--color-score)"
              strokeWidth={2.5}
              dot={{ r: 3.5, strokeWidth: 2.5, fill: "var(--card)", stroke: "var(--color-score)" }}
              activeDot={{ r: 5, strokeWidth: 2.5, fill: "var(--card)", stroke: "var(--color-score)" }}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function TrendTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: TrendPoint }>
}) {
  const point = active ? payload?.[0]?.payload : undefined
  if (!point) return null

  return (
    <div className="rounded-xl bg-foreground px-3 py-2 text-xs leading-[18px] text-primary-foreground shadow-lg">
      <div className="font-bold">{point.period}</div>
      <div>
        Score {point.score} · {formatNumber(point.eventsPer100Km, 1)} év./100 km
      </div>
    </div>
  )
}
