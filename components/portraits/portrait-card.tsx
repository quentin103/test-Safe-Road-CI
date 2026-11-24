"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DeltaBadge } from "@/components/ui/delta-badge"
import { Icon } from "@/components/ui/icon"
import { Meter } from "@/components/ui/meter"
import { ScoreRing } from "@/components/ui/score-ring"
import { formatMonth, tierLabels, tierSoftColorClass } from "@/lib/badges/badges"
import { formatDate } from "@/lib/format"
import { levelMeterTone, monthDelta, scoreLevel, subScoreLabels, type ScoreLevel } from "@/lib/portraits/portraits"
import type { Portrait, SubScoreKey } from "@/lib/portraits/types"
import { cn } from "@/lib/utils"

const ringColor: Record<ScoreLevel, string> = {
  good: "text-primary",
  fair: "text-ochre",
  weak: "text-ochre",
}


type PortraitCardProps = {
  portrait: Portrait
  onOpen: (portrait: Portrait) => void
  className?: string
}

/** Portrait d'un conducteur : score du mois, trois sous-scores, trois derniers mois. */
export function PortraitCard({ portrait, onOpen, className }: PortraitCardProps) {
  const level = scoreLevel(portrait.score)
  const delta = monthDelta(portrait)
  const previous = portrait.history[portrait.history.length - 2]

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardContent className="flex items-center gap-3">
        <Avatar className="size-11 after:border-0">
          <AvatarFallback className="bg-accent text-sm font-bold text-primary">{portrait.initials}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="truncate text-base leading-tight font-bold">{portrait.displayName}</h2>
          <span className="flex items-center gap-1.5 text-xs text-soft-foreground">
            <Icon icon="hand-shake-linear" className="size-3.5" />
            Partagé depuis le {formatDate(portrait.sharedSince)}
          </span>
        </div>
        {portrait.tier && (
          <Badge className={cn("h-6 gap-1 px-2 text-xs font-bold text-foreground [&>svg]:size-3.5!", tierSoftColorClass[portrait.tier])}>
            <Icon icon="medal-ribbons-star-linear" />
            {tierLabels[portrait.tier]}
          </Badge>
        )}
      </CardContent>

      <CardContent className="flex items-center gap-4">
        <ScoreRing
          value={portrait.score}
          size={88}
          thickness={9}
          indicatorClassName={ringColor[level]}
          label={`Score ${portrait.score} sur 100`}
        >
          <span className="text-[26px] leading-none font-bold tabular-nums">{portrait.score}</span>
          <span className="text-[10px] text-muted-foreground">sur 100</span>
        </ScoreRing>
        <dl className="flex min-w-0 flex-1 flex-col gap-2">
          {(Object.keys(subScoreLabels) as SubScoreKey[]).map((key) => (
            <div key={key} className="grid grid-cols-[5.5rem_minmax(0,1fr)_1.75rem] items-center gap-2 text-[13px]">
              <dt className="text-soft-foreground">{subScoreLabels[key]}</dt>
              <Meter value={portrait.subScores[key]} tone={levelMeterTone[scoreLevel(portrait.subScores[key])]} label={`${subScoreLabels[key]} : ${portrait.subScores[key]} sur 100`} />
              <dd className="text-right font-bold tabular-nums">{portrait.subScores[key]}</dd>
            </div>
          ))}
        </dl>
      </CardContent>

      <CardContent className="flex flex-wrap items-end justify-between gap-3 border-t border-track pt-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">3 derniers mois</span>
          <ol className="flex items-end gap-1" aria-label="Score des trois derniers mois">
            {portrait.history.map((point, index) => {
              const last = index === portrait.history.length - 1
              return (
                <li key={point.month} className="flex flex-col items-center gap-0.5">
                  <span
                    aria-hidden="true"
                    className={cn("w-7 rounded-md", last ? "bg-primary" : "bg-mint")}
                    style={{ height: 8 + Math.round((point.score / 100) * 20) }}
                  />
                  <span className="text-[10px] text-muted-foreground capitalize">{formatMonth(point.month, { short: true })}</span>
                  <span className="sr-only">{point.score} sur 100</span>
                </li>
              )
            })}
          </ol>
        </div>
        <div className="flex items-center gap-2">
          {delta !== null && previous && (
            <span className="flex items-center gap-1 text-xs text-soft-foreground">
              <DeltaBadge value={delta} fractionDigits={0} className="h-6 px-2 text-xs" />
              <span>
                vs <span className="capitalize">{formatMonth(previous.month, { short: true })}</span>
              </span>
            </span>
          )}
          <Button
            variant="outline"
            onClick={() => onOpen(portrait)}
            aria-label={`Voir le portrait de ${portrait.displayName}`}
            className="h-8 gap-1 rounded-lg bg-card px-3 text-[13px] font-bold"
          >
            Voir
            <Icon icon="alt-arrow-right-linear" data-icon="inline-end" className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
