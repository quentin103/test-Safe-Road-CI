import type { PortraitsData } from "@/lib/portraits/types"

/**
 * Données de la page Portraits partagés.
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */
export async function getPortraitsData(): Promise<PortraitsData> {
  return {
    month: "2026-10-01",
    portraits: [
      {
        id: "ptr-1",
        displayName: "Moussa D.",
        initials: "MD",
        sharedSince: "2026-11-02",
        tier: "gold",
        score: 91,
        subScores: { braking: 93, speed: 88, acceleration: 92 },
        history: [
          { month: "2026-08-01", score: 86 },
          { month: "2026-09-01", score: 89 },
          { month: "2026-10-01", score: 91 },
        ],
      },
      {
        id: "ptr-2",
        displayName: "Christelle A.",
        initials: "CA",
        sharedSince: "2026-10-28",
        tier: "silver",
        score: 84,
        subScores: { braking: 86, speed: 79, acceleration: 87 },
        history: [
          { month: "2026-08-01", score: 80 },
          { month: "2026-09-01", score: 82 },
          { month: "2026-10-01", score: 84 },
        ],
      },
      {
        id: "ptr-3",
        displayName: "Hervé K.",
        initials: "HK",
        sharedSince: "2026-11-05",
        tier: "bronze",
        score: 76,
        subScores: { braking: 74, speed: 77, acceleration: 78 },
        history: [
          { month: "2026-08-01", score: 70 },
          { month: "2026-09-01", score: 73 },
          { month: "2026-10-01", score: 76 },
        ],
      },
    ],
    withdrawals: [{ date: "2026-11-08" }],
  }
}
