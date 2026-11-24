"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { InfoList } from "@/components/ui/info-list"
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"

const uses = [
  {
    icon: "users-group-rounded-linear",
    title: "Le bon conducteur reçoit ses trajets",
    description: "Quand plusieurs téléphones sont dans un véhicule, le planning dit qui conduisait.",
  },
  {
    icon: "bluetooth-wave-linear",
    title: "Il faut une balise",
    description: "Sans balise, le véhicule n’est pas reconnu et le planning ne sert pas aux trajets.",
  },
  {
    icon: "history-linear",
    title: "On peut corriger sans effacer",
    description: "Changer le conducteur d’un jour commencé garde le conducteur prévu et le motif.",
  },
]

/** Bouton « À quoi ça sert » : l'explication du planning, à la demande. */
export function PlanningGuidePopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            aria-label="À quoi sert le planning"
            className="h-11 gap-1.5 rounded-full border-transparent bg-card px-3 text-[13px] font-semibold sm:px-4"
          />
        }
      >
        <Icon icon="info-circle-linear" className="size-4.5 text-primary" />
        <span className="hidden sm:inline">À quoi ça sert</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 gap-3 rounded-xl p-3.5">
        <PopoverTitle className="flex items-center gap-2 text-sm font-bold">
          <Icon icon="info-circle-linear" className="size-4.5 text-primary" />
          À quoi sert le planning
        </PopoverTitle>
        <InfoList items={uses} />
        <p className="flex items-start gap-2 rounded-xl bg-danger-soft px-3 py-2 text-xs leading-snug font-semibold text-danger-soft-foreground">
          <Icon icon="shield-check-linear" className="size-4 shrink-0" />
          Le planning ne montre jamais où est un véhicule ni ce qu’il a fait.
        </p>
      </PopoverContent>
    </Popover>
  )
}
