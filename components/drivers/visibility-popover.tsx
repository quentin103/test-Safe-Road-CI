"use client"

import { Button } from "@/components/ui/button"
import { CardLink } from "@/components/ui/card-link"
import { Icon } from "@/components/ui/icon"
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const items: { label: string; visible: boolean }[] = [
  { label: "Le numéro que vous avez saisi", visible: true },
  { label: "L’état de chaque invitation", visible: true },
  { label: "Le pseudonyme du conducteur", visible: false },
  { label: "Ses trajets, positions et horaires", visible: false },
  { label: "Son score individuel", visible: false },
]

/** Bouton « Ce que vous voyez » : rappel, à la demande, de ce que le gestionnaire voit d'un conducteur. */
export function VisibilityPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            aria-label="Ce que vous voyez d’un conducteur"
            className="h-11 gap-1.5 rounded-full border-transparent bg-card px-3 text-[13px] font-semibold sm:px-4"
          />
        }
      >
        <Icon icon="shield-check-linear" className="size-4.5 text-primary" />
        <span className="hidden sm:inline">Ce que vous voyez</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-76 gap-3 rounded-xl p-3.5">
        <PopoverTitle className="flex items-center gap-2 text-sm font-bold">
          <Icon icon="shield-check-linear" className="size-4.5 text-primary" />
          Ce que vous voyez d’un conducteur
        </PopoverTitle>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-[13px]">
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full",
                  item.visible ? "bg-accent text-primary" : "bg-danger-soft text-danger-soft-foreground"
                )}
              >
                <Icon icon={item.visible ? "check-linear" : "close-linear"} className="size-3.5" />
              </span>
              <span className="sr-only">{item.visible ? "Visible :" : "Jamais visible :"}</span>
              {item.label}
            </li>
          ))}
        </ul>
        <CardLink href="/portraits" className="text-xs">
          Un conducteur peut choisir de partager son portrait
        </CardLink>
      </PopoverContent>
    </Popover>
  )
}
