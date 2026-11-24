import type { BadgeTier, MonthlyBadges, TierDefinition } from "@/lib/badges/types"
import { formatNumber } from "@/lib/format"

const LOCALE = "fr-FR"

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** « 2026-10-01 » → « octobre 2026 » (ou « Octobre 2026 » avec `capitalized`). */
export function formatMonth(isoMonth: string, { capitalized = false, short = false } = {}) {
  const text = new Intl.DateTimeFormat(LOCALE, {
    month: short ? "short" : "long",
    ...(short ? {} : { year: "numeric" }),
    timeZone: "UTC",
  }).format(new Date(isoMonth))
  return capitalized ? capitalize(text) : text
}

/** Nom de chaque palier. */
export const tierLabels: Record<BadgeTier, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
}

/** Couleur de chaque palier (liseré de carte, point de légende). */
export const tierColorClass: Record<BadgeTier, string> = {
  bronze: "bg-bronze",
  silver: "bg-silver",
  gold: "bg-gold",
  platinum: "bg-platinum",
}

/** Même couleur, atténuée (fond de la pastille d'icône). */
export const tierSoftColorClass: Record<BadgeTier, string> = {
  bronze: "bg-bronze/35",
  silver: "bg-silver/45",
  gold: "bg-gold/35",
  platinum: "bg-platinum/45",
}

/**
 * Message de félicitations pour un mois : ne cite que les paliers au chiffre affiché,
 * et propose le palier suivant en objectif.
 */
export function buildCongratulations(month: MonthlyBadges, tiers: TierDefinition[], organization: string) {
  const reached = tiers.filter((tier) => (month.counts[tier.tier] ?? 0) > 0)
  const monthLabel = formatMonth(month.month)
  if (reached.length === 0) {
    return `Bravo à toute l’équipe pour vos efforts en ${monthLabel} ! Prochaine étape : le palier Bronze, avec ${tiers[0].shortRequirement}. ${organization}`
  }

  const parts = reached.map((tier) => {
    const count = month.counts[tier.tier] as number
    return `${formatNumber(count)} conducteur${count > 1 ? "s ont" : " a"} atteint le palier ${tier.label}`
  })
  const sentence = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} et ${parts[parts.length - 1]}` : parts[0]

  const highest = reached[reached.length - 1]
  const next = tiers.find((tier) => tier.rank === highest.rank + 1)
  const goal = next ? ` Prochaine étape : le palier ${next.label}, avec ${next.shortRequirement}.` : ""

  return `Bravo à toute l’équipe ! En ${monthLabel}, ${sentence}.${goal} ${organization}`
}
