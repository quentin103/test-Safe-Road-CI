import type { ReactNode } from "react"

import { PageTransition } from "@/components/app/page-transition"

/** Recréé à chaque navigation (contrairement au layout) : relance l'animation d'entrée de la page. */
export default function AppTemplate({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
