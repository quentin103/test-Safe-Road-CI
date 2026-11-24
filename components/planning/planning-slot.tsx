import { DriverAvatar } from "@/components/planning/driver-avatar"
import { Icon } from "@/components/ui/icon"
import type { PlannedDriver } from "@/lib/planning/types"
import { cn } from "@/lib/utils"

const slotBase =
  "flex h-10 w-full items-center rounded-xl px-2 text-xs outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50"

type AssignedSlotProps = {
  driver: PlannedDriver
  /** Texte de la case : fin de numéro (vue par véhicule) ou plaque (vue par conducteur). */
  label: string
  /** Nom accessible complet de la case. */
  ariaLabel: string
  past: boolean
  regularized: boolean
  showAvatar?: boolean
  onOpen: () => void
}

/** Case avec un conducteur : sa pastille et sa fin de numéro ; une petite icône s'il a été changé après coup. */
export function AssignedSlot({
  driver,
  label,
  ariaLabel,
  past,
  regularized,
  showAvatar = true,
  onOpen,
}: AssignedSlotProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={ariaLabel}
      data-driver-tone={driver.tone}
      className={cn(
        slotBase,
        "gap-1.5 overflow-hidden text-left hover:brightness-[0.97]",
        past ? "bg-(color:--driver-soft)/55 text-soft-foreground" : "bg-(color:--driver-soft) font-bold"
      )}
    >
      {showAvatar && <DriverAvatar driver={driver} faded={past} />}
      <span className="min-w-0 flex-1 truncate tabular-nums">{label}</span>
      {regularized && (
        <Icon icon="refresh-linear" className="size-3.5 shrink-0 text-(color:--driver)" aria-hidden="true" />
      )}
    </button>
  )
}

/** Case sans conducteur, aujourd'hui ou à venir : bouton « Ajouter ». */
export function FreeSlot({ ariaLabel, onAssign }: { ariaLabel: string; onAssign: () => void }) {
  return (
    <button
      type="button"
      onClick={onAssign}
      aria-label={ariaLabel}
      className={cn(
        slotBase,
        "justify-center gap-1 border border-dashed border-border font-semibold text-muted-foreground hover:border-sage hover:bg-accent/50 hover:text-sage"
      )}
    >
      <Icon icon="add-linear" className="size-3.5" />
      Ajouter
    </button>
  )
}

/** Case libre d'un jour passé : rien à faire. */
export function PastFreeSlot() {
  return (
    <span aria-label="Sans conducteur" className={cn(slotBase, "justify-center bg-muted/60 text-stone")}>
      —
    </span>
  )
}
