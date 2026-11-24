import { StatCard } from "@/components/ui/stat-card"
import type { DevicesData } from "@/lib/devices/types"
import { formatNumber, formatPercent } from "@/lib/format"

/** Les quatre indicateurs en tête de la page Santé des téléphones. */
export function DeviceStats({ summary }: { summary: DevicesData["summary"] }) {
  const { tracked, withoutFirstData, active48h, silent48h, outdated, mandatoryUpdates } = summary

  return (
    <section aria-label="Indicateurs des téléphones" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        variant="primary"
        icon="smartphone-linear"
        label="Téléphones suivis"
        value={formatNumber(tracked)}
        description={`+ ${formatNumber(withoutFirstData)} qui n’ont encore rien envoyé`}
      />
      <StatCard
        icon="pulse-linear"
        iconTone="success"
        label="Actifs sur 48 h"
        value={formatNumber(active48h)}
        suffix={formatPercent(tracked > 0 ? active48h / tracked : 0)}
        description="Données reçues récemment"
      />
      <StatCard
        icon="cloud-cross-linear"
        iconTone="warning"
        label="Silencieux depuis 48 h"
        value={formatNumber(silent48h)}
        description="Aucune donnée reçue"
      />
      <StatCard
        icon="smartphone-update-linear"
        iconTone="danger"
        label="Version à mettre à jour"
        value={formatNumber(outdated)}
        description={`dont ${formatNumber(mandatoryUpdates)} en mise à jour obligatoire`}
      />
    </section>
  )
}
