import { StatCard } from "@/components/ui/stat-card"
import { formatLongDay, formatNumber } from "@/lib/format"
import type { summarizeWeek } from "@/lib/planning/planning"

type PlanningStatsProps = {
  summary: ReturnType<typeof summarizeWeek>
  vehicleCount: number
  today: string
}

/** Les quatre indicateurs en tête du planning, pour la semaine en cours. */
export function PlanningStats({ summary, vehicleCount, today }: PlanningStatsProps) {
  const plural = (count: number, word: string) => `${word}${count > 1 ? "s" : ""}`

  return (
    <section aria-label="Indicateurs du planning" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        variant="primary"
        icon="calendar-linear"
        label="Jours planifiés cette semaine"
        value={formatNumber(summary.assignments)}
        description={`dont ${formatNumber(summary.regularized)} ${plural(summary.regularized, "changé")} après coup`}
      />
      <StatCard
        icon="car-linear"
        iconTone="success"
        label="Véhicules avec conducteur aujourd’hui"
        value={`${formatNumber(summary.vehiclesToday)}/${formatNumber(vehicleCount)}`}
        description={formatLongDay(today)}
      />
      <StatCard
        icon="calendar-add-linear"
        iconTone="warning"
        label="Jours sans conducteur d’ici dimanche"
        value={formatNumber(summary.freeSlotsUntilSunday)}
        description="Un véhicule, un jour, personne au volant"
      />
      <StatCard
        icon="users-group-rounded-linear"
        iconTone="info"
        label="Conducteurs au planning"
        value={formatNumber(summary.drivers)}
        description="Au moins un jour cette semaine"
      />
    </section>
  )
}
