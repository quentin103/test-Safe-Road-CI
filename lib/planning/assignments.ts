import type { Assignment, PlannedDriver, Regularization } from "@/lib/planning/types"
import { addDays } from "@/lib/planning/week"

/**
 * Affectations et régularisations de démonstration, partagées par les pages
 * Planning et Véhicules.
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */

/** Date du jour des données de démonstration. */
export const PLANNING_TODAY = "2026-11-11"

export const plannedDrivers: PlannedDriver[] = [
  { id: "drv-05", phone: "0748216305", tone: 1 },
  { id: "drv-12", phone: "0566129012", tone: 2 },
  { id: "drv-37", phone: "0173405837", tone: 3 },
  { id: "drv-23", phone: "0544586223", tone: 4 },
  { id: "drv-58", phone: "0102451958", tone: 5 },
]

/**
 * Une ligne par véhicule, une colonne par jour (lundi → dimanche) :
 * les deux derniers chiffres du conducteur, ou « -- » pour un jour libre.
 */
const weeks: Record<string, Record<string, string>> = {
  "2026-11-02": {
    "veh-1": "05 05 05 05 05 -- --",
    "veh-2": "12 12 12 12 12 12 --",
    "veh-3": "37 37 -- 37 37 -- --",
    "veh-4": "23 23 23 -- -- -- --",
    "veh-5": "58 58 58 58 58 58 --",
    "veh-6": "-- -- -- -- -- -- --",
  },
  "2026-11-09": {
    "veh-1": "05 05 37 05 05 -- --",
    "veh-2": "12 37 12 12 12 12 --",
    "veh-3": "37 -- -- 37 37 -- --",
    "veh-4": "-- 23 23 23 -- -- --",
    "veh-5": "58 58 58 -- 58 58 58",
    "veh-6": "-- -- -- -- -- -- --",
  },
  "2026-11-16": {
    "veh-1": "05 05 05 05 05 -- --",
    "veh-2": "12 12 12 -- -- -- --",
    "veh-3": "37 37 -- -- -- -- --",
    "veh-4": "-- -- -- -- -- -- --",
    "veh-5": "58 58 58 -- -- -- --",
    "veh-6": "-- -- -- -- -- -- --",
  },
}

export const plannedAssignments: Assignment[] = Object.entries(weeks).flatMap(([weekStart, rows]) =>
  Object.entries(rows).flatMap(([vehicleId, row]) =>
    row.split(" ").flatMap((code, day) =>
      code === "--" ? [] : [{ vehicleId, date: addDays(weekStart, day), driverId: `drv-${code}` }]
    )
  )
)

export const plannedRegularizations: Regularization[] = [
  {
    id: "reg-3",
    vehicleId: "veh-1",
    date: "2026-11-11",
    fromDriverId: "drv-05",
    toDriverId: "drv-37",
    reason: "Conducteur prévu en congé",
    by: "Koffi N’Guessan",
    at: "2026-11-11T08:40:00Z",
  },
  {
    id: "reg-2",
    vehicleId: "veh-2",
    date: "2026-11-10",
    fromDriverId: "drv-12",
    toDriverId: "drv-37",
    reason: "Échange de véhicule sur place",
    by: "Aya Koné",
    at: "2026-11-10T17:15:00Z",
  },
  {
    id: "reg-1",
    vehicleId: "veh-5",
    date: "2026-11-06",
    fromDriverId: "drv-23",
    toDriverId: "drv-58",
    reason: "Panne du véhicule prévu",
    by: "Koffi N’Guessan",
    at: "2026-11-06T09:05:00Z",
  },
]
