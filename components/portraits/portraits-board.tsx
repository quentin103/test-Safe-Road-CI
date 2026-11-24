"use client"

import { useMemo, useState } from "react"

import { PortraitCard } from "@/components/portraits/portrait-card"
import { PortraitSheet } from "@/components/portraits/portrait-sheet"
import { Icon } from "@/components/ui/icon"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatMonth } from "@/lib/badges/badges"
import { formatDate, formatNumber } from "@/lib/format"
import { matchesPortrait, sortLabels, sortPortraits, type SortKey } from "@/lib/portraits/portraits"
import type { Portrait, PortraitsData } from "@/lib/portraits/types"

/** Recherche, tri, cartes de portraits et accords retirés. */
export function PortraitsBoard({ month, portraits, withdrawals }: PortraitsData) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortKey>("score")
  const [openedId, setOpenedId] = useState<string | null>(null)

  const visible = useMemo(
    () => sortPortraits(portraits.filter((portrait) => matchesPortrait(portrait, query)), sort),
    [portraits, query, sort]
  )
  const opened = portraits.find((portrait) => portrait.id === openedId) ?? null
  const count = portraits.length

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 rounded-[1.25rem] bg-card px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <h2 className="text-base leading-tight font-bold capitalize">{formatMonth(month)}</h2>
          <p className="text-xs text-muted-foreground">
            {formatNumber(count)} conducteur{count > 1 ? "s" : ""} partage{count > 1 ? "nt" : ""} {count > 1 ? "leur" : "son"} portrait
          </p>
        </div>
        <label htmlFor="portraits-search" className="sr-only">
          Rechercher un nom
        </label>
        <InputGroup className="h-9 w-full rounded-full border-transparent bg-muted sm:w-56">
          <InputGroupAddon className="pl-3">
            <Icon icon="magnifier-linear" className="size-4" />
          </InputGroupAddon>
          <InputGroupInput
            id="portraits-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un nom"
            className="text-[13px] md:text-[13px]"
          />
        </InputGroup>
        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="flex items-center gap-1 text-xs text-soft-foreground">
            <Icon icon="sort-vertical-linear" className="size-3.5" />
            Trier
          </span>
          <Tabs value={sort} onValueChange={(value) => setSort(value as SortKey)}>
            <TabsList variant="pill" size="sm" aria-label="Trier les portraits">
              {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {sortLabels[key]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-[1.25rem] border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
          Aucun portrait ne correspond à votre recherche.
        </p>
      ) : (
        <ul aria-label="Portraits partagés" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((portrait) => (
            <li key={portrait.id}>
              <PortraitCard portrait={portrait} onOpen={(item: Portrait) => setOpenedId(item.id)} className="h-full" />
            </li>
          ))}
        </ul>
      )}

      {withdrawals.map((withdrawal) => (
        <p
          key={withdrawal.date}
          className="flex items-center gap-3 rounded-[1.25rem] border border-dashed border-border px-4 py-2.5 text-[13px] text-soft-foreground"
        >
          <Icon icon="eye-closed-linear" className="size-4.5 shrink-0 text-muted-foreground" />
          <span>
            <span className="font-bold text-foreground">Un accord retiré le {formatDate(withdrawal.date)}.</span> Ce portrait n’est plus
            visible. Le portail n’en garde aucune trace et ne dit pas de qui il s’agissait.
          </span>
        </p>
      ))}

      <PortraitSheet portrait={opened} month={month} onClose={() => setOpenedId(null)} />
    </>
  )
}
