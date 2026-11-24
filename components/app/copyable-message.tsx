"use client"

import { CopyButton } from "@/components/ui/copy-button"
import { formatNumber } from "@/lib/format"
import { cn } from "@/lib/utils"

/** Nombre de SMS de 160 caractères (estimation prudente : les accents peuvent en compter plus). */
export function countSms(text: string) {
  return Math.max(1, Math.ceil(text.length / 160))
}

type CopyableMessageProps = {
  message: string
  /** Libellé lu par les lecteurs d'écran pour le bouton. */
  label?: string
  className?: string
}

/** Message prêt à envoyer : texte, longueur en caractères et SMS, bouton de copie. */
export function CopyableMessage({ message, label = "Copier le message", className }: CopyableMessageProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <blockquote className="flex-1 rounded-xl bg-accent/70 p-3 text-[13px] leading-relaxed">{message}</blockquote>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          {formatNumber(message.length)} caractères · {countSms(message)} SMS
        </span>
        <CopyButton
          value={message}
          label={label}
          variant="default"
          size="default"
          className="h-9 w-auto gap-1.5 rounded-xl bg-primary px-3.5 text-[13px] font-bold text-primary-foreground hover:bg-primary/90 [&_svg]:size-4"
        >
          {label}
        </CopyButton>
      </div>
    </div>
  )
}
