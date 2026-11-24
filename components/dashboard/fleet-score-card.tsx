import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { ScoreRing } from "@/components/ui/score-ring"
import type { FleetScore, Kpi } from "@/lib/dashboard/types"
import { formatDelta, formatNumber, formatPercentDelta } from "@/lib/format"
import { cn } from "@/lib/utils"

type FleetScoreCardProps = {
  score: FleetScore
  kpis: Kpi[]
  className?: string
}

/** Carte vedette : score moyen de la flotte, faits marquants et indicateurs clés. */
export function FleetScoreCard({ score, kpis, className }: FleetScoreCardProps) {
  return (
    <Card
      className={cn(
        "relative bg-primary text-primary-foreground [--card-gap:--spacing(4)] [--card-spacing:--spacing(5)]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full border border-sage"
      />

      <CardContent className="relative flex flex-wrap items-center gap-5">
        <ScoreRing
          value={score.value}
          max={score.max}
          label={`Score moyen de la flotte : ${score.value} sur ${score.max}`}
          size={112}
          thickness={11}
          trackClassName="text-sage"
          indicatorClassName="text-primary-foreground"
        >
          <span className="text-[30px] leading-none font-bold">{score.value}</span>
          <span className="text-[11px] text-mist">sur {score.max}</span>
        </ScoreRing>

        <div className="flex min-w-60 flex-1 flex-col gap-2">
          <Badge className="h-5.5 gap-1 bg-card px-2 text-[11px] font-bold text-primary [&>svg]:size-3!">
            <Icon icon="course-up-linear" />
            {formatDelta(score.delta)} pts sur la semaine
          </Badge>
          <h2 className="text-lg leading-6 font-semibold">{score.headline}</h2>
          <ul className="flex flex-col gap-1 text-[13px] leading-[1.4] text-primary-foreground/90">
            {score.insights.map((insight) => (
              <li key={insight.text} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-[6px] size-1.5 shrink-0 rounded-full",
                    insight.tone === "positive" ? "bg-fern" : "bg-danger-subtle"
                  )}
                />
                {insight.text}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardContent className="relative grid gap-2 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col gap-0.5 rounded-[0.875rem] bg-primary-tile px-3 py-2.5"
          >
            <span className="text-[11px] text-mist">{kpi.label}</span>
            <span className="flex flex-wrap items-baseline gap-2">
              <span className="text-lg leading-6 font-bold">
                {formatNumber(kpi.value, kpi.fractionDigits)}
              </span>
              {kpi.change && (
                <span className="text-[11px] font-bold">{formatKpiChange(kpi.change)}</span>
              )}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function formatKpiChange(change: NonNullable<Kpi["change"]>) {
  if ("note" in change) return change.note
  if ("ratio" in change) return formatPercentDelta(change.ratio)
  return formatDelta(change.delta, change.fractionDigits)
}
