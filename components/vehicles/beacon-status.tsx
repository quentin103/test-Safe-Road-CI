import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import type { BeaconStatus, Vehicle } from "@/lib/vehicles/types"
import { beaconStatusLabels, getBeaconStatus } from "@/lib/vehicles/vehicle"
import { cn } from "@/lib/utils"

const badgeStyles = {
  inventoried: { variant: "success", icon: "check-circle-linear", className: "text-primary" },
  pending: { variant: "warning", icon: "hourglass-linear", className: "" },
  none: { variant: "danger", icon: "danger-triangle-linear", className: "" },
} as const

/** Pastille d'état de la balise : inventoriée, à inventorier ou absente. */
export function BeaconBadge({ status, className }: { status: BeaconStatus; className?: string }) {
  const style = badgeStyles[status]
  return (
    <Badge
      variant={style.variant}
      className={cn("h-5.5 gap-1 px-2 text-xs font-bold [&>svg]:size-3.5!", style.className, className)}
    >
      <Icon icon={style.icon} />
      {beaconStatusLabels[status]}
    </Badge>
  )
}

/** Numéro de la balise (ou « Aucune balise ») et son état. */
export function BeaconStatusCell({ vehicle, className }: { vehicle: Vehicle; className?: string }) {
  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <span className="flex items-center gap-1.5 font-mono text-xs leading-tight font-bold tracking-wide">
        <Icon icon="bluetooth-wave-linear" className="size-3.5 text-soft-foreground" />
        {vehicle.beacon?.code ?? "Aucune balise"}
      </span>
      <BeaconBadge status={getBeaconStatus(vehicle)} />
    </div>
  )
}
