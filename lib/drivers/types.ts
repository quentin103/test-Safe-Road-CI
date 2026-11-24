export type InvitationStatus = "accepted" | "pending"

export type Invitation = {
  id: string
  /** Les 10 chiffres nationaux, sans espace. */
  phone: string
  code: string
  status: InvitationStatus
  /** Date ISO (AAAA-MM-JJ). */
  invitedAt: string
  invitedBy: string
  /** Dernier événement connu : acceptation, relance ou simple envoi. */
  lastEvent: { type: "accepted" | "reminded" | "sent"; at: string }
}

export type DriverActivity =
  | { id: string; type: "invitation-sent"; phone: string; by: string; at: string }
  | { id: string; type: "reminder-sent"; phone: string; by: string; at: string }
  | { id: string; type: "driver-removed"; phoneSuffix: string; by: string; at: string }
  | { id: string; type: "code-accepted"; code: string; at: string }

export type EnrollmentFunnel = {
  /** Début du suivi (date ISO). */
  since: string
  invited: number
  installed: number
  active: number
  /** Nombre minimal de conducteurs actifs pour publier des chiffres. */
  activeThreshold: number
}

export type DriversData = {
  /** Date de référence des données (pour « il y a 6 jours »). */
  referenceDate: string
  invitationsThisWeek: number
  medianActivationDays: number
  funnel: EnrollmentFunnel
  /** Invitations les plus récentes, dans l'ordre d'affichage. */
  invitations: Invitation[]
  totalInvitations: number
  activity: DriverActivity[]
  /** Code d'exemple affiché dans l'aperçu du SMS. */
  sampleInvitationCode: string
}
