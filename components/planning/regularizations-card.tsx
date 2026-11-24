import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardLink } from "@/components/ui/card-link"
import { Icon } from "@/components/ui/icon"
import { Timeline } from "@/components/ui/timeline"
import { formatRelativeDateTime, formatShortDay } from "@/lib/format"
import { driverLabel } from "@/lib/planning/planning"
import type { PlannedDriver, PlanningVehicle, Regularization } from "@/lib/planning/types"
import { cn } from "@/lib/utils"

type RegularizationsCardProps = {
  regularizations: Regularization[]
  vehicles: PlanningVehicle[]
  drivers: PlannedDriver[]
  today: string
  /** Nombre de changements affichés, les plus récents d'abord. */
  limit?: number
  className?: string
}

/** Conducteurs changés une fois le jour commencé : prévu → réel, quand et pourquoi. */
export function RegularizationsCard({
  regularizations,
  vehicles,
  drivers,
  today,
  limit = 4,
  className,
}: RegularizationsCardProps) {
  const recent = [...regularizations].sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit)
  const plate = (id: string) => vehicles.find((item) => item.id === id)?.plate ?? "—"
  const label = (id: string) => {
    const driver = drivers.find((item) => item.id === id)
    return driver ? driverLabel(driver) : "—"
  }

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader className="items-center">
        <CardTitle className="flex items-center gap-2">
          <Icon icon="history-linear" className="size-4.5 text-primary" />
          <h2>Changements après coup</h2>
        </CardTitle>
        <CardAction className="row-span-1 self-center">
          <CardLink href="#">Tout l’historique</CardLink>
        </CardAction>
      </CardHeader>
      <CardContent>
        {recent.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
            Aucun changement pour le moment.
          </p>
        ) : (
          <Timeline
            items={recent.map((item) => ({
              id: item.id,
              icon: "refresh-linear",
              title: (
                <span className="flex flex-wrap items-center gap-x-1.5">
                  <span className="font-bold">{plate(item.vehicleId)}</span>
                  <span className="text-muted-foreground">{formatShortDay(item.date)} :</span>
                  <span className="text-muted-foreground line-through">{label(item.fromDriverId)}</span>
                  <Icon icon="arrow-right-linear" className="size-3.5 text-soft-foreground" aria-label="remplacé par" />
                  <span>{label(item.toDriverId)}</span>
                </span>
              ),
              meta: `${item.reason} · par ${item.by}, ${formatRelativeDateTime(item.at, today)}`,
            }))}
          />
        )}
      </CardContent>
    </Card>
  )
}
