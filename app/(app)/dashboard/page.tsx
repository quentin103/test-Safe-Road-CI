import type { Metadata } from "next"

import { PageHeader } from "@/components/app/page-header"
import { EventTypesCard } from "@/components/dashboard/event-types-card"
import { FleetBadgesCard } from "@/components/dashboard/fleet-badges-card"
import { FleetOverviewCard } from "@/components/dashboard/fleet-overview-card"
import { FleetScoreCard } from "@/components/dashboard/fleet-score-card"
import { PeriodSwitcher } from "@/components/dashboard/period-switcher"
import { ShockAlertsCard } from "@/components/dashboard/shock-alerts-card"
import { SuggestedActionsCard } from "@/components/dashboard/suggested-actions-card"
import { TrendChartCard } from "@/components/dashboard/trend-chart-card"
import { Icon } from "@/components/ui/icon"
import { getDashboardData } from "@/lib/dashboard/data"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Tableau de bord",
}

export default async function DashboardPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getDashboardData("week")])

  return (
    <>
      <PageHeader
        title={`Bonjour, ${user.firstName} !`}
        description={`Tableau de bord de ${user.organization}`}
      />

      <main className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <PeriodSwitcher defaultValue={data.period.kind} />
          <p className="flex items-center gap-1.5 text-xs text-soft-foreground">
            <Icon icon="calendar-linear" className="size-3.5" />
            {data.period.caption}
          </p>
        </div>

        {/* Deux colonnes empilées : la tendance et les événements s’étirent pour égaliser les hauteurs. */}
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <FleetScoreCard score={data.score} kpis={data.kpis} />
            <TrendChartCard data={data.trend} periodKind={data.period.kind} className="flex-1" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:flex lg:flex-col">
            <SuggestedActionsCard actions={data.actions} />
            <EventTypesCard eventTypes={data.eventTypes} className="lg:flex-1" />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <ShockAlertsCard alerts={data.shockAlerts} />
          <FleetOverviewCard fleet={data.fleet} />
          <FleetBadgesCard badges={data.badges} className="md:col-span-2 lg:col-span-1" />
        </div>
      </main>
    </>
  )
}
