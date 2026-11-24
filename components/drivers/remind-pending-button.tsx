"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

/** Relance groupée des invités qui n'ont pas encore installé l'application. */
export function RemindPendingButton({ count }: { count: number }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        // TODO : appeler l'API de relance groupée.
        toast.success(count > 1 ? `Relance envoyée aux ${count} invités` : "Relance envoyée à l’invité")
      }}
      className="h-7 gap-1 rounded-lg bg-card px-2.5 text-xs font-bold text-primary hover:text-primary"
    >
      Relancer
    </Button>
  )
}
