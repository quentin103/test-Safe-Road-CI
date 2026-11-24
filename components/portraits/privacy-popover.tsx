"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Steps } from "@/components/ui/steps"

const never = [
  { icon: "routing-linear", label: "Un trajet ou un parcours" },
  { icon: "map-point-linear", label: "Un lieu ou une position" },
  { icon: "clock-circle-linear", label: "Un horaire de conduite" },
  { icon: "calendar-linear", label: "Un événement daté" },
]

const steps = [
  { icon: "user-id-linear", title: "Il ouvre son profil", description: "Dans l’application Safe Road CI, rubrique « Mon portrait »." },
  { icon: "eye-linear", title: "Il choisit sa flotte", description: "Il voit exactement ce qui sera montré avant d’accepter." },
  { icon: "hand-shake-linear", title: "Il garde la main", description: "Un geste suffit pour retirer l’accord, sans justification." },
]

/** Bouton « Comment ça marche » : le partage côté conducteur, et ce qu'un portrait ne contient jamais. */
export function PortraitsPrivacyPopover() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            aria-label="Comment un conducteur partage son portrait"
            className="h-11 gap-1.5 rounded-full border-transparent bg-card px-3 text-[13px] font-semibold sm:px-4"
          />
        }
      >
        <Icon icon="shield-check-linear" className="size-4.5 text-primary" />
        <span className="hidden sm:inline">Comment ça marche</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-88 gap-3 rounded-xl p-3.5">
        <PopoverTitle className="flex items-center gap-2 text-sm font-bold">
          <Icon icon="smartphone-linear" className="size-4.5 text-primary" />
          Le conducteur décide, dans son application
        </PopoverTitle>
        <Steps items={steps} className="grid-cols-1 gap-1.5 sm:grid-cols-1 [&_li]:p-2.5" />
        <div className="flex flex-col gap-2 border-t border-track pt-3">
          <p className="flex items-center gap-2 text-[13px] font-bold">
            <Icon icon="shield-check-linear" className="size-4 text-primary" />
            Jamais dans un portrait
          </p>
          <ul className="flex flex-col gap-1.5">
            {never.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-[13px]">
                <IconBubble icon={item.icon} tone="danger" size="sm" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}
