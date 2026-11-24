"use client"

import { useState, type ReactNode } from "react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Icon } from "@/components/ui/icon"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate, formatNumber } from "@/lib/format"
import { fullName, initials, roleLabels, shortRoleLabel } from "@/lib/organization/organization"
import type { FormerMember, Member, MemberInvitation } from "@/lib/organization/types"
import { cn } from "@/lib/utils"

type PendingAction = { type: "remove"; member: Member } | { type: "cancel"; invitation: MemberInvitation } | null

type MembersCardProps = {
  members: Member[]
  invitations: MemberInvitation[]
  formerMembers: FormerMember[]
  onRemove: (member: Member) => void
  onRemind: (invitation: MemberInvitation) => void
  onCancel: (invitation: MemberInvitation) => void
  /** Boutons de l'en-tête (inviter, droits…). */
  actions?: ReactNode
  className?: string
}

/** Membres actuels, invitations en cours et anciens membres de l'organisation. */
export function MembersCard({ members, invitations, formerMembers, onRemove, onRemind, onCancel, actions, className }: MembersCardProps) {
  const [pending, setPending] = useState<PendingAction>(null)

  function confirm() {
    if (!pending) return
    if (pending.type === "remove") onRemove(pending.member)
    else onCancel(pending.invitation)
    setPending(null)
  }

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader className="flex flex-wrap items-center gap-2">
        <CardTitle className="flex flex-1 items-center gap-2">
          <Icon icon="users-group-rounded-linear" className="size-4.5 text-primary" />
          <h2>Membres</h2>
          <Badge variant="neutral" className="h-5.5 px-2 text-xs font-bold tabular-nums">
            {formatNumber(members.length)}
          </Badge>
        </CardTitle>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </CardHeader>

      <CardContent>
        <Table className="min-w-[38rem]">
          <TableHeader>
            <TableRow className="border-track hover:bg-transparent">
              <TableHead className="pl-3">Membre</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Depuis</TableHead>
              <TableHead className="pr-0 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} className={cn("border-track hover:bg-muted/40", member.isCurrentUser && "bg-muted/60")}>
                <TableCell className="py-2 pl-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-9 after:border-0">
                      <AvatarFallback className={cn("text-xs font-bold", member.role === "admin" ? "bg-primary text-primary-foreground" : "bg-accent text-primary")}>
                        {initials(member)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col">
                      <span className="flex items-center gap-1.5 text-[13px] leading-tight font-bold">
                        {fullName(member)}
                        {member.isCurrentUser && (
                          <Badge className="h-4.5 px-1.5 text-[10px] font-bold">Vous</Badge>
                        )}
                      </span>
                      <span className="truncate text-xs leading-tight text-muted-foreground">{member.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={member.role === "admin" ? "default" : "success"}
                    className={cn("h-6 gap-1 px-2 text-xs font-bold [&>svg]:size-3.5!", member.role === "manager" && "text-primary")}
                  >
                    <Icon icon={member.role === "admin" ? "crown-linear" : "users-group-rounded-linear"} />
                    {shortRoleLabel(member.role, member.feminine)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-[13px] leading-tight font-semibold">{formatDate(member.since, { withYear: true })}</span>
                    <span className="text-xs leading-tight text-muted-foreground">Invité par {member.invitedBy}</span>
                  </div>
                </TableCell>
                <TableCell className="pr-0">
                  <div className="flex justify-end">
                    {member.role !== "admin" && (
                      <Button
                        variant="outline"
                        onClick={() => setPending({ type: "remove", member })}
                        aria-label={`Retirer ${fullName(member)}`}
                        className="h-8 gap-1 rounded-lg bg-card px-2.5 text-[13px] font-bold text-danger-soft-foreground hover:bg-danger-soft hover:text-danger-soft-foreground"
                      >
                        <Icon icon="user-minus-rounded-linear" data-icon="inline-start" className="size-4" />
                        Retirer
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {invitations.length > 0 && (
        <CardContent className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <Icon icon="letter-linear" className="size-4 text-primary" />
            Invitations en attente
          </h3>
          <ul className="flex flex-col gap-1.5">
            {invitations.map((invitation) => (
              <li key={invitation.id} className="flex flex-wrap items-center gap-2.5 rounded-xl border border-dashed border-border px-3 py-2">
                <Avatar className="size-8 after:border-0">
                  <AvatarFallback className="bg-sand text-ochre">
                    <Icon icon="letter-opened-linear" className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[13px] leading-tight font-bold">{invitation.email}</span>
                  <span className="text-xs leading-tight text-muted-foreground">
                    {roleLabels[invitation.role]} · envoyée le {formatDate(invitation.sentAt)} par {invitation.sentBy}, expire le{" "}
                    {formatDate(invitation.expiresAt)}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <Button variant="outline" onClick={() => onRemind(invitation)} className="h-8 gap-1 rounded-lg bg-card px-2.5 text-[13px] font-bold text-primary hover:text-primary">
                    <Icon icon="refresh-linear" data-icon="inline-start" className="size-4" />
                    Renvoyer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPending({ type: "cancel", invitation })}
                    className="h-8 gap-1 rounded-lg bg-card px-2.5 text-[13px] font-bold text-danger-soft-foreground hover:bg-danger-soft hover:text-danger-soft-foreground"
                  >
                    <Icon icon="close-circle-linear" data-icon="inline-start" className="size-4" />
                    Annuler
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      {formerMembers.length > 0 && (
        <CardContent>
          <Collapsible className="group/former">
            <CollapsibleTrigger className="flex items-center gap-2 rounded-lg text-sm font-bold outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50">
              <Icon icon="history-linear" className="size-4 text-primary" />
              Anciens membres
              <Badge variant="neutral" className="h-5 px-1.5 text-[11px] font-bold tabular-nums">{formatNumber(formerMembers.length)}</Badge>
              <Icon icon="alt-arrow-down-linear" className="size-4 text-soft-foreground transition-transform group-data-open/former:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2 pt-2">
              <ul className="flex flex-col gap-1.5">
                {formerMembers.map((former) => (
                  <li key={former.id} className="flex flex-wrap items-center gap-2.5 rounded-xl bg-muted px-3 py-2">
                    <Avatar className="size-8 after:border-0">
                      <AvatarFallback className="bg-track text-xs font-bold text-track-foreground">{initials(former)}</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[13px] leading-tight font-bold">{fullName(former)}</span>
                      <span className="text-xs leading-tight text-muted-foreground">
                        {roleLabels[former.role]} · du {formatDate(former.from)} au {formatDate(former.to, { withYear: true })}, retiré par{" "}
                        {former.removedBy}
                      </span>
                    </div>
                    <Badge variant="neutral" className="h-5.5 px-2 text-xs font-bold">Accès coupé</Badge>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground">Rien n’est supprimé : un membre retiré garde son nom dans le journal.</p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      )}

      <AlertDialog
        open={pending !== null}
        onOpenChange={(open) => {
          if (!open) setPending(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pending?.type === "remove" ? `Retirer ${fullName(pending.member)} ?` : "Annuler cette invitation ?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.type === "remove"
                ? "Son accès au portail est coupé tout de suite. Son nom reste dans le journal."
                : `${pending?.type === "cancel" ? pending.invitation.email : ""} ne pourra plus utiliser ce lien.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Retour</AlertDialogCancel>
            <Button variant="destructive" onClick={confirm}>
              {pending?.type === "remove" ? "Retirer" : "Annuler l’invitation"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
