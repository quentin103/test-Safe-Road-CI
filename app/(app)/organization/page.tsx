import type { Metadata } from "next"

import { NotificationsButton } from "@/components/app/notifications-button"
import { PageHeader } from "@/components/app/page-header"
import { RoleBadge } from "@/components/app/role-badge"
import { OrganizationBoard } from "@/components/organization/organization-board"
import { getOrganizationData } from "@/lib/organization/data"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Membres de l’organisation",
}

export default async function OrganizationPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getOrganizationData()])

  return (
    <>
      <PageHeader
        title="Membres de l’organisation"
        description={`Les personnes de ${user.organization} qui ont accès au portail.`}
        actions={
          <>
            <RoleBadge role={user.role} />
            <NotificationsButton />
          </>
        }
      />

      <main className="flex min-w-0 flex-col gap-3">
        <OrganizationBoard {...data} />
      </main>
    </>
  )
}
