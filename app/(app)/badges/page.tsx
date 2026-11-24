import type { Metadata } from "next"

import { NotificationsButton } from "@/components/app/notifications-button"
import { PageHeader } from "@/components/app/page-header"
import { RoleBadge } from "@/components/app/role-badge"
import { BadgesBoard } from "@/components/badges/badges-board"
import { BadgesPrivacyPopover } from "@/components/badges/privacy-popover"
import { getBadgesData } from "@/lib/badges/data"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Badges de la flotte",
}

export default async function BadgesPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getBadgesData()])

  return (
    <>
      <PageHeader
        title="Badges de la flotte"
        description="Combien de conducteurs ont atteint chaque palier, mois après mois. Personne n’est nommé ni classé."
        actions={
          <>
            <BadgesPrivacyPopover />
            <RoleBadge role={user.role} />
            <NotificationsButton />
          </>
        }
      />

      <main className="flex min-w-0 flex-col gap-3">
        <BadgesBoard {...data} organization={user.organization} />
      </main>
    </>
  )
}
