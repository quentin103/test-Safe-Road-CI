import type { BeaconStatus, DayAssignment, FuelType, Vehicle, VehicleKind } from "@/lib/vehicles/types"

export const vehicleKindLabels: Record<VehicleKind, string> = {
  sedan: "Berline",
  "city-car": "Citadine",
  suv: "SUV",
  pickup: "Pick-up",
  minibus: "Minibus",
  van: "Utilitaire",
}

export const fuelLabels: Record<FuelType, string> = {
  petrol: "Essence",
  diesel: "Diesel",
  hybrid: "Hybride",
  electric: "Électrique",
}

export const beaconStatusLabels: Record<BeaconStatus, string> = {
  inventoried: "Inventoriée",
  pending: "À inventorier",
  none: "Sans balise",
}

/** Initiale et nom de chaque jour, du lundi au dimanche. */
export const weekDays = [
  { short: "L", name: "Lundi" },
  { short: "M", name: "Mardi" },
  { short: "M", name: "Mercredi" },
  { short: "J", name: "Jeudi" },
  { short: "V", name: "Vendredi" },
  { short: "S", name: "Samedi" },
  { short: "D", name: "Dimanche" },
] as const

export const dayAssignmentLabels: Record<DayAssignment, string> = {
  assigned: "Affecté",
  regularized: "Affectation régularisée",
  none: "Non affecté",
}

export function getBeaconStatus(vehicle: Vehicle): BeaconStatus {
  return vehicle.beacon?.status ?? "none"
}

/** Icône du véhicule selon sa catégorie. */
export function getVehicleIcon(kind: VehicleKind) {
  return kind === "minibus" || kind === "van" ? "bus-linear" : "car-linear"
}

/** Nombre de jours affectés (prévus ou régularisés) dans la semaine. */
export function countAssignedDays(week: DayAssignment[]) {
  return week.filter((day) => day !== "none").length
}

/** Indicateurs du parc, calculés à partir de la liste des véhicules. */
export function summarizeFleet(vehicles: Vehicle[]) {
  const byStatus = { inventoried: 0, pending: 0, none: 0 } satisfies Record<BeaconStatus, number>
  for (const vehicle of vehicles) byStatus[getBeaconStatus(vehicle)] += 1

  return {
    total: vehicles.length,
    assignedThisWeek: vehicles.filter((vehicle) => countAssignedDays(vehicle.week) > 0).length,
    /** Balises posées : inventoriées ou en attente de détection. */
    installedBeacons: byStatus.inventoried + byStatus.pending,
    byStatus,
  }
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "")

/** Recherche sur la plaque, la marque et le modèle, ou le numéro de balise. */
export function matchesVehicleQuery(vehicle: Vehicle, query: string) {
  const needle = normalize(query)
  if (!needle) return true
  return [vehicle.plate, `${vehicle.make} ${vehicle.model}`, vehicle.beacon?.code ?? ""].some((value) =>
    normalize(value).includes(needle)
  )
}

/** Formate une immatriculation ivoirienne saisie librement : « 1234ab01 » → « 1234 AB 01 ». */
export function normalizePlate(value: string) {
  const match = value
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .match(/^(\d{1,4})([A-Z]{1,2})(\d{2})$/)
  return match ? `${match[1]} ${match[2]} ${match[3]}` : null
}

/** Formate un numéro de balise saisi librement : « srbx58 » → « SR-BX-0058 ». */
export function normalizeBeaconCode(value: string) {
  const match = value
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .match(/^(?:SRBX)?(\d{1,4})$/)
  return match ? `SR-BX-${match[1].padStart(4, "0")}` : null
}
