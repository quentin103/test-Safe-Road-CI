import type { Metadata } from "next"

import { NotificationsButton } from "@/components/app/notifications-button"
import { PageHeader } from "@/components/app/page-header"
import { RoleBadge } from "@/components/app/role-badge"
import { ActivityChartCard } from "@/components/devices/activity-chart-card"
import { DetectionBanner } from "@/components/devices/detection-banner"
import { DeviceStats } from "@/components/devices/device-stats"
import { FleetMessageCard } from "@/components/devices/fleet-message-card"
import { DevicesPrivacyPopover } from "@/components/devices/privacy-popover"
import { SilenceCausesCard } from "@/components/devices/silence-causes-card"
import { VersionsCard } from "@/components/devices/versions-card"
import { getDevicesData } from "@/lib/devices/data"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Santé des téléphones",
}

export default async function DevicesPage() {
  const user = await getCurrentUser()
  const data = await getDevicesData(user.organization)

  return (
    <>
      <PageHeader
        title="Santé des téléphones"
        description="Combien de téléphones envoient leurs données, combien sont silencieux, quelles versions."
        actions={
          <>
            <DevicesPrivacyPopover />
            <RoleBadge role={user.role} />
            <NotificationsButton />
          </>
        }
      />

      <main className="flex min-w-0 flex-col gap-3">
        <DetectionBanner
          active={data.summary.active48h}
          tracked={data.summary.tracked}
          updatedMinutesAgo={data.updatedMinutesAgo}
        />
        <DeviceStats summary={data.summary} />

        <div className="grid gap-3 lg:grid-cols-[minmax(0,16fr)_minmax(0,9fr)] lg:items-start">
          <ActivityChartCard activity={data.activity} />
          <VersionsCard versions={data.versions} note={data.versionsNote} />
          <SilenceCausesCard causes={data.causes} />
          <FleetMessageCard messages={data.messages} />
        </div>
      </main>
    </>
  )
}
