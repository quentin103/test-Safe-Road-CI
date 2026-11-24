import type { ComponentProps } from "react"

import { Badge } from "@/components/ui/badge"
import { formatDelta, trendTone } from "@/lib/format"
import { cn } from "@/lib/utils"

type DeltaBadgeProps = Omit<ComponentProps<typeof Badge>, "children" | "variant"> & {
  value: number
  fractionDigits?: number
  /** Sens favorable : `"down"` pour des événements, `"up"` pour un score. */
  goodWhen?: "up" | "down"
}

/** Variation colorée selon qu'elle est favorable (vert), défavorable (rouge) ou nulle. */
function DeltaBadge({
  value,
  fractionDigits = 1,
  goodWhen = "up",
  className,
  ...props
}: DeltaBadgeProps) {
  return (
    <Badge
      variant={trendTone(value, goodWhen)}
      className={cn("min-w-11 font-bold tabular-nums", className)}
      {...props}
    >
      {formatDelta(value, fractionDigits)}
    </Badge>
  )
}

export { DeltaBadge }
export type { DeltaBadgeProps }
