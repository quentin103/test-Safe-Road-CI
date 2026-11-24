import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import type { SuggestedAction } from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"

type SuggestedActionsCardProps = {
  actions: SuggestedAction[]
  className?: string
}

/** « À faire cette semaine » : actions de prévention suggérées. */
export function SuggestedActionsCard({ actions, className }: SuggestedActionsCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          <h2>À faire cette semaine</h2>
        </CardTitle>
        <CardDescription>Des gestes de prévention, jamais une sanction</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group flex items-center gap-2.5 rounded-xl bg-muted px-2.5 py-2 transition-colors outline-none hover:bg-track focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <IconBubble icon={action.icon} tone={action.tone} />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[13px] leading-tight font-semibold">{action.title}</span>
              <span className="text-xs leading-tight text-muted-foreground">{action.description}</span>
            </span>
            <Icon
              icon="alt-arrow-right-linear"
              className={cn(
                "size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              )}
            />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
