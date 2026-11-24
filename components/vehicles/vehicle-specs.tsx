import { Icon } from "@/components/ui/icon"
import type { Vehicle } from "@/lib/vehicles/types"
import { fuelLabels, vehicleKindLabels } from "@/lib/vehicles/vehicle"
import { cn } from "@/lib/utils"

/** Catégorie en gras, puis carburant et nombre de places. */
export function VehicleSpecs({ vehicle, className }: { vehicle: Vehicle; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="flex items-center gap-1.5 text-[13px] leading-tight font-bold">
        <Icon icon="tag-linear" className="size-3.5 text-soft-foreground" />
        {vehicleKindLabels[vehicle.kind]}
      </span>
      <span className="flex items-center gap-3 text-xs leading-tight text-soft-foreground">
        <span className="flex items-center gap-1">
          <Icon icon="gas-station-linear" className="size-3.5" />
          {fuelLabels[vehicle.fuel]}
        </span>
        <span className="flex items-center gap-1">
          <Icon icon="armchair-linear" className="size-3.5" />
          {vehicle.seats} places
        </span>
      </span>
    </div>
  )
}
