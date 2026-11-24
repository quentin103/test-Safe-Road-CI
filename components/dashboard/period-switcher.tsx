"use client"

import { useState } from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PeriodKind } from "@/lib/dashboard/types"
import { cn } from "@/lib/utils"

const periods: { value: PeriodKind; label: string }[] = [
  { value: "week", label: "Semaine dernière" },
  { value: "month", label: "Mois dernier" },
  { value: "quarter", label: "Trimestre dernier" },
]

type PeriodSwitcherProps = {
  defaultValue?: PeriodKind
  className?: string
}

/** Choix de la période affichée : la dernière semaine, le dernier mois ou le dernier trimestre terminés. */
export function PeriodSwitcher({ defaultValue = "week", className }: PeriodSwitcherProps) {
  const [period, setPeriod] = useState<PeriodKind>(defaultValue)

  return (
    <Tabs
      value={period}
      onValueChange={(value) => {
        setPeriod(value as PeriodKind)
        // TODO : recharger les données de la période (paramètre d'URL ou API).
      }}
      className={cn("w-full gap-0 sm:w-fit", className)}
    >
      <TabsList variant="pill" aria-label="Période" className="w-full bg-card sm:w-fit">
        {periods.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className="sm:flex-none">
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
