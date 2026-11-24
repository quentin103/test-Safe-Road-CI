"use client"

import { useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Meter } from "@/components/ui/meter"
import { ScoreRing } from "@/components/ui/score-ring"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formatMonth, tierLabels, tierSoftColorClass } from "@/lib/badges/badges"
import { formatDate } from "@/lib/format"
import { levelMeterTone, scoreLevel, subScoreLabels } from "@/lib/portraits/portraits"
import type { Portrait, SubScoreKey } from "@/lib/portraits/types"
import { cn } from "@/lib/utils"

const readings: Record<SubScoreKey, string> = {
  braking: "Freinages brusques rares : la distance de sécurité est respectée.",
  speed: "Vitesse adaptée à la route la plupart du temps.",
  acceleration: "Départs en douceur, sans à-coups.",
}

type PortraitSheetProps = {
  portrait: Portrait | null
  month: string
  onClose: () => void
}

/** Détail d'un portrait partagé : le même contenu que la carte, lu mois par mois. */
export function PortraitSheet({ portrait, month, onClose }: PortraitSheetProps) {
  const [shown, setShown] = useState(portrait)
  if (portrait && portrait !== shown) setShown(portrait)

  return (
    <Sheet
      open={portrait !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <SheetContent className="gap-0 bg-card data-[side=right]:w-full data-[side=right]:sm:max-w-sm">
        {shown && (
          <>
            <SheetHeader className="flex-row items-center gap-3 border-b border-track p-4 pr-12">
              <Avatar className="size-11 after:border-0">
                <AvatarFallback className="bg-accent text-sm font-bold text-primary">{shown.initials}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col gap-0.5">
                <SheetTitle className="text-base leading-tight font-bold">{shown.displayName}</SheetTitle>
                <SheetDescription className="text-xs">
                  Portrait de {formatMonth(month)} · partagé depuis le {formatDate(shown.sharedSince)}
                </SheetDescription>
              </div>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              <section className="flex items-center gap-4 rounded-xl bg-muted p-3">
                <ScoreRing
                  value={shown.score}
                  size={80}
                  thickness={8}
                  indicatorClassName={scoreLevel(shown.score) === "good" ? "text-primary" : "text-ochre"}
                  trackClassName="text-card"
                >
                  <span className="text-2xl leading-none font-bold tabular-nums">{shown.score}</span>
                  <span className="text-[10px] text-muted-foreground">sur 100</span>
                </ScoreRing>
                <div className="flex flex-col gap-1.5">
                  {shown.tier && (
                    <Badge className={cn("h-6 w-fit gap-1 px-2 text-xs font-bold text-foreground [&>svg]:size-3.5!", tierSoftColorClass[shown.tier])}>
                      <Icon icon="medal-ribbons-star-linear" />
                      Palier {tierLabels[shown.tier]}
                    </Badge>
                  )}
                  <p className="text-xs leading-snug text-soft-foreground">
                    Score moyen du mois, calculé sur les trajets détectés. Le conducteur voit la même chose dans son application.
                  </p>
                </div>
              </section>

              <section className="flex flex-col gap-2.5">
                <h3 className="text-sm font-bold">Sous-scores</h3>
                {(Object.keys(subScoreLabels) as SubScoreKey[]).map((key) => (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-semibold">{subScoreLabels[key]}</span>
                      <span className="font-bold tabular-nums">{shown.subScores[key]}</span>
                    </div>
                    <Meter value={shown.subScores[key]} tone={levelMeterTone[scoreLevel(shown.subScores[key])]} label={`${subScoreLabels[key]} : ${shown.subScores[key]} sur 100`} />
                    <span className="text-xs text-muted-foreground">{readings[key]}</span>
                  </div>
                ))}
              </section>

              <section className="flex flex-col gap-2">
                <h3 className="text-sm font-bold">Les 3 derniers mois</h3>
                <ol className="grid grid-cols-3 gap-2">
                  {shown.history.map((point) => (
                    <li key={point.month} className="flex flex-col items-center rounded-xl bg-muted px-2 py-2">
                      <span className="text-lg leading-none font-bold tabular-nums">{point.score}</span>
                      <span className="text-[11px] text-muted-foreground capitalize">{formatMonth(point.month, { short: true })}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <p className="mt-auto flex items-start gap-2 rounded-xl bg-accent/70 p-3 text-xs leading-snug text-soft-foreground">
                <Icon icon="hand-shake-linear" className="size-4 shrink-0 text-primary" />
                Ce portrait est visible parce que le conducteur l’a décidé. Il peut retirer son accord à tout moment, sans justification.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
