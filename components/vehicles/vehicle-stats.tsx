import { StatCard } from "@/components/ui/stat-card"
import { formatNumber } from "@/lib/format"
import type { summarizeFleet } from "@/lib/vehicles/vehicle"

type VehicleStatsProps = {
  summary: ReturnType<typeof summarizeFleet>
}

/** Les quatre indicateurs en tête de la page Véhicules. */
export function VehicleStats({ summary }: VehicleStatsProps) {
  const { total, assignedThisWeek, installedBeacons, byStatus } = summary

  return (
    <section aria-label="Indicateurs des véhicules" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        variant="primary"
        icon="car-linear"
        label="Véhicules"
        value={formatNumber(total)}
        description={`${formatNumber(assignedThisWeek)} affecté${assignedThisWeek > 1 ? "s" : ""} cette semaine`}
      />
      <StatCard
        icon="bluetooth-wave-linear"
        iconTone="success"
        label="Balises inventoriées"
        value={formatNumber(byStatus.inventoried)}
        description={`sur ${formatNumber(installedBeacons)} balise${installedBeacons > 1 ? "s" : ""} posée${installedBeacons > 1 ? "s" : ""}`}
      />
      <StatCard
        icon="hourglass-linear"
        iconTone="warning"
        label="À inventorier"
        value={formatNumber(byStatus.pending)}
        description="Posées, pas encore détectées"
      />
      <StatCard
        icon="danger-triangle-linear"
        iconTone="danger"
        label="Sans balise"
        value={formatNumber(byStatus.none)}
        description={
          byStatus.none === 0
            ? "Tous les véhicules sont équipés"
            : byStatus.none > 1
              ? "Véhicules à équiper"
              : "Véhicule à équiper"
        }
      />
    </section>
  )
}
