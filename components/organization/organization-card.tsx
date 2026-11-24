import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { formatDate, formatNumber } from "@/lib/format"
import type { Organization } from "@/lib/organization/types"
import { cn } from "@/lib/utils"

type OrganizationCardProps = {
  organization: Organization
  counts: { members: number; admins: number; managers: number; pending: number }
  className?: string
}

/** Identité de l'organisation et ses effectifs, en une carte. */
export function OrganizationCard({ organization, counts, className }: OrganizationCardProps) {
  const facts = [
    { icon: "bus-linear", text: `${organization.kind} · ${organization.city}` },
    { icon: "link-linear", text: organization.website },
    { icon: "calendar-linear", text: `Créée le ${formatDate(organization.createdAt, { withYear: true })}` },
    { icon: "shield-check-linear", text: "Installée par SafeRoad" },
  ]
  const tiles = [
    { value: counts.members, label: counts.members > 1 ? "membres" : "membre", tone: "bg-primary text-primary-foreground" },
    { value: counts.admins, label: counts.admins > 1 ? "administrateurs" : "administrateur", tone: "bg-muted" },
    { value: counts.managers, label: counts.managers > 1 ? "gestionnaires" : "gestionnaire", tone: "bg-muted" },
    { value: counts.pending, label: counts.pending > 1 ? "invitations en attente" : "invitation en attente", tone: "bg-sand text-sand-foreground" },
  ]

  return (
    <Card className={cn("[--card-spacing:--spacing(4)]", className)}>
      <CardContent className="flex flex-wrap items-center gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Avatar className="size-14 rounded-2xl after:border-0">
            <AvatarFallback className="rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
              {organization.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-1.5">
            <h2 className="text-lg leading-tight font-bold">{organization.name}</h2>
            <ul className="flex flex-wrap gap-1.5">
              {facts.map((fact) => (
                <li key={fact.text}>
                  <Badge variant="secondary" className="h-6 gap-1 bg-muted px-2 text-xs font-medium text-soft-foreground [&>svg]:size-3.5!">
                    <Icon icon={fact.icon} />
                    {fact.text}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:w-auto">
          {tiles.map((tile) => (
            <div key={tile.label} className={cn("flex min-w-26 flex-col gap-0.5 rounded-xl px-3 py-2", tile.tone)}>
              <dd className="text-xl leading-none font-bold tabular-nums">{formatNumber(tile.value)}</dd>
              <dt className="text-xs">{tile.label}</dt>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
