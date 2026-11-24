import type { ReactNode } from "react"

import { LicensePlate } from "@/components/vehicles/license-plate"
import { VehicleIcon } from "@/components/vehicles/vehicle-identity"
import { formatLongDay } from "@/lib/format"
import type { PlanningVehicle } from "@/lib/planning/types"

/** Rappel de la case ouverte : véhicule, jour et, en option, détail à droite. */
export function SlotSummary({
  vehicle,
  date,
  children,
}: {
  vehicle: PlanningVehicle
  date: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl bg-muted p-3">
      <VehicleIcon kind={vehicle.kind} className="size-9 bg-card [&_svg]:size-4.5" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <LicensePlate plate={vehicle.plate} className="h-5.5 text-xs" />
        <span className="text-xs text-soft-foreground">
          {vehicle.make} {vehicle.model} · {formatLongDay(date)}
        </span>
      </div>
      {children}
    </div>
  )
}

/** Note d'avertissement pour un véhicule sans balise. */
export function NoBeaconNote() {
  return (
    <p className="rounded-xl bg-sand px-3 py-2 text-xs leading-snug text-sand-foreground">
      Ce véhicule n’a pas de balise : l’affectation ne servira aux co-trajets qu’une fois la balise posée.
    </p>
  )
}
