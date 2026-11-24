"use client"

import { PlanningByDriver, PlanningByVehicle, type AssignPreset } from "@/components/planning/planning-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { indexSlots } from "@/lib/planning/planning"
import type { PlannedDriver, PlanningVehicle } from "@/lib/planning/types"
import { formatWeekRange, isoWeekNumber } from "@/lib/planning/week"
import { cn } from "@/lib/utils"

export type PlanningView = "vehicle" | "driver"

type PlanningCardProps = {
  weekStart: string
  today: string
  view: PlanningView
  vehicles: PlanningVehicle[]
  drivers: PlannedDriver[]
  index: ReturnType<typeof indexSlots>
  onViewChange: (view: PlanningView) => void
  onWeekChange: (direction: -1 | 0 | 1) => void
  onOpenSlot: (vehicleId: string, date: string) => void
  onAssign: (preset: AssignPreset) => void
  onCreate: () => void
  className?: string
}

/** Semaine affichée, navigation, choix de la vue et grille d'affectations. */
export function PlanningCard({
  weekStart,
  today,
  view,
  vehicles,
  drivers,
  index,
  onViewChange,
  onWeekChange,
  onOpenSlot,
  onAssign,
  onCreate,
  className,
}: PlanningCardProps) {
  const gridProps = { weekStart, today, vehicles, drivers, index, onOpenSlot, onAssign }

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader className="flex flex-wrap items-center gap-2">
        <WeekButton direction={-1} onClick={() => onWeekChange(-1)} />
        <div aria-live="polite" className="flex min-w-0 flex-col">
          <h2 className="text-base leading-snug font-bold">Semaine {formatWeekRange(weekStart)}</h2>
          <p className="text-xs text-muted-foreground">
            Semaine {isoWeekNumber(weekStart)} · cliquez sur une case pour choisir le conducteur
          </p>
        </div>
        <WeekButton direction={1} onClick={() => onWeekChange(1)} />
        <Button
          variant="secondary"
          onClick={() => onWeekChange(0)}
          className="h-9 rounded-full px-3.5 text-[13px] font-bold text-foreground"
        >
          Aujourd’hui
        </Button>

        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          <Tabs value={view} onValueChange={(value) => onViewChange(value as PlanningView)}>
            <TabsList variant="pill" size="sm" aria-label="Organiser le planning">
              <TabsTrigger value="vehicle" className="gap-1.5">
                <Icon icon="car-linear" className="size-4" />
                Par véhicule
              </TabsTrigger>
              <TabsTrigger value="driver" className="gap-1.5">
                <Icon icon="users-group-rounded-linear" className="size-4" />
                Par conducteur
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={onCreate} className="h-9 gap-1.5 rounded-xl px-3.5 text-[13px] font-bold">
            <Icon icon="calendar-add-linear" data-icon="inline-start" className="size-4" />
            Ajouter
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {view === "vehicle" ? <PlanningByVehicle {...gridProps} /> : <PlanningByDriver {...gridProps} />}
      </CardContent>

      <CardContent>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-soft-foreground">
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block h-4 w-9 rounded-md bg-accent" />
            Une couleur par conducteur, identifié par la fin de son numéro
          </li>
          <li className="flex items-center gap-1.5">
            <Icon icon="refresh-linear" className="size-3.5" />
            Conducteur changé après coup
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="inline-block h-4 w-9 rounded-md border border-dashed border-border" />
            Personne : cliquez pour ajouter
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

function WeekButton({ direction, onClick }: { direction: -1 | 1; onClick: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      aria-label={direction < 0 ? "Semaine précédente" : "Semaine suivante"}
      className="size-9 rounded-full bg-card"
    >
      <Icon icon={direction < 0 ? "alt-arrow-left-linear" : "alt-arrow-right-linear"} className="size-4" />
    </Button>
  )
}
