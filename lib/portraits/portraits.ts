import type { Portrait, SubScoreKey } from "@/lib/portraits/types"

export const subScoreLabels: Record<SubScoreKey, string> = {
  braking: "Freinage",
  speed: "Vitesse",
  acceleration: "Accélération",
}

export type ScoreLevel = "good" | "fair" | "weak"

/** Lecture d'un score : bon dès 85, moyen dès 75, à travailler en dessous. */
export function scoreLevel(score: number): ScoreLevel {
  return score >= 85 ? "good" : score >= 75 ? "fair" : "weak"
}

/** Couleur de jauge correspondant au niveau d'un score. */
export const levelMeterTone = { good: "primary", fair: "warning", weak: "danger" } as const

export type SortKey = "score" | "sharedSince" | "name"

export const sortLabels: Record<SortKey, string> = {
  score: "Score",
  sharedSince: "Date de partage",
  name: "Nom",
}

/** Trie les portraits : meilleur score, partage le plus récent, ou nom. */
export function sortPortraits(portraits: Portrait[], key: SortKey) {
  const list = [...portraits]
  if (key === "score") return list.sort((a, b) => b.score - a.score)
  if (key === "sharedSince") return list.sort((a, b) => b.sharedSince.localeCompare(a.sharedSince))
  return list.sort((a, b) => a.displayName.localeCompare(b.displayName, "fr"))
}

/** Recherche sur le nom affiché, sans tenir compte des accents ni de la casse. */
export function matchesPortrait(portrait: Portrait, query: string) {
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
  return normalize(portrait.displayName).includes(normalize(query.trim()))
}

/** Écart entre le mois affiché et le précédent (« +2 »), ou `null` sans historique. */
export function monthDelta(portrait: Portrait) {
  const { history } = portrait
  if (history.length < 2) return null
  return history[history.length - 1].score - history[history.length - 2].score
}
