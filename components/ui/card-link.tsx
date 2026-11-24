import type { ComponentProps } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

/** Lien discret placé dans l'en-tête d'une carte (« Conducteurs », « Détail »…). */
function CardLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="card-link"
      className={cn(
        "text-[13px] font-bold text-primary underline underline-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { CardLink }
