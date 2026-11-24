"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VehicleGrid, VehicleTable } from "@/components/vehicles/vehicle-list"
import { WeekAssignmentLegend } from "@/components/vehicles/week-assignment"
import { formatNumber } from "@/lib/format"
import type { BeaconStatus, Vehicle } from "@/lib/vehicles/types"
import { getBeaconStatus, matchesVehicleQuery } from "@/lib/vehicles/vehicle"
import { cn } from "@/lib/utils"

type Filter = "all" | BeaconStatus
type View = "list" | "cards"

const filters: { value: Filter; label: string; dot: string }[] = [
  { value: "all", label: "Tous", dot: "bg-current" },
  { value: "inventoried", label: "Inventoriées", dot: "bg-moss" },
  { value: "pending", label: "À inventorier", dot: "bg-ochre/60" },
  { value: "none", label: "Sans balise", dot: "bg-danger-muted" },
]

type VehicleFleetCardProps = {
  vehicles: Vehicle[]
  onOpen: (vehicle: Vehicle) => void
  onAdd: () => void
  className?: string
}

/** Parc de véhicules : recherche, filtre par état de balise, vue liste ou cartes. */
export function VehicleFleetCard({ vehicles, onOpen, onAdd, className }: VehicleFleetCardProps) {
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")
  const [view, setView] = useState<View>("list")

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { all: vehicles.length, inventoried: 0, pending: 0, none: 0 }
    for (const vehicle of vehicles) result[getBeaconStatus(vehicle)] += 1
    return result
  }, [vehicles])

  const visible = useMemo(
    () =>
      vehicles.filter(
        (vehicle) =>
          (filter === "all" || getBeaconStatus(vehicle) === filter) && matchesVehicleQuery(vehicle, query)
      ),
    [vehicles, filter, query]
  )

  const shown = visible.length
  const plural = shown > 1 ? "s" : ""

  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle>
          <h2>Parc de véhicules</h2>
        </CardTitle>
        <CardDescription aria-live="polite">
          {formatNumber(shown)} véhicule{plural} affiché{plural} sur {formatNumber(vehicles.length)}
        </CardDescription>
        <CardAction>
          <Button onClick={onAdd} className="h-9 gap-1.5 rounded-xl px-3.5 text-[13px] font-bold">
            <Icon icon="add-linear" data-icon="inline-start" className="size-4" />
            <span className="hidden sm:inline">Ajouter un véhicule</span>
            <span className="sm:hidden">Ajouter</span>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-muted p-1.5">
          <label htmlFor="vehicles-search" className="sr-only">
            Rechercher un véhicule
          </label>
          <InputGroup className="h-9 w-full rounded-full border-transparent bg-card sm:w-52">
            <InputGroupAddon className="pl-3">
              <Icon icon="magnifier-linear" className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              id="vehicles-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Plaque, modèle, balise"
              className="text-[13px] md:text-[13px]"
            />
          </InputGroup>

          <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)} className="max-w-full min-w-0">
            <TabsList
              variant="pill"
              size="sm"
              aria-label="Filtrer par état de balise"
              className="flex-wrap justify-start gap-1 bg-transparent p-0 group-data-horizontal/tabs:h-auto"
            >
              {filters.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="flex-none gap-1.5 not-data-active:bg-card group-data-[variant=pill]/tabs-list:h-9"
                >
                  <span aria-hidden="true" className={cn("size-1.5 rounded-full", item.dot)} />
                  {item.label}
                  <span className="font-medium opacity-60 tabular-nums">{counts[item.value]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Sur mobile, le tableau serait trop large : les cartes s'affichent toujours. */}
          <Tabs value={view} onValueChange={(value) => setView(value as View)} className="ml-auto hidden lg:flex">
            <TabsList variant="pill" size="sm" aria-label="Affichage" className="bg-card">
              <TabsTrigger value="list" className="gap-1.5">
                <Icon icon="list-linear" className="size-4" />
                Liste
              </TabsTrigger>
              <TabsTrigger value="cards" className="gap-1.5">
                <Icon icon="widget-linear" className="size-4" />
                Cartes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>

      <CardContent>
        {shown === 0 ? (
          <p className="rounded-xl border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            Aucun véhicule ne correspond à votre recherche.
          </p>
        ) : view === "list" ? (
          <>
            <div className="hidden lg:block">
              <VehicleTable vehicles={visible} onOpen={onOpen} />
            </div>
            <VehicleGrid vehicles={visible} onOpen={onOpen} className="lg:hidden" />
          </>
        ) : (
          <VehicleGrid vehicles={visible} onOpen={onOpen} />
        )}
      </CardContent>

      <CardContent>
        <WeekAssignmentLegend />
      </CardContent>
    </Card>
  )
}
