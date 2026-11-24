"use client"

import { useState } from "react"

import { CongratulationsCard } from "@/components/badges/congratulations-card"
import { EvolutionCard } from "@/components/badges/evolution-card"
import { TierCards } from "@/components/badges/tier-cards"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { buildCongratulations, formatMonth } from "@/lib/badges/badges"
import type { BadgesData } from "@/lib/badges/types"

type BadgesBoardProps = BadgesData & { organization: string }

/** Choix du mois, paliers, évolution et message : tout suit le même mois. */
export function BadgesBoard({ tiers, months, organization }: BadgesBoardProps) {
  const [selected, setSelected] = useState(months[0]?.month ?? "")
  const month = months.find((item) => item.month === selected) ?? months[0]
  if (!month) return null

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Tabs value={selected} onValueChange={(value) => setSelected(value as string)} className="w-full gap-0 sm:w-fit">
          <TabsList variant="pill" aria-label="Mois affiché" className="w-full bg-card sm:w-fit">
            {months.map((item) => (
              <TabsTrigger key={item.month} value={item.month} className="capitalize sm:flex-none">
                {formatMonth(item.month, { short: true })}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <p className="flex items-center gap-1.5 text-xs text-soft-foreground">
          <Icon icon="lock-linear" className="size-3.5" />
          Les paliers de 1 à 4 conducteurs s’affichent « moins de 5 », pour ne désigner personne.
        </p>
      </div>

      <TierCards tiers={tiers} month={month} />

      <div className="grid gap-3 lg:grid-cols-[minmax(0,16fr)_minmax(0,9fr)] lg:items-start">
        <EvolutionCard tiers={tiers} months={months} selected={month.month} onSelect={setSelected} />
        <CongratulationsCard message={buildCongratulations(month, tiers, organization)} />
      </div>
    </>
  )
}
