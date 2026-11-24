"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"
import { formatNumber, formatPercent } from "@/lib/format"
import { cn } from "@/lib/utils"

type DetectionBannerProps = {
  active: number
  tracked: number
  updatedMinutesAgo: number
  className?: string
}

/** État d'ensemble en une phrase, selon la part de téléphones actifs sur 48 h. */
export function DetectionBanner({ active, tracked, updatedMinutesAgo, className }: DetectionBannerProps) {
  const [refreshing, setRefreshing] = useState(false)
  const ratio = tracked > 0 ? active / tracked : 0
  const level = ratio >= 0.9 ? "good" : ratio >= 0.7 ? "warning" : "bad"
  const title = {
    good: "La détection fonctionne bien",
    warning: "Quelques téléphones manquent à l’appel",
    bad: "Beaucoup de téléphones sont silencieux",
  }[level]

  function refresh() {
    // TODO : recharger les chiffres depuis l'API.
    setRefreshing(true)
    window.setTimeout(() => {
      setRefreshing(false)
      toast.success("Chiffres actualisés.")
    }, 600)
  }

  return (
    <section
      aria-label="État de la détection"
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-[1.25rem] px-4 py-3",
        level === "good" ? "bg-accent/70" : level === "warning" ? "bg-sand" : "bg-danger-soft",
        className
      )}
    >
      <IconBubble
        icon={level === "good" ? "check-circle-linear" : "danger-triangle-linear"}
        tone={level === "good" ? "primary" : level === "warning" ? "warning" : "danger"}
        size="lg"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <h2 className="text-[15px] leading-tight font-bold">{title}</h2>
        <p className="text-[13px] text-soft-foreground">
          {formatPercent(ratio)} des téléphones suivis ({formatNumber(active)} sur {formatNumber(tracked)}) ont envoyé des
          données dans les 48 dernières heures.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-soft-foreground">
          <Icon icon="clock-circle-linear" className="size-3.5" />
          Mis à jour il y a {formatNumber(updatedMinutesAgo)} min
        </span>
        <Button
          variant="outline"
          onClick={refresh}
          disabled={refreshing}
          className="h-9 gap-1.5 rounded-full bg-card px-3.5 text-[13px] font-bold"
        >
          <Icon icon="refresh-linear" data-icon="inline-start" className={cn("size-4", refreshing && "animate-spin")} />
          Actualiser
        </Button>
      </div>
    </section>
  )
}
