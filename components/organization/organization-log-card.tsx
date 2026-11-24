import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Timeline, type TimelineItem } from "@/components/ui/timeline"
import { formatRelativeDateTime } from "@/lib/format"
import type { OrganizationEvent } from "@/lib/organization/types"
import { cn } from "@/lib/utils"

const eventStyles: Record<OrganizationEvent["type"], Pick<TimelineItem, "icon" | "tone">> = {
  invited: { icon: "letter-linear", tone: "muted" },
  joined: { icon: "user-check-rounded-linear", tone: "success" },
  removed: { icon: "user-minus-rounded-linear", tone: "danger" },
  created: { icon: "buildings-2-linear", tone: "neutral" },
}

type OrganizationLogCardProps = {
  events: OrganizationEvent[]
  today: string
  className?: string
}

/** Journal des changements de membres, le plus récent en premier. */
export function OrganizationLogCard({ events, today, className }: OrganizationLogCardProps) {
  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="history-linear" className="size-4.5 text-primary" />
          <h2>Journal de l’organisation</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline
          items={events.map((event) => ({
            id: event.id,
            ...eventStyles[event.type],
            title: event.text,
            meta: formatRelativeDateTime(event.at, today),
          }))}
        />
      </CardContent>
    </Card>
  )
}
