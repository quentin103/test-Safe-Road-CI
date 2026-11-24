import {
  PLANNING_TODAY,
  plannedAssignments,
  plannedDrivers,
  plannedRegularizations,
} from "@/lib/planning/assignments"
import type { PlanningData } from "@/lib/planning/types"
import { getVehiclesData } from "@/lib/vehicles/data"

/**
 * Données de la page Planning.
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */
export async function getPlanningData(): Promise<PlanningData> {
  const { vehicles } = await getVehiclesData()

  return {
    today: PLANNING_TODAY,
    vehicles: vehicles.map(({ id, plate, make, model, kind, beacon }) => ({
      id,
      plate,
      make,
      model,
      kind,
      hasBeacon: beacon !== null,
    })),
    drivers: plannedDrivers,
    assignments: plannedAssignments,
    regularizations: plannedRegularizations,
  }
}
