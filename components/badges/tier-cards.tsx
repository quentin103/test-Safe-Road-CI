import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { tierColorClass, tierSoftColorClass } from "@/lib/badges/badges"
import type { MonthlyBadges, TierDefinition } from "@/lib/badges/types"
import { MASKED_COUNT_LABEL, formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"

type TierCardsProps = {
  tiers: TierDefinition[]
  month: MonthlyBadges
}

/** Les quatre paliers, avec le nombre de conducteurs qui l'ont atteint le mois affiché. */
export function TierCards({ tiers, month }: TierCardsProps) {
  return (
    <section aria-label="Conducteurs par palier" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {tiers.map((tier) => {
        const count = month.counts[tier.tier]
        return (
          <Card key={tier.tier} className="relative gap-2.5 [--card-spacing:--spacing(4)]">
            <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-1", tierColorClass[tier.tier])} />
            <CardContent className="flex items-center gap-3">
              <IconBubble
                icon="medal-ribbons-star-linear"
                size="lg"
                className={cn("text-foreground/80", tierSoftColorClass[tier.tier])}
              />
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
                  Palier {tier.rank}
                </span>
                <h2 className="text-base leading-tight font-bold">{tier.label}</h2>
              </div>
            </CardContent>
            <CardContent>
              {count === null ? (
                <p className="flex min-h-6 items-center gap-2">
                  <Icon icon="lock-linear" className="size-4 text-muted-foreground" />
                  <span className="text-lg leading-none font-bold">{MASKED_COUNT_LABEL}</span>
                  <span className="text-xs text-muted-foreground">conducteurs</span>
                </p>
              ) : (
                <p className="flex min-h-6 items-baseline gap-1.5">
                  <span className="text-[22px] leading-none font-bold tabular-nums">{formatNumber(count)}</span>
                  <span className="text-xs text-muted-foreground">
                    {count === 0 ? "conducteur pour l’instant" : `conducteur${count > 1 ? "s" : ""}`}
                  </span>
                </p>
              )}
            </CardContent>
            <CardContent className="border-t border-track pt-2.5">
              <p className="text-xs leading-snug text-soft-foreground">{tier.requirement}</p>
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
