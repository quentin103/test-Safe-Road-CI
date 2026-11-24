export type CurrentUser = {
  firstName: string
  lastName: string
  organization: string
  role: string
}

/**
 * Utilisateur connecté.
 * TODO : remplacer par la vraie session une fois l'authentification branchée.
 */
export async function getCurrentUser(): Promise<CurrentUser> {
  return {
    firstName: "Aya",
    lastName: "Koné",
    organization: "Lagune Express Transport",
    role: "Administrateur d’organisation",
  }
}

export function getInitials(user: Pick<CurrentUser, "firstName" | "lastName">) {
  return `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()
}
