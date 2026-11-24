"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"

const hidden = [
  { icon: "eye-closed-linear", label: "Quel téléphone est silencieux" },
  { icon: "user-cross-rounded-linear", label: "À quel conducteur il appartient" },
  { icon: "map-point-linear", label: "La dernière position du téléphone" },
]

/** Bouton « Ce que vous ne voyez pas » : ce que la page ne montre jamais. */
export function DevicesPrivacyPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            aria-label="Ce que l’écran ne montre jamais"
            className="h-11 gap-1.5 rounded-full border-transparent bg-card px-3 text-[13px] font-semibold sm:px-4"
          />
        }
      >
        <Icon icon="shield-check-linear" className="size-4.5 text-primary" />
        <span className="hidden sm:inline">Ce que vous ne voyez pas</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-76 gap-3 rounded-xl p-3.5">
        <PopoverTitle className="flex items-center gap-2 text-sm font-bold">
          <Icon icon="shield-check-linear" className="size-4.5 text-primary" />
          Ce que l’écran ne montre jamais
        </PopoverTitle>
        <ul className="flex flex-col gap-2">
          {hidden.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-[13px]">
              <IconBubble icon={item.icon} tone="danger" size="sm" />
              {item.label}
            </li>
          ))}
        </ul>
        <p className="text-xs leading-snug text-muted-foreground">
          Des nombres seulement : la page dit combien de téléphones sont silencieux, jamais lesquels.
        </p>
      </PopoverContent>
    </Popover>
  )
}
