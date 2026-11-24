import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardLink } from "@/components/ui/card-link"
import { IconBubble } from "@/components/ui/icon-bubble"
import type { BadgeTier, FleetBadge } from "@/lib/dashboard/types"
import { formatCount } from "@/lib/format"
import { cn } from "@/lib/utils"

const tierClass: Record<BadgeTier, string> = {
  bronze: "bg-bronze",
  silver: "bg-silver",
  gold: "bg-gold",
  platinum: "bg-platinum",
}

type FleetBadgesCardProps = {
  badges: FleetBadge[]
  className?: string
}

/** Répartition des badges obtenus par les conducteurs, par palier. */
export function FleetBadgesCard({ badges, className }: FleetBadgesCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="items-baseline">
        <CardTitle>
          <h2>Badges de la flotte</h2>
        </CardTitle>
        <CardAction className="row-span-1">
          <CardLink href="/badges">Détail</CardLink>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ul className="grid w-full grid-cols-4 gap-2">
          {badges.map((badge) => (
            <li key={badge.tier} className="flex flex-col items-center gap-1 text-center">
              <IconBubble
                icon="star-linear"
                size="lg"
                className={cn("text-foreground", tierClass[badge.tier])}
              />
              <span className="text-[11px] text-muted-foreground">{badge.label}</span>
              <span
                className={cn(
                  "font-bold tabular-nums",
                  badge.count === null ? "text-[11px] leading-[1.2]" : "text-base leading-[1.2]"
                )}
              >
                {formatCount(badge.count)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
