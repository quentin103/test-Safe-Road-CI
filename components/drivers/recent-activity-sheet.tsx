"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Timeline, type TimelineItem } from "@/components/ui/timeline"
import type { DriverActivity } from "@/lib/drivers/types"
import { formatDate } from "@/lib/format"
import { formatInternationalNumber } from "@/lib/phone"

/** Bouton « Activité » et panneau latéral du journal des dernières actions. */
export function RecentActivitySheet({ activity }: { activity: DriverActivity[] }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-xl bg-card px-3 text-[13px] font-bold text-primary hover:text-primary"
          />
        }
      >
        <Icon icon="history-linear" data-icon="inline-start" className="size-4" />
        Activité
      </SheetTrigger>
      <SheetContent className="gap-0 bg-card data-[side=right]:w-full data-[side=right]:sm:max-w-sm">
        <SheetHeader className="border-b border-track p-4 pr-12">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <Icon icon="history-linear" className="size-4.5 text-primary" />
            Activité récente
          </SheetTitle>
          <SheetDescription className="text-xs">
            Dernières actions sur les invitations et les conducteurs.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <Timeline items={activity.map(toTimelineItem)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function toTimelineItem(event: DriverActivity): TimelineItem {
  const date = formatDate(event.at)
  switch (event.type) {
    case "invitation-sent":
      return {
        id: event.id,
        icon: "user-plus-rounded-linear",
        title: `Invitation envoyée à ${formatInternationalNumber(event.phone)}`,
        meta: `par ${event.by} · ${date}`,
      }
    case "reminder-sent":
      return {
        id: event.id,
        icon: "refresh-linear",
        title: `Relance envoyée à ${formatInternationalNumber(event.phone)}`,
        meta: `par ${event.by} · ${date}`,
      }
    case "driver-removed":
      return {
        id: event.id,
        icon: "logout-2-linear",
        tone: "danger",
        title: `Sortie d’un conducteur (…${event.phoneSuffix})`,
        meta: `par ${event.by} · ${date}`,
      }
    case "code-accepted":
      return {
        id: event.id,
        icon: "check-circle-linear",
        title: `Code ${event.code} accepté`,
        meta: date,
      }
  }
}
