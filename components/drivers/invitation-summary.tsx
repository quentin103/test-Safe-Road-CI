import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import type { Invitation } from "@/lib/drivers/types"
import { formatDate } from "@/lib/format"
import { formatInternationalNumber } from "@/lib/phone"
import { cn } from "@/lib/utils"

/** Rappel d'une invitation : numéro, code, date et statut (même densité que le tableau). */
export function InvitationSummary({ invitation, className }: { invitation: Invitation; className?: string }) {
  const accepted = invitation.status === "accepted"

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1.5 rounded-[0.875rem] bg-muted p-3 sm:grid-cols-[auto_minmax(0,1fr)_auto]",
        className
      )}
    >
      <IconBubble
        icon="smartphone-linear"
        tone={accepted ? "success" : "warning"}
        className="size-8"
      />
      <div className="flex min-w-0 flex-col">
        <span className="text-sm leading-tight font-bold whitespace-nowrap tabular-nums">
          {formatInternationalNumber(invitation.phone)}
        </span>
        <span className="text-xs leading-tight text-muted-foreground">
          Code {invitation.code} · invité le {formatDate(invitation.invitedAt, { withYear: true })}
        </span>
      </div>
      <Badge
        variant={accepted ? "success" : "warning"}
        className={cn(
          "col-start-2 h-6 gap-1 px-2 text-xs font-bold sm:col-start-auto [&>svg]:size-3.5!",
          accepted && "text-primary"
        )}
      >
        <Icon icon={accepted ? "check-circle-linear" : "hourglass-linear"} />
        {accepted ? "Acceptée" : "En attente"}
      </Badge>
    </div>
  )
}
