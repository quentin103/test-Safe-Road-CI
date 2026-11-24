import type { ReactNode } from "react"

import { IconBubble, type IconBubbleProps } from "@/components/ui/icon-bubble"
import { cn } from "@/lib/utils"

type TimelineItem = {
  id: string
  icon: string
  tone?: IconBubbleProps["tone"]
  title: ReactNode
  meta?: ReactNode
}

/** Fil chronologique vertical : pastilles reliées par un trait. */
function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol data-slot="timeline" className={cn("flex flex-col", className)}>
      {items.map((item, index) => (
        <li key={item.id} className="relative flex gap-2.5 pb-3.5 last:pb-0">
          {index < items.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute top-8 bottom-0 left-[15px] w-0.5 bg-track"
            />
          )}
          <IconBubble icon={item.icon} tone={item.tone ?? "muted"} className="size-8 [&_svg]:size-4" />
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[13px] leading-tight font-semibold">{item.title}</span>
            {item.meta && <span className="text-xs leading-tight text-muted-foreground">{item.meta}</span>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export { Timeline }
export type { TimelineItem }
