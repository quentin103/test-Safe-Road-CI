import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ShockAlertStatus } from "@/lib/dashboard/types"
import { formatCount } from "@/lib/format"
import { cn } from "@/lib/utils"

const toneClass: Record<ShockAlertStatus["tone"], string> = {
  primary: "bg-primary",
  moss: "bg-moss",
  fern: "bg-fern",
}

type ShockAlertsCardProps = {
  alerts: ShockAlertStatus[]
  className?: string
}

/** Compteur des alertes de choc par statut (jamais de rapport individuel). */
export function ShockAlertsCard({ alerts, className }: ShockAlertsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <h2>Alertes de choc</h2>
        </CardTitle>
        <CardDescription>Compteur par nature, jamais un rapport individuel</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {alerts.map((alert) => (
          <div key={alert.label} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className={cn("h-7 w-1 shrink-0 rounded-[2px]", toneClass[alert.tone])}
            />
            <span className="flex-1 text-[13px] font-semibold">{alert.label}</span>
            <Badge
              variant={alert.count === null ? "neutral" : "success"}
              className={cn(
                "h-5.5 px-2 font-bold tabular-nums",
                alert.count !== null && "text-primary"
              )}
            >
              {formatCount(alert.count)}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
