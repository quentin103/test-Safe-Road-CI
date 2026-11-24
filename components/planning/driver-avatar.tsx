import { driverCode, driverLabel } from "@/lib/planning/planning"
import type { PlannedDriver } from "@/lib/planning/types"
import { cn } from "@/lib/utils"

type DriverAvatarProps = {
  driver: PlannedDriver
  size?: "sm" | "md"
  /** Teinte adoucie (jour passé, affectation remplacée). */
  faded?: boolean
  className?: string
}

/** Pastille ronde aux deux derniers chiffres du conducteur, dans sa teinte. */
export function DriverAvatar({ driver, size = "md", faded = false, className }: DriverAvatarProps) {
  return (
    <span
      aria-hidden="true"
      data-driver-tone={driver.tone}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold text-primary-foreground tabular-nums",
        size === "sm" ? "size-5 text-[9px]" : "size-6 text-[10px]",
        faded ? "bg-(color:--driver)/65" : "bg-(color:--driver)",
        className
      )}
    >
      {driverCode(driver)}
    </span>
  )
}

type DriverChipProps = {
  driver: PlannedDriver
  faded?: boolean
  /** Barré : conducteur remplacé par une régularisation. */
  struck?: boolean
  className?: string
}

/** Pastille et fin de numéro (« …63 05 ») : identification d'un conducteur. */
export function DriverChip({ driver, faded = false, struck = false, className }: DriverChipProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap", className)}>
      <DriverAvatar driver={driver} size="sm" faded={faded || struck} />
      <span className={cn("tabular-nums", struck && "text-muted-foreground line-through")}>
        {driverLabel(driver)}
      </span>
    </span>
  )
}
