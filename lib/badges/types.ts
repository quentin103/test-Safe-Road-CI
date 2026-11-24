import type { BadgeTier } from "@/lib/dashboard/types"
import type { MaskedCount } from "@/lib/format"

export type { BadgeTier }

export type TierDefinition = {
  tier: BadgeTier
  /** Numéro du palier, de 1 (Bronze) à 4 (Platine). */
  rank: number
  label: string
  /** Condition d'obtention, en clair. */
  requirement: string
  /** Rappel court pour le message de félicitations (« au moins 90 sur 12 semaines »). */
  shortRequirement: string
}

/** Nombre de conducteurs à chaque palier pour un mois terminé ; `null` = de 1 à 4, masqué. */
export type MonthlyBadges = {
  /** Premier jour du mois, en ISO (AAAA-MM-01). */
  month: string
  counts: Record<BadgeTier, MaskedCount>
}

export type BadgesData = {
  tiers: TierDefinition[]
  /** Les mois terminés, le plus récent en premier. */
  months: MonthlyBadges[]
}
