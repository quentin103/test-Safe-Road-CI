import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeltaBadge } from "@/components/ui/delta-badge"
import { IconBubble } from "@/components/ui/icon-bubble"
import { Meter } from "@/components/ui/meter"
import type { EventType } from "@/lib/dashboard/types"
import { formatNumber, trendTone } from "@/lib/format"

/** Échelle des jauges : 1 événement pour 100 km remplit la barre. */
const EVENTS_SCALE_MAX = 1

type EventTypesCardProps = {
  eventTypes: EventType[]
  className?: string
}

/** Événements pour 100 km par nature, avec la variation sur la période précédente. */
export function EventTypesCard({ eventTypes, className }: EventTypesCardProps) {
  return (
    <Card id="evenements-par-nature" className={className}>
      <CardHeader>
        <CardTitle>
          <h2>Événements par nature</h2>
        </CardTitle>
        <CardDescription>Pour 100 km, comparé à la période précédente</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-2.5">
        {eventTypes.map((event) => {
          const value = formatNumber(event.value, 1)
          return (
            <div key={event.key} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <IconBubble icon={event.icon} size="sm" />
                <span className="flex-1 text-[13px] font-medium">{event.label}</span>
                <span className="text-sm font-bold tabular-nums">{value}</span>
                <DeltaBadge value={event.delta} goodWhen="down" />
              </div>
              <div className="pl-9">
                <Meter
                  value={event.value}
                  max={EVENTS_SCALE_MAX}
                  tone={trendTone(event.delta, "down")}
                  label={`${event.label} : ${value} pour 100 km`}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
