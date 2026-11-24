import Link from "next/link"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardLink } from "@/components/ui/card-link"
import { Meter } from "@/components/ui/meter"
import type { FleetOverview } from "@/lib/dashboard/types"
import { formatNumber } from "@/lib/format"

type FleetOverviewCardProps = {
  fleet: FleetOverview
  className?: string
}

/** « Votre flotte » : parcours d'activation des conducteurs et points d'attention. */
export function FleetOverviewCard({ fleet, className }: FleetOverviewCardProps) {
  const max = Math.max(...fleet.funnel.map((step) => step.value), 1)

  return (
    <Card className={className}>
      <CardHeader className="items-baseline">
        <CardTitle>
          <h2>Votre flotte</h2>
        </CardTitle>
        <CardAction className="row-span-1">
          <CardLink href="/drivers">Conducteurs</CardLink>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {fleet.funnel.map((step) => (
          <div
            key={step.label}
            className="grid grid-cols-[7.5rem_1fr_1.75rem] items-center gap-2 text-xs"
          >
            <span className="text-soft-foreground">{step.label}</span>
            <Meter
              size="md"
              value={step.value}
              max={max}
              tone={step.tone}
              label={`${step.label} : ${step.value}`}
            />
            <span className="text-right font-bold tabular-nums">
              {formatNumber(step.value)}
            </span>
          </div>
        ))}
      </CardContent>
      <CardContent>
        <div className="flex gap-2 border-t border-track pt-2.5">
          <QuickStat
            href="/devices"
            value={fleet.silentPhones}
            label={fleet.silentPhones > 1 ? "téléphones silencieux" : "téléphone silencieux"}
          />
          <QuickStat
            href="/vehicles"
            value={fleet.vehiclesWithoutBeacon}
            label={fleet.vehiclesWithoutBeacon > 1 ? "véhicules sans balise" : "véhicule sans balise"}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function QuickStat({ href, value, label }: { href: string; value: number; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col gap-0.5 rounded-xl bg-muted px-2.5 py-2 transition-colors outline-none hover:bg-track focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="text-lg leading-6 font-bold">{formatNumber(value)}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </Link>
  )
}
