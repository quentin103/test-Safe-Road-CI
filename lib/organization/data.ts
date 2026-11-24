import type { OrganizationData } from "@/lib/organization/types"

/**
 * Données de la page Membres de l'organisation.
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */
export async function getOrganizationData(): Promise<OrganizationData> {
  return {
    today: "2026-11-11",
    organization: {
      name: "Lagune Express Transport",
      initials: "LE",
      kind: "Transporteur",
      city: "Abidjan",
      website: "lagunexpress.ci",
      createdAt: "2026-09-14",
    },
    members: [
      {
        id: "mem-1",
        firstName: "Aya",
        lastName: "Koné",
        email: "aya.kone@lagunexpress.ci",
        role: "admin",
        since: "2026-09-14",
        invitedBy: "SafeRoad",
        isCurrentUser: true,
        feminine: true,
      },
      {
        id: "mem-2",
        firstName: "Koffi",
        lastName: "N’Guessan",
        email: "koffi.nguessan@lagunexpress.ci",
        role: "manager",
        since: "2026-10-02",
        invitedBy: "Aya Koné",
      },
      {
        id: "mem-3",
        firstName: "Mariam",
        lastName: "Traoré",
        email: "mariam.traore@lagunexpress.ci",
        role: "manager",
        since: "2026-11-06",
        invitedBy: "Aya Koné",
      },
    ],
    invitations: [
      {
        id: "minv-1",
        email: "yao.kouassi@lagunexpress.ci",
        role: "manager",
        sentAt: "2026-11-09",
        sentBy: "Aya Koné",
        expiresAt: "2026-11-16",
      },
    ],
    formerMembers: [
      {
        id: "old-1",
        firstName: "Ibrahim",
        lastName: "Sanogo",
        role: "manager",
        from: "2026-09-16",
        to: "2026-10-20",
        removedBy: "Aya Koné",
      },
    ],
    events: [
      { id: "ev-5", type: "invited", text: "Aya Koné a invité yao.kouassi@lagunexpress.ci", at: "2026-11-09T10:24:00Z" },
      { id: "ev-4", type: "joined", text: "Mariam Traoré a rejoint l’organisation", at: "2026-11-06T15:02:00Z" },
      { id: "ev-3", type: "removed", text: "Aya Koné a retiré Ibrahim Sanogo", at: "2026-10-20T09:41:00Z" },
      { id: "ev-2", type: "joined", text: "Koffi N’Guessan a rejoint l’organisation", at: "2026-10-02T11:18:00Z" },
      { id: "ev-1", type: "created", text: "Organisation créée par SafeRoad, Aya Koné administratrice", at: "2026-09-14T16:30:00Z" },
    ],
  }
}
