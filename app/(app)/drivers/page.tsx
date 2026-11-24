import type { Metadata } from "next"

import { NotificationsButton } from "@/components/app/notifications-button"
import { PageHeader } from "@/components/app/page-header"
import { RoleBadge } from "@/components/app/role-badge"
import { DriverStats } from "@/components/drivers/driver-stats"
import { EnrollmentCard } from "@/components/drivers/enrollment-card"
import { InvitationsCard } from "@/components/drivers/invitations-card"
import { InviteDriversDialog } from "@/components/drivers/invite-drivers-dialog"
import { RecentActivitySheet } from "@/components/drivers/recent-activity-sheet"
import { VisibilityPopover } from "@/components/drivers/visibility-popover"
import { getDriversData } from "@/lib/drivers/data"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Conducteurs",
}

export default async function DriversPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getDriversData()])

  return (
    <>
      <PageHeader
        title="Conducteurs"
        description={`Inviter, suivre l’enrôlement et gérer les sorties de la flotte ${user.organization}.`}
        actions={
          <>
            <VisibilityPopover />
            <RoleBadge role={user.role} />
            <NotificationsButton />
          </>
        }
      />

      <main className="flex min-w-0 flex-col gap-3">
        <DriverStats
          funnel={data.funnel}
          invitationsThisWeek={data.invitationsThisWeek}
          medianActivationDays={data.medianActivationDays}
        />

        {/* Le détail du parcours, l'activité, l'invitation et la confidentialité s'ouvrent à la demande. */}
        <EnrollmentCard funnel={data.funnel} />
        <InvitationsCard
          invitations={data.invitations}
          totalInvitations={data.totalInvitations}
          referenceDate={data.referenceDate}
          actions={
            <>
              <RecentActivitySheet activity={data.activity} />
              <InviteDriversDialog organization={user.organization} sampleCode={data.sampleInvitationCode} />
            </>
          }
        />
      </main>
    </>
  )
}
