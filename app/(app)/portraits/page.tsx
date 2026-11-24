import type { Metadata } from "next"

import { NotificationsButton } from "@/components/app/notifications-button"
import { PageHeader } from "@/components/app/page-header"
import { RoleBadge } from "@/components/app/role-badge"
import { PortraitsBoard } from "@/components/portraits/portraits-board"
import { PortraitsPrivacyPopover } from "@/components/portraits/privacy-popover"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { getPortraitsData } from "@/lib/portraits/data"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Portraits partagés",
}

export default async function PortraitsPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getPortraitsData()])

  return (
    <>
      <PageHeader
        title="Portraits partagés"
        description="Le portrait des seuls conducteurs qui ont choisi de vous le montrer. Leur accord se retire à tout moment."
        actions={
          <>
            <PortraitsPrivacyPopover />
            <RoleBadge role={user.role} />
            <NotificationsButton />
          </>
        }
      />

      <main className="flex min-w-0 flex-col gap-3">
        <p className="flex items-center gap-3 rounded-[1.25rem] bg-accent/70 px-4 py-2.5 text-[13px] text-soft-foreground">
          <IconBubble icon="hand-shake-linear" tone="primary" size="md" />
          <span>
            <span className="font-bold text-foreground">Le conducteur décide, dans son application.</span> Un portrait montre un score
            et des sous-scores sur un mois terminé. Jamais un trajet, un lieu ou un horaire.
          </span>
          <Icon icon="shield-check-linear" className="ml-auto hidden size-4.5 shrink-0 text-primary sm:block" />
        </p>
        <PortraitsBoard {...data} />
      </main>
    </>
  )
}
