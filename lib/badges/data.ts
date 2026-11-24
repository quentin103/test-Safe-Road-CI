import type { BadgesData } from "@/lib/badges/types"

/**
 * Données de la page Badges (les chiffres de 1 à 4 arrivent masqués, à `null`).
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */
export async function getBadgesData(): Promise<BadgesData> {
  return {
    tiers: [
      {
        tier: "bronze",
        rank: 1,
        label: "Bronze",
        requirement: "Score moyen d’au moins 70 sur 4 semaines",
        shortRequirement: "au moins 70 sur 4 semaines",
      },
      {
        tier: "silver",
        rank: 2,
        label: "Argent",
        requirement: "Au moins 80 sur 8 semaines",
        shortRequirement: "au moins 80 sur 8 semaines",
      },
      {
        tier: "gold",
        rank: 3,
        label: "Or",
        requirement: "Au moins 90 sur 12 semaines",
        shortRequirement: "au moins 90 sur 12 semaines",
      },
      {
        tier: "platinum",
        rank: 4,
        label: "Platine",
        requirement: "Or tenu 6 mois, sans choc confirmé",
        shortRequirement: "l’Or tenu 6 mois, sans choc confirmé",
      },
    ],
    months: [
      { month: "2026-10-01", counts: { bronze: 11, silver: 7, gold: null, platinum: 0 } },
      { month: "2026-09-01", counts: { bronze: 9, silver: 6, gold: null, platinum: 0 } },
      { month: "2026-08-01", counts: { bronze: 8, silver: 5, gold: 0, platinum: 0 } },
      { month: "2026-07-01", counts: { bronze: 7, silver: null, gold: 0, platinum: 0 } },
      { month: "2026-06-01", counts: { bronze: 5, silver: null, gold: 0, platinum: 0 } },
    ],
  }
}
