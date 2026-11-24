"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"

const hidden = [
  { icon: "eye-closed-linear", label: "Qui a quel palier" },
  { icon: "ranking-linear", label: "Un classement des conducteurs" },
  { icon: "lock-linear", label: "Un total qui ferait deviner un chiffre masqué" },
]

const driverSide = [
  "Chaque conducteur voit son palier et ce qu’il lui reste pour le suivant.",
  "Son badge reste privé : la flotte ne reçoit que des nombres.",
  "Aucun classement entre collègues, ni dans l’application ni ici.",
]

/** Bouton « Ce que vous ne voyez pas » : ce que l'écran cache, et ce que voit chaque conducteur. */
export function BadgesPrivacyPopover() {
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
      <PopoverContent align="end" className="w-80 gap-3 rounded-xl p-3.5">
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
        <div className="flex flex-col gap-1.5 border-t border-track pt-3">
          <p className="flex items-center gap-2 text-[13px] font-bold">
            <Icon icon="smartphone-linear" className="size-4 text-primary" />
            Côté conducteur
          </p>
          <ul className="flex flex-col gap-1 pl-6 text-xs leading-snug text-soft-foreground">
            {driverSide.map((text) => (
              <li key={text} className="list-disc">
                {text}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
