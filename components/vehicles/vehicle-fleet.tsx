"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import { AddVehicleDialog } from "@/components/vehicles/add-vehicle-dialog"
import { VehicleFleetCard } from "@/components/vehicles/vehicle-fleet-card"
import { VehicleSheet } from "@/components/vehicles/vehicle-sheet"
import { VehicleStats } from "@/components/vehicles/vehicle-stats"
import type { Vehicle } from "@/lib/vehicles/types"
import { summarizeFleet } from "@/lib/vehicles/vehicle"

/** Indicateurs, parc de véhicules, fiche et ajout : partagent la même liste. */
export function VehicleFleet({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [openedId, setOpenedId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)

  const summary = useMemo(() => summarizeFleet(vehicles), [vehicles])
  const opened = vehicles.find((vehicle) => vehicle.id === openedId) ?? null
  const usedBeaconCodes = useMemo(
    () => vehicles.flatMap((vehicle) => (vehicle.beacon ? [vehicle.beacon.code] : [])),
    [vehicles]
  )

  function addVehicle(vehicle: Vehicle) {
    setVehicles((list) => [vehicle, ...list])
    setAdding(false)
    toast.success(`Véhicule ${vehicle.plate} ajouté au parc.`)
  }

  function saveBeacon(vehicle: Vehicle, code: string) {
    // TODO : appeler l'API d'enregistrement de la balise.
    setVehicles((list) =>
      list.map((item) => (item.id === vehicle.id ? { ...item, beacon: { code, status: "pending" } } : item))
    )
    toast.success(`Balise ${code} enregistrée : en attente de détection.`)
  }

  return (
    <>
      <VehicleStats summary={summary} />
      <VehicleFleetCard
        vehicles={vehicles}
        onOpen={(vehicle) => setOpenedId(vehicle.id)}
        onAdd={() => setAdding(true)}
      />
      <VehicleSheet
        vehicle={opened}
        usedBeaconCodes={usedBeaconCodes}
        onClose={() => setOpenedId(null)}
        onBeaconSave={saveBeacon}
      />
      <AddVehicleDialog
        open={adding}
        vehicles={vehicles}
        onClose={() => setAdding(false)}
        onAdd={addVehicle}
      />
    </>
  )
}
