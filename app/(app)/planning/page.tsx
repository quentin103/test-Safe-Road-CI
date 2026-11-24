import type { Metadata } from "next"

import { NotificationsButton } from "@/components/app/notifications-button"
import { PageHeader } from "@/components/app/page-header"
import { RoleBadge } from "@/components/app/role-badge"
import { PlanningBoard } from "@/components/planning/planning-board"
import { PlanningGuidePopover } from "@/components/planning/planning-guide-popover"
import { getPlanningData } from "@/lib/planning/data"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Planning",
}

export default async function PlanningPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getPlanningData()])

  return (
    <>
      <PageHeader
        title="Planning"
        description="Qui conduit quel véhicule, chaque jour de la semaine."
        actions={
          <>
            <PlanningGuidePopover />
            <RoleBadge role={user.role} />
            <NotificationsButton />
          </>
        }
      />

      <main className="flex min-w-0 flex-col gap-3">
        <PlanningBoard {...data} userName={`${user.firstName} ${user.lastName}`} />
      </main>
    </>
  )
}
