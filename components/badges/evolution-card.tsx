"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatMonth, tierColorClass } from "@/lib/badges/badges"
import type { MonthlyBadges, TierDefinition } from "@/lib/badges/types"
import { MASKED_COUNT_LABEL, formatNumber, type MaskedCount } from "@/lib/format"
import { cn } from "@/lib/utils"

type EvolutionCardProps = {
  tiers: TierDefinition[]
  months: MonthlyBadges[]
  selected: string
  onSelect: (month: string) => void
  className?: string
}

/** Conducteurs à chaque palier, mois par mois ; la ligne choisie alimente le haut de la page. */
export function EvolutionCard({ tiers, months, selected, onSelect, className }: EvolutionCardProps) {
  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="graph-up-linear" className="size-4.5 text-primary" />
          <h2>Mois par mois</h2>
        </CardTitle>
        <CardDescription>Nombre de conducteurs à chaque palier. Cliquez sur un mois pour l’afficher en haut.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="min-w-[30rem] border-separate border-spacing-y-1">
          <TableHeader className="[&_tr]:border-0">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-7 pl-3">Mois</TableHead>
              {tiers.map((tier) => (
                <TableHead key={tier.tier} className="h-7 text-center">
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className={cn("size-2.5 rounded-full", tierColorClass[tier.tier])} />
                    {tier.label}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {months.map((month) => {
              const active = month.month === selected
              return (
                <TableRow
                  key={month.month}
                  aria-selected={active}
                  onClick={() => onSelect(month.month)}
                  className={cn(
                    "cursor-pointer border-0 hover:bg-transparent",
                    "[&>td]:border-y [&>td]:border-track [&>td]:bg-card [&>td]:py-1.5 [&>td:first-child]:rounded-l-xl [&>td:first-child]:border-l [&>td:last-child]:rounded-r-xl [&>td:last-child]:border-r",
                    active ? "[&>td]:border-foreground" : "[&>td]:hover:bg-muted/40"
                  )}
                >
                  <th scope="row" className="rounded-l-xl border-y border-l border-track bg-card py-1.5 pl-3 text-left text-[13px] font-bold whitespace-nowrap">
                    {formatMonth(month.month, { capitalized: true })}
                  </th>
                  {tiers.map((tier) => (
                    <td key={tier.tier} className="px-1">
                      <CountCell value={month.counts[tier.tier]} />
                    </td>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardContent>
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Icon icon="info-circle-linear" className="mt-px size-3.5 shrink-0" />
          Pas de total par mois ni par palier : une soustraction suffirait à retrouver un chiffre masqué.
        </p>
      </CardContent>
    </Card>
  )
}

function CountCell({ value }: { value: MaskedCount }) {
  if (value === null) {
    return (
      <span className="flex h-8 items-center justify-center gap-1 rounded-lg bg-[repeating-linear-gradient(135deg,var(--track)_0_6px,var(--muted)_6px_12px)] text-xs font-semibold text-soft-foreground">
        <Icon icon="lock-linear" className="size-3.5" />
        {MASKED_COUNT_LABEL}
      </span>
    )
  }
  const strength = value === 0 ? "bg-muted text-stone" : value >= 10 ? "bg-moss/70 text-foreground" : "bg-mint text-foreground"
  return (
    <span className={cn("flex h-8 items-center justify-center rounded-lg text-sm font-bold tabular-nums", strength)}>
      {formatNumber(value)}
    </span>
  )
}
