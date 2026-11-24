"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"

import { PhoneInput } from "@/components/app/phone-input"
import { SmsPreview } from "@/components/drivers/sms-preview"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  formatInternationalNumber,
  isValidIvorianNumber,
  normalizeIvorianNumber,
} from "@/lib/phone"

const MAX_BULK_NUMBERS = 50

type InviteFormProps = {
  organization: string
  sampleCode: string
  /** Appelé après un envoi réussi (ferme la fenêtre). */
  onSent: () => void
}

/** Bouton « Inviter » et fenêtre d'envoi d'invitations par SMS, à un ou plusieurs numéros. */
export function InviteDriversDialog({ organization, sampleCode }: Omit<InviteFormProps, "onSent">) {
  const [open, setOpen] = useState(false)
  const onSent = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="h-9 gap-1.5 rounded-xl px-3.5 text-[13px] font-bold" />}>
        <Icon icon="user-plus-rounded-linear" data-icon="inline-start" className="size-4" />
        Inviter des conducteurs
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-3.5 overflow-y-auto rounded-[1.25rem] bg-card p-4.5 sm:max-w-110">
        <DialogHeader className="flex-row items-center gap-2.5">
          <IconBubble icon="user-plus-rounded-linear" tone="success" className="size-8.5 [&_svg]:size-4.5" />
          <div className="flex flex-col gap-0.5">
            <DialogTitle className="text-base leading-snug font-bold">Inviter des conducteurs</DialogTitle>
            <DialogDescription className="text-xs">
              Chaque numéro reçoit un SMS avec un code d’invitation.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Tabs defaultValue="single" className="gap-3">
          <TabsList variant="pill" className="w-full">
            <TabsTrigger value="single">Un numéro</TabsTrigger>
            <TabsTrigger value="bulk">Plusieurs numéros</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <SingleInviteForm organization={organization} sampleCode={sampleCode} onSent={onSent} />
          </TabsContent>
          <TabsContent value="bulk">
            <BulkInviteForm organization={organization} sampleCode={sampleCode} onSent={onSent} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function SingleInviteForm({ organization, sampleCode, onSent }: InviteFormProps) {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isValidIvorianNumber(phone)) {
      setError("Saisissez les 10 chiffres du numéro.")
      return
    }
    // TODO : appeler l'API d'invitation.
    toast.success(`Invitation envoyée au ${formatInternationalNumber(phone)}`)
    setPhone("")
    setError(null)
    onSent()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <Field data-invalid={error ? true : undefined} className="gap-1.5">
        <FieldLabel htmlFor="invite-phone" className="text-[13px] font-semibold">
          Téléphone du conducteur
        </FieldLabel>
        <PhoneInput
          id="invite-phone"
          name="phone"
          value={phone}
          onValueChange={(digits) => {
            setPhone(digits)
            if (error) setError(null)
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby="invite-phone-help"
        />
        {error ? (
          <FieldError className="text-xs">{error}</FieldError>
        ) : (
          <FieldDescription id="invite-phone-help" className="text-xs">
            Numéro ivoirien à 10 chiffres.
          </FieldDescription>
        )}
      </Field>

      <SmsPreview organization={organization} code={sampleCode} />

      <SubmitButton>Envoyer l’invitation</SubmitButton>
      <PrivacyNote />
    </form>
  )
}

function BulkInviteForm({ organization, sampleCode, onSent }: InviteFormProps) {
  const [text, setText] = useState("")
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean)
  const numbers = lines.map(normalizeIvorianNumber)
  const valid = [...new Set(numbers.filter(isValidIvorianNumber))]
  const invalidCount = numbers.length - numbers.filter(isValidIvorianNumber).length
  const tooMany = valid.length > MAX_BULK_NUMBERS

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (valid.length === 0 || tooMany) return
    // TODO : appeler l'API d'invitation groupée.
    toast.success(`${valid.length} invitation${valid.length > 1 ? "s" : ""} envoyée${valid.length > 1 ? "s" : ""}`)
    setText("")
    onSent()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <Field data-invalid={invalidCount > 0 || tooMany ? true : undefined} className="gap-1.5">
        <FieldLabel htmlFor="invite-phones" className="text-[13px] font-semibold">
          Téléphones des conducteurs
        </FieldLabel>
        <Textarea
          id="invite-phones"
          name="phones"
          rows={4}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={"07 48 21 63 05\n05 66 12 90 12"}
          aria-describedby="invite-phones-help"
          aria-invalid={invalidCount > 0 || tooMany ? true : undefined}
          className="min-h-24 rounded-xl bg-muted px-3 py-2.5 text-sm md:text-sm"
        />
        <FieldDescription id="invite-phones-help" className="text-xs">
          Un numéro ivoirien par ligne, {MAX_BULK_NUMBERS} au maximum.
          {valid.length > 0 && ` ${valid.length} numéro${valid.length > 1 ? "s" : ""} valide${valid.length > 1 ? "s" : ""}.`}
        </FieldDescription>
        {invalidCount > 0 && (
          <FieldError className="text-xs">
            {invalidCount} ligne{invalidCount > 1 ? "s" : ""} ne contien{invalidCount > 1 ? "nent" : "t"} pas un numéro à 10 chiffres.
          </FieldError>
        )}
        {tooMany && (
          <FieldError className="text-xs">Pas plus de {MAX_BULK_NUMBERS} numéros à la fois.</FieldError>
        )}
      </Field>

      <SmsPreview organization={organization} code={sampleCode} />

      <SubmitButton disabled={valid.length === 0 || tooMany}>
        {valid.length > 1 ? `Envoyer ${valid.length} invitations` : "Envoyer l’invitation"}
      </SubmitButton>
      <PrivacyNote />
    </form>
  )
}

function SubmitButton({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="h-10 w-full gap-2 rounded-xl text-sm font-bold"
    >
      <Icon icon="plain-3-linear" data-icon="inline-start" className="size-4.5" />
      {children}
    </Button>
  )
}

function PrivacyNote() {
  return (
    <p className="flex items-start gap-2 text-xs text-muted-foreground">
      <Icon icon="shield-check-linear" className="size-4 shrink-0 text-primary" />
      Le numéro saisi reste visible pour vous seul. Aucun pseudonyme n’est affiché.
    </p>
  )
}
