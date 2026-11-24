"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { Input } from "@/components/ui/input"
import { isValidWorkEmail, managerScope, roleLabels } from "@/lib/organization/organization"
import { cn } from "@/lib/utils"

type InviteMemberDialogProps = {
  /** Domaine de l'organisation, pour l'exemple du champ. */
  domain: string
  /** Adresses déjà membres ou déjà invitées, refusées en double. */
  takenEmails: string[]
  onInvite: (email: string) => void
}

/** Bouton « Inviter un collègue » et fenêtre d'invitation d'un gestionnaire de flotte. */
export function InviteMemberDialog({ domain, takenEmails, onInvite }: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(0)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setSession((value) => value + 1)
      }}
    >
      <DialogTrigger render={<Button className="h-9 gap-1.5 rounded-xl px-3.5 text-[13px] font-bold" />}>
        <Icon icon="user-plus-rounded-linear" data-icon="inline-start" className="size-4" />
        Inviter un collègue
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100svh-2rem)] gap-3.5 overflow-y-auto rounded-[1.25rem] bg-card p-4.5 sm:max-w-110"
      >
        <DialogHeader className="flex-row items-center gap-2.5">
          <IconBubble icon="user-plus-rounded-linear" tone="success" className="size-8.5 [&_svg]:size-4.5" />
          <div className="flex flex-col gap-0.5">
            <DialogTitle className="text-base leading-snug font-bold">Inviter un collègue</DialogTitle>
            <DialogDescription className="text-xs">
              Il reçoit un e-mail et choisit son mot de passe à la première connexion.
            </DialogDescription>
          </div>
        </DialogHeader>
        <InviteForm
          key={session}
          domain={domain}
          takenEmails={takenEmails}
          onInvite={(email) => {
            onInvite(email)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

function InviteForm({ domain, takenEmails, onInvite }: InviteMemberDialogProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim().toLowerCase()
    if (!isValidWorkEmail(value)) return setError("Saisissez une adresse e-mail valide.")
    if (takenEmails.includes(value)) return setError("Cette adresse est déjà membre ou déjà invitée.")
    onInvite(value)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
      <Field data-invalid={error ? true : undefined} className="gap-1.5">
        <FieldLabel htmlFor="invite-email" className="text-[13px] font-semibold">
          Adresse e-mail professionnelle
        </FieldLabel>
        <Input
          id="invite-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError(null)
          }}
          placeholder={`prenom.nom@${domain}`}
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "invite-email-error" : "invite-email-help"}
          className="h-9 rounded-xl border-transparent bg-muted text-[13px] md:text-[13px]"
        />
        {error ? (
          <FieldError id="invite-email-error" className="text-xs">
            {error}
          </FieldError>
        ) : (
          <FieldDescription id="invite-email-help" className="text-xs">
            L’invitation est valable 7 jours.
          </FieldDescription>
        )}
      </Field>

      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold">Rôle</span>
        <div className="rounded-xl border border-foreground bg-muted/60 p-3">
          <p className="flex items-center gap-2 text-[13px] font-bold">
            <Icon icon="users-group-rounded-linear" className="size-4 text-primary" />
            {roleLabels.manager}
            <Icon icon="check-circle-linear" className="ml-auto size-4.5 text-primary" />
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-xs text-soft-foreground">
            {managerScope.map((item) => (
              <li key={item.text} className="flex items-center gap-1.5">
                <Icon icon={item.allowed ? "check-linear" : "close-linear"} className={cn("size-3.5", item.allowed ? "text-primary" : "text-danger")} />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">
          Seul ce rôle s’invite depuis le portail. Un rôle interne SafeRoad ne s’attribue jamais ici.
        </p>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <DialogClose
          render={
            <Button type="button" variant="outline" className="h-10 rounded-xl bg-card px-4 text-sm font-bold text-primary hover:text-primary" />
          }
        >
          Annuler
        </DialogClose>
        <Button type="submit" className="h-10 gap-1.5 rounded-xl px-5 text-sm font-bold">
          <Icon icon="letter-linear" data-icon="inline-start" className="size-4" />
          Envoyer l’invitation
        </Button>
      </div>
    </form>
  )
}
