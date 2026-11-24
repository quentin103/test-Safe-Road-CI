import type { ReactNode } from "react"

import { AppLogo } from "@/components/app/app-logo"
import { AppRail } from "@/components/app/app-rail"
import { getCurrentUser, getInitials } from "@/lib/session"

/**
 * Coquille des pages connectées, en grille (à partir de `md`) :
 *
 *   [logo] [en-tête de la page]   ← le logo reste centré quelle que soit la hauteur de l'en-tête
 *   [rail] [contenu de la page]   ← le rail démarre au même niveau que le contenu
 *
 * Chaque page rend un <PageHeader> (placé en ligne 1) puis son <main> (placé en ligne 2).
 * 1 360 px de contenu + 16 px de marge de chaque côté, comme les maquettes.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()

  return (
    <div className="mx-auto grid w-full max-w-348 gap-3 px-4 py-4 md:grid-cols-[3.5rem_minmax(0,1fr)] md:grid-rows-[auto_1fr]">
      <div className="hidden items-center justify-center md:col-start-1 md:row-start-1 md:flex">
        <AppLogo />
      </div>
      <aside className="sticky top-4 hidden max-h-[calc(100svh-2rem)] flex-col items-center self-start md:col-start-1 md:row-start-2 md:flex">
        <AppRail
          userName={`${user.firstName} ${user.lastName}`}
          userInitials={getInitials(user)}
        />
      </aside>
      {children}
    </div>
  )
}
