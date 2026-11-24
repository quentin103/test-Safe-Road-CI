import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

type SmsPreviewProps = {
  organization: string
  code: string
  className?: string
}

/** Aperçu du SMS d'invitation reçu par le conducteur. */
export function SmsPreview({ organization, code, className }: SmsPreviewProps) {
  return (
    <figure className={cn("flex flex-col gap-2 rounded-[0.875rem] bg-muted p-2.5", className)}>
      <figcaption className="flex items-center gap-1.5 px-1 text-xs font-semibold text-soft-foreground">
        <Icon icon="chat-round-line-linear" className="size-4" />
        Aperçu du SMS
      </figcaption>
      <p className="rounded-[0.625rem] bg-card px-3 py-2 text-[13px] leading-normal">
        {organization} vous invite sur Safe Road CI. Votre code&nbsp;: <strong>{code}</strong>.
        Installez l’application&nbsp;: [lien de téléchargement]
      </p>
    </figure>
  )
}
