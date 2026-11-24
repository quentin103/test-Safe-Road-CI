"use client"

import { useState } from "react"

import { InvitationSummary } from "@/components/drivers/invitation-summary"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { InfoList } from "@/components/ui/info-list"
import type { Invitation } from "@/lib/drivers/types"

const consequences = [
  {
    icon: "bolt-linear",
    tone: "warning" as const,
    title: "Effet immédiat",
    description: "Le conducteur ne compte plus dans les chiffres de votre flotte dès maintenant.",
  },
  {
    icon: "shield-linear",
    tone: "success" as const,
    title: "Ses données restent les siennes",
    description: "Rien n’est supprimé : il garde son historique dans son application.",
  },
  {
    icon: "document-text-linear",
    tone: "neutral" as const,
    title: "Action journalisée",
    description: "La sortie est enregistrée avec votre compte et l’heure.",
  },
]

type RemoveDriverDialogProps = {
  /** Invitation du conducteur à sortir ; `null` ferme la fenêtre. */
  invitation: Invitation | null
  onClose: () => void
  onConfirm: (invitation: Invitation) => void
}

/** Fenêtre de confirmation de la sortie d'un conducteur de la flotte. */
export function RemoveDriverDialog({ invitation, onClose, onConfirm }: RemoveDriverDialogProps) {
  // Garde le dernier conducteur affiché pendant l'animation de fermeture.
  const [shown, setShown] = useState(invitation)
  if (invitation && invitation !== shown) setShown(invitation)

  return (
    <Dialog
      open={invitation !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100svh-2rem)] gap-3.5 overflow-y-auto rounded-[1.25rem] bg-card p-4.5 sm:max-w-136"
      >
        <DialogHeader>
          <DialogTitle className="text-base leading-snug font-bold">
            Sortir un conducteur de la flotte
          </DialogTitle>
          <DialogDescription className="sr-only">
            Vérifiez les conséquences, puis confirmez la sortie de ce conducteur.
          </DialogDescription>
        </DialogHeader>
        {shown && (
          <RemoveDriverForm
            key={shown.id}
            invitation={shown}
            onConfirm={() => onConfirm(shown)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function RemoveDriverForm({ invitation, onConfirm }: { invitation: Invitation; onConfirm: () => void }) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <>
      <InvitationSummary invitation={invitation} />

      <section aria-labelledby="removal-effects" className="flex flex-col gap-2.5">
        <h3 id="removal-effects" className="text-sm font-bold">
          Ce qui se passe
        </h3>
        <InfoList items={consequences} />
      </section>

      <Field orientation="horizontal" className="min-h-10 gap-3 rounded-xl border border-border px-3 py-1.5">
        <Checkbox
          id="confirm-removal"
          checked={confirmed}
          onCheckedChange={(checked) => setConfirmed(checked === true)}
          className="size-4.5 rounded-[5px]"
        />
        <FieldLabel htmlFor="confirm-removal" className="cursor-pointer py-1 text-[13px] font-semibold">
          Je confirme la sortie de ce conducteur
        </FieldLabel>
      </Field>

      <div className="flex flex-wrap justify-end gap-2">
        <DialogClose
          render={
            <Button
              variant="outline"
              className="h-10 rounded-xl bg-card px-4 text-sm font-bold text-primary hover:text-primary"
            />
          }
        >
          Annuler
        </DialogClose>
        <Button
          variant="danger"
          disabled={!confirmed}
          onClick={onConfirm}
          className="h-10 rounded-xl px-5 text-sm font-bold disabled:opacity-40"
        >
          Confirmer la sortie
        </Button>
      </div>
    </>
  )
}
