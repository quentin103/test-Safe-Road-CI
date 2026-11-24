import type { ReactNode } from "react"

import { RemindPendingButton } from "@/components/drivers/remind-pending-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardLink } from "@/components/ui/card-link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Icon } from "@/components/ui/icon"
import { IconBubble, type IconBubbleProps } from "@/components/ui/icon-bubble"
import type { EnrollmentFunnel } from "@/lib/drivers/types"
import { formatDate, formatNumber, formatPercent } from "@/lib/format"
import { cn } from "@/lib/utils"

type EnrollmentCardProps = {
  funnel: EnrollmentFunnel
  className?: string
}

/**
 * Parcours d'enrôlement : invités → application installée → actifs.
 * Replié par défaut : l'en-tête résume les blocages, le détail s'ouvre au clic.
 */
export function EnrollmentCard({ funnel, className }: EnrollmentCardProps) {
  const thresholdReached = funnel.active >= funnel.activeThreshold
  const notInstalled = funnel.invited - funnel.installed
  const silent = funnel.installed - funnel.active
  const missing = funnel.activeThreshold - funnel.active

  return (
    <Collapsible className={cn("group/enrollment", className)}>
      <Card className="[--card-gap:--spacing(3.5)]">
        <CardHeader className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="grid min-w-0 gap-0.5">
            <CardTitle>
              <h2>Parcours d’enrôlement</h2>
            </CardTitle>
            <CardDescription>
              De l’invitation aux premières données de conduite, depuis le{" "}
              {formatDate(funnel.since, { withYear: true })}
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Résumé des blocages, masqué une fois le détail ouvert */}
            <span className="flex flex-wrap gap-1.5 group-data-open/enrollment:hidden">
              {notInstalled > 0 && <LossBadge count={notInstalled} label="sans application" />}
              {silent > 0 && <LossBadge count={silent} label="sans données" />}
              {notInstalled <= 0 && silent <= 0 && (
                <Badge
                  variant="success"
                  className="h-6.5 gap-1 px-2.5 text-xs font-semibold text-primary [&>svg]:size-3.5!"
                >
                  <Icon icon="check-circle-linear" />
                  Aucun blocage
                </Badge>
              )}
            </span>
            <CollapsibleTrigger
              render={
                <Button
                  variant="outline"
                  className="group/trigger h-8 gap-1 rounded-lg bg-card px-2.5 text-[13px] font-bold text-primary hover:text-primary"
                />
              }
            >
              <span className="group-data-panel-open/trigger:hidden">Afficher le détail</span>
              <span className="hidden group-data-panel-open/trigger:inline">Masquer le détail</span>
              <Icon
                icon="alt-arrow-down-linear"
                data-icon="inline-end"
                className="size-3.5 transition-transform group-data-panel-open/trigger:rotate-180"
              />
            </CollapsibleTrigger>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent>
            <ol aria-label="Étapes de l’enrôlement" className="grid gap-2.5 sm:grid-cols-3">
              <FunnelStep
                icon="letter-linear"
                iconTone="card"
                label="Invités"
                hint="SMS d’invitation envoyé"
                value={funnel.invited}
                total={funnel.invited}
              >
                <FunnelLoss
                  count={notInstalled}
                  text={`${notInstalled > 1 ? "n’ont" : "n’a"} pas encore installé l’application`}
                  done="Tous les invités ont installé l’application"
                  action={<RemindPendingButton count={notInstalled} />}
                />
              </FunnelStep>
              <FunnelStep
                icon="smartphone-linear"
                iconTone="success"
                label="Application installée"
                hint="Code d’invitation saisi"
                value={funnel.installed}
                total={funnel.invited}
              >
                <FunnelLoss
                  count={silent}
                  text={`${silent > 1 ? "n’ont" : "n’a"} encore envoyé aucune donnée`}
                  done="Toutes les applications installées envoient des données"
                  action={
                    <CardLink href="/devices" className="text-xs whitespace-nowrap">
                      Santé des téléphones
                    </CardLink>
                  }
                />
              </FunnelStep>
              <FunnelStep
                icon="check-circle-linear"
                iconTone="primary"
                label="Actifs"
                hint="Premières données reçues"
                value={funnel.active}
                total={funnel.invited}
              >
                <p className="flex items-start gap-1.5 text-xs leading-snug text-soft-foreground">
                  <Icon icon="shield-check-linear" className="mt-px size-3.5 shrink-0 text-primary" />
                  {thresholdReached
                    ? `Chiffres de la flotte affichés dès ${funnel.activeThreshold} actifs : c’est le cas.`
                    : `Chiffres de la flotte affichés dès ${funnel.activeThreshold} actifs : il en manque ${missing}.`}
                </p>
              </FunnelStep>
            </ol>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

function LossBadge({ count, label }: { count: number; label: string }) {
  return (
    <Badge variant="warning" className="h-6.5 gap-1 px-2.5 text-xs font-semibold [&>svg]:size-3.5!">
      <Icon icon="arrow-right-down-linear" />
      <span className="tabular-nums">{formatNumber(count)}</span> {label}
    </Badge>
  )
}

function FunnelStep({
  icon,
  iconTone,
  label,
  hint,
  value,
  total,
  children,
}: {
  icon: string
  iconTone: IconBubbleProps["tone"]
  label: string
  hint: string
  value: number
  total: number
  /** Pied de tuile : qui reste bloqué à cette étape, ou le rappel du seuil. */
  children?: ReactNode
}) {
  const ratio = total > 0 ? value / total : 0
  const isFirst = value === total

  return (
    <li className="flex flex-col gap-2 rounded-xl bg-muted p-3">
      <div className="flex items-center gap-2">
        <IconBubble icon={icon} tone={iconTone} className="size-7 [&_svg]:size-3.5" />
        <span className="text-[13px] leading-tight font-bold">{label}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="flex items-baseline gap-1.5">
          <span className="text-2xl leading-none font-bold tabular-nums">{formatNumber(value)}</span>
          {!isFirst && <span className="text-xs text-muted-foreground">{formatPercent(ratio)} des invités</span>}
        </span>
        <span className="text-xs leading-snug text-muted-foreground">{hint}</span>
      </div>
      {children && <div className="border-t border-border pt-2">{children}</div>}
    </li>
  )
}

function FunnelLoss({ count, text, done, action }: { count: number; text: string; done: string; action: ReactNode }) {
  if (count <= 0) {
    return (
      <p className="flex items-start gap-1.5 text-xs leading-snug text-accent-foreground">
        <Icon icon="check-circle-linear" className="mt-px size-3.5 shrink-0" />
        {done}
      </p>
    )
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <p className="flex items-start gap-1.5 text-xs leading-snug text-sand-foreground">
        <Icon icon="arrow-right-down-linear" className="mt-px size-3.5 shrink-0" />
        <span>
          <span className="font-bold tabular-nums">{formatNumber(count)}</span> {text}
        </span>
      </p>
      {action}
    </div>
  )
}
