export type MemberRole = "admin" | "manager"

export type Member = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: MemberRole
  /** Date ISO d'arrivée. */
  since: string
  /** Qui l'a invité (« SafeRoad » pour l'administrateur initial). */
  invitedBy: string
  /** Membre connecté. */
  isCurrentUser?: boolean
  /** Accord du rôle au féminin (« Administratrice »). */
  feminine?: boolean
}

export type MemberInvitation = {
  id: string
  email: string
  role: MemberRole
  sentAt: string
  sentBy: string
  expiresAt: string
}

export type FormerMember = {
  id: string
  firstName: string
  lastName: string
  role: MemberRole
  from: string
  to: string
  removedBy: string
}

export type OrganizationEvent = {
  id: string
  type: "invited" | "joined" | "removed" | "created"
  text: string
  /** Horodatage ISO (UTC). */
  at: string
}

export type Organization = {
  name: string
  initials: string
  kind: string
  city: string
  website: string
  createdAt: string
}

export type OrganizationData = {
  today: string
  organization: Organization
  members: Member[]
  invitations: MemberInvitation[]
  formerMembers: FormerMember[]
  events: OrganizationEvent[]
}
