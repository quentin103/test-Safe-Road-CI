export type NavItem = {
  title: string
  href: string
  /** Nom d'icône Iconify (jeu Solar par défaut). */
  icon: string
}

/** Entrées du rail de navigation, dans l'ordre d'affichage. */
export const mainNav: NavItem[] = [
  { title: "Tableau de bord", href: "/dashboard", icon: "widget-5-linear" },
  { title: "Conducteurs", href: "/drivers", icon: "users-group-rounded-linear" },
  { title: "Véhicules", href: "/vehicles", icon: "car-linear" },
  { title: "Planning", href: "/planning", icon: "calendar-linear" },
  { title: "Santé des téléphones", href: "/devices", icon: "smartphone-linear" },
  { title: "Badges de la flotte", href: "/badges", icon: "medal-ribbons-star-linear" },
  { title: "Portraits partagés", href: "/portraits", icon: "user-id-linear" },
  { title: "Organisation", href: "/organization", icon: "buildings-2-linear" },
]

export const logoutNavItem: NavItem = {
  title: "Déconnexion",
  href: "/login",
  icon: "logout-2-linear",
}

export function isNavItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}
