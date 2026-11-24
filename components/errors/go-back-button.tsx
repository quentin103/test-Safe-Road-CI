"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

/** Revient à la page précédente ; sans historique (lien ouvert directement), va au tableau de bord. */
export function GoBackButton() {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      onClick={() => (window.history.length > 1 ? router.back() : router.push("/dashboard"))}
      className="h-10 gap-1.5 rounded-xl bg-card px-4 text-sm font-bold text-primary hover:text-primary"
    >
      <Icon icon="arrow-left-linear" data-icon="inline-start" className="size-4" />
      Page précédente
    </Button>
  )
}
