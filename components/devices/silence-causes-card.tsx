"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import type { SilenceCause } from "@/lib/devices/types"
import { cn } from "@/lib/utils"

type SilenceCausesCardProps = {
  causes: SilenceCause[]
  className?: string
}

/** Causes fréquentes d'un téléphone silencieux ; chaque cause se déplie sur ce que le conducteur doit faire. */
export function SilenceCausesCard({ causes, className }: SilenceCausesCardProps) {
  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="cloud-cross-linear" className="size-4.5 text-primary" />
          <h2>Pourquoi un téléphone devient silencieux</h2>
        </CardTitle>
        <CardDescription>Les causes les plus fréquentes. Dépliez-en une pour voir ce que le conducteur doit faire.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1.5">
          {causes.map((cause, index) => (
            <li key={cause.id}>
              <Collapsible defaultOpen={index === 0} className="group/cause rounded-xl border border-track data-open:bg-muted/60">
                <CollapsibleTrigger className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50">
                  <IconBubble icon={cause.icon} tone="success" size="sm" className="group-data-open/cause:bg-primary group-data-open/cause:text-primary-foreground" />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[13px] leading-tight font-bold">{cause.title}</span>
                    <span className="text-xs leading-snug text-muted-foreground">{cause.description}</span>
                  </span>
                  <Icon
                    icon="alt-arrow-down-linear"
                    className="size-4 shrink-0 text-soft-foreground transition-transform group-data-open/cause:rotate-180"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-2.5 pb-2.5">
                  <p className="mb-1.5 pl-9.5 text-[11px] font-semibold tracking-[0.06em] text-soft-foreground uppercase">
                    Sur le téléphone du conducteur
                  </p>
                  <ol className="flex flex-col gap-1.5 pl-9.5">
                    {cause.steps.map((step, stepIndex) => (
                      <li key={step} className="flex items-start gap-2 text-[13px] leading-snug">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground tabular-nums">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CollapsibleContent>
              </Collapsible>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
