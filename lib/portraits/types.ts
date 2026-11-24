import type { BadgeTier } from "@/lib/dashboard/types"

export type SubScoreKey = "braking" | "speed" | "acceleration"

/** Portrait d'un conducteur qui a choisi de le partager : score et sous-scores du mois affiché. */
export type Portrait = {
  id: string
  /** Prénom et initiale du nom, tels que le conducteur a accepté de les montrer. */
  displayName: string
  initials: string
  /** Date ISO du partage. */
  sharedSince: string
  tier: BadgeTier | null
  score: number
  subScores: Record<SubScoreKey, number>
  /** Scores des trois derniers mois terminés, du plus ancien au plus récent (mois ISO AAAA-MM-01). */
  history: { month: string; score: number }[]
}

export type PortraitsData = {
  /** Mois affiché (ISO AAAA-MM-01) : le dernier mois terminé. */
  month: string
  portraits: Portrait[]
  /** Accords retirés récemment : seule la date est connue, jamais le conducteur. */
  withdrawals: { date: string }[]
}
