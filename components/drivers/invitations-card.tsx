"use client"

import { useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { RemoveDriverDialog } from "@/components/drivers/remove-driver-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/copy-button"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Invitation, InvitationStatus } from "@/lib/drivers/types"
import { formatDate, formatNumber, formatRelativeDays } from "@/lib/format"
import { formatInternationalNumber } from "@/lib/phone"
import { cn } from "@/lib/utils"

type Filter = "all" | InvitationStatus

type PendingAction = { type: "cancel"; invitation: Invitation } | null

type InvitationsCardProps = {
  invitations: Invitation[]
  totalInvitations: number
  referenceDate: string
  /** Boutons affichés à droite de l'en-tête (activité, invitation…). */
  actions?: ReactNode
  className?: string
}

/** Liste des invitations récentes : recherche, filtre par statut et actions. */
export function InvitationsCard({
  invitations: initialInvitations,
  totalInvitations,
  referenceDate,
  actions,
  className,
}: InvitationsCardProps) {
  const [invitations, setInvitations] = useState(initialInvitations)
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const [removing, setRemoving] = useState<Invitation | null>(null)

  const counts = useMemo(
    () => ({
      all: invitations.length,
      pending: invitations.filter((i) => i.status === "pending").length,
      accepted: invitations.filter((i) => i.status === "accepted").length,
    }),
    [invitations]
  )

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    // Que des chiffres (et +, espaces) : recherche sur le numéro ; sinon sur le code.
    const isPhoneQuery = /^[\d\s+]+$/.test(q)
    const needle = isPhoneQuery ? q.replace(/\D/g, "") : q.replace(/[^a-z0-9]/g, "")
    return invitations.filter((invitation) => {
      if (filter !== "all" && invitation.status !== filter) return false
      if (!needle) return true
      return isPhoneQuery
        ? `225${invitation.phone}`.includes(needle)
        : invitation.code.toLowerCase().replace("-", "").includes(needle)
    })
  }, [invitations, filter, query])

  function remind(invitation: Invitation) {
    // TODO : appeler l'API de relance.
    setInvitations((list) =>
      list.map((item) =>
        item.id === invitation.id ? { ...item, lastEvent: { type: "reminded", at: referenceDate } } : item
      )
    )
    toast.success(`Relance envoyée au ${formatInternationalNumber(invitation.phone)}`)
  }

  function confirmRemoval(invitation: Invitation) {
    // TODO : appeler l'API de sortie du conducteur.
    setInvitations((list) => list.filter((item) => item.id !== invitation.id))
    setRemoving(null)
    toast.success("Le conducteur a été sorti de la flotte.")
  }

  function confirmPendingAction() {
    if (!pendingAction) return
    const { invitation } = pendingAction
    // TODO : appeler l'API d'annulation de l'invitation.
    setInvitations((list) => list.filter((item) => item.id !== invitation.id))
    toast.success(`L’invitation ${invitation.code} a été annulée.`)
    setPendingAction(null)
  }

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader className="flex flex-wrap items-center gap-2">
        <CardTitle className="flex-1">
          <h2>Invitations</h2>
        </CardTitle>
        <label htmlFor="invitations-search" className="sr-only">
          Rechercher une invitation
        </label>
        <InputGroup className="h-9 w-full rounded-full border-transparent bg-muted sm:w-48">
          <InputGroupAddon className="pl-3">
            <Icon icon="magnifier-linear" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="invitations-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Numéro ou code"
            className="text-[13px] md:text-[13px]"
          />
        </InputGroup>
        <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)} className="w-full sm:w-auto">
          <TabsList variant="pill" size="sm" aria-label="Filtrer par statut" className="w-full sm:w-fit">
            <FilterTrigger value="all" label="Toutes" count={counts.all} />
            <FilterTrigger value="pending" label="En attente" count={counts.pending} />
            <FilterTrigger value="accepted" label="Acceptées" count={counts.accepted} />
          </TabsList>
        </Tabs>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </CardHeader>

      <CardContent>
        <Table className="min-w-[40rem]">
          <TableHeader>
            <TableRow className="border-track hover:bg-transparent">
              <TableHead className="pl-3">Téléphone</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Invitation</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="pr-0 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                  Aucune invitation ne correspond à votre recherche.
                </TableCell>
              </TableRow>
            ) : (
              visible.map((invitation) => (
                <InvitationRow
                  key={invitation.id}
                  invitation={invitation}
                  referenceDate={referenceDate}
                  onRemind={() => remind(invitation)}
                  onCancel={() => setPendingAction({ type: "cancel", invitation })}
                  onRemove={() => setRemoving(invitation)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CardContent className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <p className="text-muted-foreground">
          {formatNumber(visible.length)} invitation{visible.length > 1 ? "s" : ""} affichée
          {visible.length > 1 ? "s" : ""}, les plus récentes en premier
        </p>
        <Link
          href="#"
          className="flex items-center gap-1 font-bold text-primary underline underline-offset-2"
        >
          Voir les {formatNumber(totalInvitations)} invitations
          <Icon icon="alt-arrow-right-linear" className="size-3.5" />
        </Link>
      </CardContent>

      <RemoveDriverDialog
        invitation={removing}
        onClose={() => setRemoving(null)}
        onConfirm={confirmRemoval}
      />

      <AlertDialog
        open={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open) setPendingAction(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler cette invitation ?</AlertDialogTitle>
            <AlertDialogDescription>
              Le code {pendingAction?.invitation.code} ne sera plus valable.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Retour</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmPendingAction}>
              Annuler l’invitation
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

function FilterTrigger({ value, label, count }: { value: Filter; label: string; count: number }) {
  return (
    <TabsTrigger value={value} className="gap-1.5 sm:flex-none">
      {label}
      <span className="font-medium opacity-60 tabular-nums">{count}</span>
    </TabsTrigger>
  )
}

function InvitationRow({
  invitation,
  referenceDate,
  onRemind,
  onCancel,
  onRemove,
}: {
  invitation: Invitation
  referenceDate: string
  onRemind: () => void
  onCancel: () => void
  onRemove: () => void
}) {
  const accepted = invitation.status === "accepted"
  const phone = formatInternationalNumber(invitation.phone)

  return (
    <TableRow className="group/row border-track hover:bg-muted/40">
      <TableCell className="py-2 pl-3">
        <div className="flex items-center gap-2.5">
          <IconBubble icon="smartphone-linear" tone={accepted ? "success" : "warning"} className="size-8" />
          <div className="flex flex-col">
            <span className="text-[13px] leading-tight font-bold tabular-nums">{phone}</span>
            <span className="text-xs leading-tight text-muted-foreground">
              {describeLastEvent(invitation, referenceDate)}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold tracking-wide">{invitation.code}</span>
          {/* Visible au survol de la ligne, au clavier, sur écran tactile et pendant la confirmation « Copié ». */}
          <CopyButton
            value={invitation.code}
            label={`Copier le code ${invitation.code}`}
            className="opacity-0 transition-opacity group-focus-within/row:opacity-100 group-hover/row:opacity-100 data-copied:opacity-100 pointer-coarse:opacity-100"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-[13px] leading-tight">{formatDate(invitation.invitedAt, { withYear: true })}</span>
          <span className="text-xs leading-tight text-muted-foreground">par {invitation.invitedBy}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={accepted ? "success" : "warning"}
          className={cn("h-6 gap-1 px-2 text-xs font-bold [&>svg]:size-3.5!", accepted && "text-primary")}
        >
          <Icon icon={accepted ? "check-circle-linear" : "hourglass-linear"} />
          {accepted ? "Acceptée" : "En attente"}
        </Badge>
      </TableCell>
      <TableCell className="pr-0">
        <div className="flex justify-end gap-1">
          {accepted ? (
            <Button
              variant="outline"
              onClick={onRemove}
              aria-label={`Sortir le conducteur du ${phone}`}
              className="h-8 gap-1 rounded-lg bg-card px-2.5 text-[13px] font-bold text-danger-soft-foreground hover:bg-danger-soft hover:text-danger-soft-foreground"
            >
              <Icon icon="logout-2-linear" data-icon="inline-start" className="size-4" />
              Sortir
            </Button>
          ) : (
            <>
              <RowIconButton icon="refresh-linear" label="Relancer l’invitation" onClick={onRemind} />
              <RowIconButton
                icon="close-circle-linear"
                label="Annuler l’invitation"
                onClick={onCancel}
                className="text-danger-soft-foreground hover:bg-danger-soft hover:text-danger-soft-foreground"
              />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}

function RowIconButton({
  icon,
  label,
  onClick,
  className,
}: {
  icon: string
  label: string
  onClick: () => void
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            onClick={onClick}
            aria-label={label}
            className={cn("size-8 rounded-lg bg-card text-primary", className)}
          />
        }
      >
        <Icon icon={icon} className="size-4" />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function describeLastEvent(invitation: Invitation, referenceDate: string) {
  const { type, at } = invitation.lastEvent
  if (type === "accepted") return `Acceptée le ${formatDate(at)}`
  if (type === "reminded") return `Relancée le ${formatDate(at)}`
  return `Envoyée ${formatRelativeDays(at, referenceDate)}`
}
