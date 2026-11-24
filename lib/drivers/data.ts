import type { DriversData } from "@/lib/drivers/types"

/**
 * Données de la page Conducteurs.
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */
export async function getDriversData(): Promise<DriversData> {
  return {
    referenceDate: "2026-11-11",
    invitationsThisWeek: 6,
    medianActivationDays: 1.8,
    funnel: {
      since: "2026-09-14",
      invited: 31,
      installed: 26,
      active: 24,
      activeThreshold: 5,
    },
    invitations: [
      {
        id: "inv-6",
        phone: "0152089490",
        code: "B4J-9SK",
        status: "pending",
        invitedAt: "2026-11-09",
        invitedBy: "Aya Koné",
        lastEvent: { type: "sent", at: "2026-11-09" },
      },
      {
        id: "inv-5",
        phone: "0541371681",
        code: "H6V-1PF",
        status: "pending",
        invitedAt: "2026-11-05",
        invitedBy: "Mariam Traoré",
        lastEvent: { type: "sent", at: "2026-11-05" },
      },
      {
        id: "inv-4",
        phone: "0709852764",
        code: "Z2C-7NE",
        status: "pending",
        invitedAt: "2026-11-03",
        invitedBy: "Koffi N’Guessan",
        lastEvent: { type: "reminded", at: "2026-11-08" },
      },
      {
        id: "inv-3",
        phone: "0173405837",
        code: "R9T-4WB",
        status: "accepted",
        invitedAt: "2026-10-30",
        invitedBy: "Koffi N’Guessan",
        lastEvent: { type: "accepted", at: "2026-10-31" },
      },
      {
        id: "inv-2",
        phone: "0566129012",
        code: "M3X-8LA",
        status: "accepted",
        invitedAt: "2026-10-28",
        invitedBy: "Aya Koné",
        lastEvent: { type: "accepted", at: "2026-10-30" },
      },
      {
        id: "inv-1",
        phone: "0748216305",
        code: "K7P-2QD",
        status: "accepted",
        invitedAt: "2026-10-28",
        invitedBy: "Aya Koné",
        lastEvent: { type: "accepted", at: "2026-10-29" },
      },
    ],
    totalInvitations: 31,
    activity: [
      { id: "act-1", type: "invitation-sent", phone: "0152089490", by: "Aya Koné", at: "2026-11-09" },
      { id: "act-2", type: "reminder-sent", phone: "0709852764", by: "Koffi N’Guessan", at: "2026-11-08" },
      { id: "act-3", type: "driver-removed", phoneSuffix: "22", by: "Koffi N’Guessan", at: "2026-11-02" },
      { id: "act-4", type: "code-accepted", code: "R9T-4WB", at: "2026-10-31" },
      { id: "act-5", type: "code-accepted", code: "M3X-8LA", at: "2026-10-30" },
    ],
    sampleInvitationCode: "K7P-2QD",
  }
}
