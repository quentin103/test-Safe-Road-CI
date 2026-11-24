import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { IconBubble, type IconBubbleProps } from "@/components/ui/icon-bubble"
import { cn } from "@/lib/utils"

type StatCardProps = {
  icon: string
  iconTone?: IconBubbleProps["tone"]
  label: ReactNode
  value: ReactNode
  /** Complément affiché à côté de la valeur (« · 84 % », « jour »…). */
  suffix?: ReactNode
  description?: ReactNode
  /** `primary` : carte verte mise en avant. */
  variant?: "default" | "primary"
  className?: string
}

/** Carte d'indicateur : pastille d'icône, libellé, valeur et précision. */
function StatCard({
  icon,
  iconTone,
  label,
  value,
  suffix,
  description,
  variant = "default",
  className,
}: StatCardProps) {
  const primary = variant === "primary"

  return (
    <Card
      data-slot="stat-card"
      className={cn("[--card-spacing:--spacing(4)]", primary && "bg-primary text-primary-foreground", className)}
    >
      <CardContent className="flex items-start gap-3">
        <IconBubble icon={icon} tone={primary ? "card" : (iconTone ?? "muted")} size="lg" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={cn("text-xs", primary ? "text-mist" : "text-muted-foreground")}>
            {label}
          </span>
          <span className="flex flex-wrap items-baseline gap-1">
            <span className="text-[22px] leading-[1.15] font-bold tabular-nums">{value}</span>
            {suffix && (
              <span className={cn("text-[13px]", primary ? "text-mist" : "text-muted-foreground")}>
                {suffix}
              </span>
            )}
          </span>
          {description && (
            <span
              className={cn("text-xs", primary ? "text-primary-foreground" : "text-soft-foreground")}
            >
              {description}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { StatCard }
export type { StatCardProps }
