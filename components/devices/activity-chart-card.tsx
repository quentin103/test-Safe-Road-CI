"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, type ChartConfig } from "@/components/ui/chart"
import { Icon } from "@/components/ui/icon"
import type { DailyActivity } from "@/lib/devices/types"
import { formatNumber, formatPercent, formatShortDay } from "@/lib/format"
import { cn } from "@/lib/utils"

const chartConfig = {
  active: { label: "Actifs", color: "var(--sage)" },
  silent: { label: "Silencieux", color: "var(--bronze)" },
} satisfies ChartConfig

type ActivityChartCardProps = {
  activity: DailyActivity[]
  className?: string
}

/** Téléphones actifs ou silencieux chaque jour, sur 14 jours, avec trois repères. */
export function ActivityChartCard({ activity, className }: ActivityChartCardProps) {
  const total = (day: DailyActivity) => day.active + day.silent
  const ratio = (day: DailyActivity) => (total(day) > 0 ? day.active / total(day) : 0)
  const average = activity.reduce((sum, day) => sum + day.active, 0) / Math.max(1, activity.length)
  const best = activity.reduce((a, b) => (ratio(b) > ratio(a) ? b : a), activity[0])
  const worst = activity.reduce((a, b) => (ratio(b) < ratio(a) ? b : a), activity[0])
  const max = Math.max(...activity.map(total))

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="chart-2-linear" className="size-4.5 text-primary" />
          <h2>Activité des {activity.length} derniers jours</h2>
        </CardTitle>
        <CardDescription>Téléphones suivis chaque jour, actifs ou silencieux sur 48 h glissantes</CardDescription>
        <CardAction>
          <ul className="flex gap-3 text-xs text-soft-foreground">
            {(Object.keys(chartConfig) as (keyof typeof chartConfig)[]).map((key) => (
              <li key={key} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-2.5 rounded-[3px]" style={{ backgroundColor: chartConfig[key].color }} />
                {chartConfig[key].label}
              </li>
            ))}
          </ul>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-44 w-full" aria-label="Téléphones actifs et silencieux par jour">
          <BarChart data={activity} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="22%">
            <CartesianGrid vertical={false} stroke="var(--track)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(date: string) => formatShortDay(date).replace(/ \S+$/, "")}
              className="text-[11px]"
            />
            <YAxis width={24} tickLine={false} axisLine={false} domain={[0, max]} ticks={[0, Math.round(max / 2), max]} className="text-[11px]" />
            <ChartTooltip cursor={{ fill: "var(--muted)" }} content={<ActivityTooltip />} />
            <Bar dataKey="active" stackId="day" fill="var(--color-active)" />
            <Bar dataKey="silent" stackId="day" fill="var(--color-silent)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardContent className="grid gap-2 sm:grid-cols-3">
        <Figure label={`Moyenne sur ${activity.length} jours`} value={`${formatNumber(average, 1)} actifs par jour`} />
        <Figure label="Meilleur jour" value={`${formatShortDay(best.date)} · ${formatPercent(ratio(best))}`} />
        <Figure label="Jour le plus faible" value={`${formatShortDay(worst.date)} · ${formatPercent(ratio(worst))}`} />
      </CardContent>
    </Card>
  )
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl bg-muted px-3 py-2">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-[13px] font-bold">{value}</span>
    </div>
  )
}

function ActivityTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: DailyActivity }> }) {
  const day = active ? payload?.[0]?.payload : undefined
  if (!day) return null
  return (
    <div className="rounded-lg bg-foreground px-2.5 py-2 text-xs text-primary-foreground shadow-md">
      <p className="font-bold">{formatShortDay(day.date)}</p>
      <p>
        {formatNumber(day.active)} actifs · {formatNumber(day.silent)} silencieux
      </p>
    </div>
  )
}
