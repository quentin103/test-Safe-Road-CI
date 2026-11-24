"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BeaconStatusCell } from "@/components/vehicles/beacon-status"
import { VehicleIdentity } from "@/components/vehicles/vehicle-identity"
import { VehicleSpecs } from "@/components/vehicles/vehicle-specs"
import { WeekAssignment } from "@/components/vehicles/week-assignment"
import type { Vehicle } from "@/lib/vehicles/types"
import { cn } from "@/lib/utils"

type VehicleListProps = {
  vehicles: Vehicle[]
  onOpen: (vehicle: Vehicle) => void
  className?: string
}

/** Cellule d'une ligne-carte : bordure haute et basse, arrondis aux extrémités. */
const rowCell =
  "border-y border-track bg-card py-2.5 transition-colors first:rounded-l-xl first:border-l first:pl-3 last:rounded-r-xl last:border-r last:pr-3 group-hover/row:bg-muted/40"

/** Vue « Liste » : une ligne par véhicule, présentée comme une carte. */
export function VehicleTable({ vehicles, onOpen }: VehicleListProps) {
  return (
    <Table className="min-w-[48rem] border-separate border-spacing-y-1.5">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-3">Véhicule</TableHead>
          <TableHead>Caractéristiques</TableHead>
          <TableHead>Balise</TableHead>
          <TableHead>Affectation cette semaine</TableHead>
          <TableHead className="pr-3 text-right">Fiche</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id} className="group/row border-0 hover:bg-transparent">
            <TableCell className={rowCell}>
              <VehicleIdentity vehicle={vehicle} />
            </TableCell>
            <TableCell className={rowCell}>
              <VehicleSpecs vehicle={vehicle} />
            </TableCell>
            <TableCell className={rowCell}>
              <BeaconStatusCell vehicle={vehicle} />
            </TableCell>
            <TableCell className={rowCell}>
              <WeekAssignment week={vehicle.week} />
            </TableCell>
            <TableCell className={rowCell}>
              <div className="flex justify-end">
                <OpenVehicleButton vehicle={vehicle} onOpen={onOpen} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/** Vue « Cartes » : une carte par véhicule. */
export function VehicleGrid({ vehicles, onOpen, className }: VehicleListProps) {
  return (
    <ul aria-label="Véhicules" className={cn("grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {vehicles.map((vehicle) => (
        <li key={vehicle.id} className="flex flex-col gap-3 rounded-xl border border-track bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <VehicleIdentity vehicle={vehicle} className="min-w-0" />
            <OpenVehicleButton vehicle={vehicle} onOpen={onOpen} />
          </div>
          <VehicleSpecs vehicle={vehicle} />
          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-track pt-2.5">
            <BeaconStatusCell vehicle={vehicle} />
            <WeekAssignment week={vehicle.week} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function OpenVehicleButton({ vehicle, onOpen }: { vehicle: Vehicle; onOpen: (vehicle: Vehicle) => void }) {
  return (
    <Button
      variant="outline"
      onClick={() => onOpen(vehicle)}
      aria-label={`Ouvrir la fiche du véhicule ${vehicle.plate}`}
      className="h-8 gap-1 rounded-lg bg-card px-3 text-[13px] font-bold"
    >
      Ouvrir
      <Icon icon="alt-arrow-right-linear" data-icon="inline-end" className="size-3.5" />
    </Button>
  )
}
