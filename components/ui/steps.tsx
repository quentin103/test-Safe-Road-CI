import type { ReactNode } from "react"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

type StepItem = {
  icon: string
  title: ReactNode
  description?: ReactNode
}

/** Étapes numérotées présentées en tuiles (mode d'emploi court). */
function Steps({ items, className }: { items: StepItem[]; className?: string }) {
  return (
    <ol
      data-slot="steps"
      className={cn("grid gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]", className)}
    >
      {items.map((item, index) => (
        <li key={index} className="flex flex-col gap-1.5 rounded-xl bg-muted p-3">
          <div className="mb-0.5 flex items-center gap-2" aria-hidden="true">
            <span className="flex size-6.5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground tabular-nums">
              {index + 1}
            </span>
            <Icon icon={item.icon} className="size-4.5 text-primary" />
          </div>
          <span className="text-[13px] leading-tight font-bold">{item.title}</span>
          {item.description && (
            <span className="text-xs leading-snug text-muted-foreground">{item.description}</span>
          )}
        </li>
      ))}
    </ol>
  )
}

export { Steps }
export type { StepItem }
