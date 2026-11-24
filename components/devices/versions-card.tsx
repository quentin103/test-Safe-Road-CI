import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import type { AppVersion, VersionStatus } from "@/lib/devices/types"
import { formatNumber, formatPercent } from "@/lib/format"
import { cn } from "@/lib/utils"

const statusStyles: Record<VersionStatus, { label: string; variant: "success" | "warning" | "danger"; dot: string; bar: string }> = {
  current: { label: "À jour", variant: "success", dot: "bg-sage", bar: "bg-sage" },
  recommended: { label: "Mise à jour conseillée", variant: "warning", dot: "bg-bronze", bar: "bg-bronze" },
  mandatory: { label: "Mise à jour obligatoire", variant: "danger", dot: "bg-danger-muted", bar: "bg-danger-muted" },
}

type VersionsCardProps = {
  versions: AppVersion[]
  note: string
  className?: string
}

/** Répartition des téléphones par version de l'application. */
export function VersionsCard({ versions, note, className }: VersionsCardProps) {
  const total = versions.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="smartphone-update-linear" className="size-4.5 text-primary" />
          <h2>Versions de l’application</h2>
        </CardTitle>
        <CardDescription>Sur {formatNumber(total)} téléphones suivis</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div aria-hidden="true" className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
          {versions.map((item) => (
            <span
              key={item.version}
              className={statusStyles[item.status].bar}
              style={{ width: `${(item.count / Math.max(1, total)) * 100}%` }}
            />
          ))}
        </div>
        <ul className="flex flex-col gap-1.5">
          {versions.map((item) => {
            const style = statusStyles[item.status]
            return (
              <li key={item.version} className="flex items-center gap-2.5 rounded-xl bg-muted px-3 py-2">
                <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", style.dot)} />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-[13px] leading-tight font-bold">Version {item.version}</span>
                  <Badge variant={style.variant} className={cn("h-5 px-2 text-[11px] font-bold", item.status === "current" && "text-primary")}>
                    {style.label}
                  </Badge>
                </div>
                <div className="flex flex-col items-end tabular-nums">
                  <span className="text-base leading-none font-bold">{formatNumber(item.count)}</span>
                  <span className="text-[11px] text-muted-foreground">{formatPercent(item.count / Math.max(1, total))}</span>
                </div>
              </li>
            )
          })}
        </ul>
        <p className="flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
          <Icon icon="info-circle-linear" className="mt-px size-3.5 shrink-0" />
          {note}
        </p>
      </CardContent>
    </Card>
  )
}
