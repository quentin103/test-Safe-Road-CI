import { StatCard } from "@/components/ui/stat-card"
import type { DriversData } from "@/lib/drivers/types"
import { formatNumber, formatPercent } from "@/lib/format"

type DriverStatsProps = Pick<DriversData, "funnel" | "invitationsThisWeek" | "medianActivationDays">

/** Les quatre indicateurs en tête de la page Conducteurs. */
export function DriverStats({ funnel, invitationsThisWeek, medianActivationDays }: DriverStatsProps) {
  const notInstalled = funnel.invited - funnel.installed

  return (
    <section aria-label="Indicateurs des conducteurs" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon="letter-linear"
        iconTone="warning"
        label="Invitations envoyées"
        value={formatNumber(funnel.invited)}
        description={`dont ${formatNumber(invitationsThisWeek)} cette semaine`}
      />
      <StatCard
        icon="smartphone-linear"
        iconTone="success"
        label="Application installée"
        value={formatNumber(funnel.installed)}
        suffix={`· ${formatPercent(funnel.installed / funnel.invited)}`}
        description={`${formatNumber(notInstalled)} invité${notInstalled > 1 ? "s" : ""} ne l’ont pas encore installée`}
      />
      <StatCard
        variant="primary"
        icon="users-group-rounded-linear"
        label="Conducteurs actifs"
        value={formatNumber(funnel.active)}
        suffix={`· ${formatPercent(funnel.active / funnel.invited)}`}
        description="Base des chiffres de la flotte"
      />
      <StatCard
        icon="clock-circle-linear"
        iconTone="neutral"
        label="Délai médian d’activation"
        value={formatNumber(medianActivationDays, 1)}
        suffix={medianActivationDays >= 2 ? "jours" : "jour"}
        description="De l’invitation aux premières données"
      />
    </section>
  )
}
