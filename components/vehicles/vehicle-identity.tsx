import { Icon } from "@/components/ui/icon"
import { LicensePlate } from "@/components/vehicles/license-plate"
import type { Vehicle } from "@/lib/vehicles/types"
import { getVehicleIcon } from "@/lib/vehicles/vehicle"
import { cn } from "@/lib/utils"

/** Tuile d'icône du véhicule (voiture ou minibus). */
export function VehicleIcon({ kind, className }: { kind: Vehicle["kind"]; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl bg-sand text-ochre",
        className
      )}
    >
      <Icon icon={getVehicleIcon(kind)} className="size-5" />
    </span>
  )
}

/** Icône, plaque, puis marque, modèle et année. */
export function VehicleIdentity({ vehicle, className }: { vehicle: Vehicle; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <VehicleIcon kind={vehicle.kind} />
      <div className="flex min-w-0 flex-col gap-1">
        <LicensePlate plate={vehicle.plate} />
        <span className="truncate text-xs leading-tight text-soft-foreground">
          {vehicle.make} {vehicle.model} · {vehicle.year}
        </span>
      </div>
    </div>
  )
}
