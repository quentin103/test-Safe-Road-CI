import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

type NotificationsButtonProps = {
  unreadCount?: number
  className?: string
}

/** Cloche de l'en-tête, avec pastille rouge s'il y a des notifications non lues. */
export function NotificationsButton({ unreadCount = 0, className }: NotificationsButtonProps) {
  const label =
    unreadCount > 0
      ? `Notifications, ${unreadCount} non lue${unreadCount > 1 ? "s" : ""}`
      : "Notifications"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn("relative size-11 shrink-0 rounded-full bg-card hover:bg-card/70", className)}
    >
      <Icon icon="bell-linear" className="size-4.5" />
      {unreadCount > 0 && (
        <span
          aria-hidden="true"
          className="absolute top-2.5 right-3 size-2 rounded-full bg-destructive ring-2 ring-card"
        />
      )}
    </Button>
  )
}
