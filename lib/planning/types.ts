import type { Vehicle } from "@/lib/vehicles/types"

/** Teinte attribuée à un conducteur dans le planning (voir `data-driver-tone`). */
export type DriverTone = 1 | 2 | 3 | 4 | 5

/** Conducteur actif, identifié par son seul numéro (jamais par un nom ou un pseudonyme). */
export type PlannedDriver = {
  id: string
  /** Les 10 chiffres nationaux ; seuls les 4 derniers sont affichés. */
  phone: string
  tone: DriverTone
}

/** Un véhicule confié à un conducteur pour une journée. */
export type Assignment = {
  vehicleId: string
  /** Date ISO (AAAA-MM-JJ). */
  date: string
  driverId: string
}

/** Correction d'une affectation passée ou du jour : l'affectation d'origine reste tracée. */
export type Regularization = {
  id: string
  vehicleId: string
  date: string
  fromDriverId: string
  toDriverId: string
  reason: string
  /** Auteur de la correction. */
  by: string
  /** Horodatage ISO (UTC). */
  at: string
}

export type PlanningVehicle = Pick<Vehicle, "id" | "plate" | "make" | "model" | "kind"> & {
  hasBeacon: boolean
}

export type PlanningData = {
  /** Date du jour (ISO), source de « passé », « aujourd’hui » et « à venir ». */
  today: string
  vehicles: PlanningVehicle[]
  drivers: PlannedDriver[]
  assignments: Assignment[]
  regularizations: Regularization[]
}
