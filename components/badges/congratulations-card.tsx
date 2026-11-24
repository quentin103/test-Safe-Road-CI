"use client"

import { CopyableMessage } from "@/components/app/copyable-message"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

type CongratulationsCardProps = {
  message: string
  className?: string
}

/** Message de félicitations prêt à copier, sans aucun chiffre masqué. */
export function CongratulationsCard({ message, className }: CongratulationsCardProps) {
  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="confetti-minimalistic-linear" className="size-4.5 text-primary" />
          <h2>Féliciter toute la flotte</h2>
        </CardTitle>
        <CardDescription>Message prêt à envoyer par SMS ou dans votre groupe. Les chiffres masqués n’y figurent pas.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <CopyableMessage message={message} className="flex-1" />
      </CardContent>
    </Card>
  )
}
