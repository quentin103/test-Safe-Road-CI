import type { Member, MemberRole } from "@/lib/organization/types"

export const roleLabels: Record<MemberRole, string> = {
  admin: "Administrateur d’organisation",
  manager: "Gestionnaire de flotte",
}

/** Libellé court du rôle, accordé si on connaît la personne. */
export function shortRoleLabel(role: MemberRole, feminine = false) {
  if (role === "admin") return feminine ? "Administratrice" : "Administrateur"
  return "Gestionnaire de flotte"
}

export const fullName = (member: Pick<Member, "firstName" | "lastName">) => `${member.firstName} ${member.lastName}`

export const initials = (member: Pick<Member, "firstName" | "lastName">) =>
  `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`.toUpperCase()

/** Ce que chaque rôle peut faire, pour le tableau « Qui peut faire quoi ». */
export const permissions: { action: string; admin: boolean; manager: boolean }[] = [
  { action: "Inviter et sortir des conducteurs", admin: true, manager: true },
  { action: "Véhicules, balises et planning", admin: true, manager: true },
  { action: "Chiffres de la flotte, santé des téléphones, badges, portraits", admin: true, manager: true },
  { action: "Inviter un collègue gestionnaire", admin: true, manager: false },
  { action: "Retirer un membre", admin: true, manager: false },
  { action: "Attribuer un rôle interne SafeRoad", admin: false, manager: false },
]

/** Ce qu'un gestionnaire peut et ne peut pas faire, pour le choix du rôle à l'invitation. */
export const managerScope = [
  { allowed: true, text: "Conducteurs, véhicules et planning" },
  { allowed: true, text: "Chiffres de la flotte" },
  { allowed: false, text: "Pas de gestion des membres" },
]

export function isValidWorkEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}
