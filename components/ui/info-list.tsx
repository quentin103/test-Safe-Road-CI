import type { ReactNode } from "react"

import { IconBubble, type IconBubbleProps } from "@/components/ui/icon-bubble"
import { cn } from "@/lib/utils"

type InfoListItem = {
  icon: string
  tone?: IconBubbleProps["tone"]
  title: ReactNode
  description?: ReactNode
}

/** Liste d'explications compacte : pastille d'icône, titre et précision. */
function InfoList({ items, className }: { items: InfoListItem[]; className?: string }) {
  return (
    <ul data-slot="info-list" className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <IconBubble
            icon={item.icon}
            tone={item.tone ?? "muted"}
            size="sm"
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[13px] leading-tight font-semibold">{item.title}</span>
            {item.description && (
              <span className="text-xs leading-snug text-muted-foreground">{item.description}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export { InfoList }
export type { InfoListItem }
