import {
  PLANNING_TODAY,
  plannedAssignments,
  plannedRegularizations,
} from "@/lib/planning/assignments"
import { getDayAssignment, indexSlots } from "@/lib/planning/planning"
import { startOfWeek, weekDates } from "@/lib/planning/week"
import type { Vehicle, VehiclesData } from "@/lib/vehicles/types"

const vehicleRecords: Omit<Vehicle, "week">[] = [
  {
    id: "veh-1",
    plate: "2481 KL 01",
    make: "Toyota",
    model: "Hilux",
    year: 2021,
    kind: "pickup",
    fuel: "diesel",
    seats: 5,
    beacon: { code: "SR-BX-0012", status: "inventoried" },
  },
  {
    id: "veh-2",
    plate: "7315 HG 01",
    make: "Hyundai",
    model: "H1",
    year: 2019,
    kind: "minibus",
    fuel: "diesel",
    seats: 12,
    beacon: { code: "SR-BX-0027", status: "inventoried" },
  },
  {
    id: "veh-3",
    plate: "0962 JR 01",
    make: "Renault",
    model: "Duster",
    year: 2022,
    kind: "suv",
    fuel: "petrol",
    seats: 5,
    beacon: { code: "SR-BX-0031", status: "pending" },
  },
  {
    id: "veh-4",
    plate: "5530 FT 01",
    make: "Suzuki",
    model: "Swift",
    year: 2020,
    kind: "sedan",
    fuel: "petrol",
    seats: 5,
    beacon: { code: "SR-BX-0044", status: "inventoried" },
  },
  {
    id: "veh-5",
    plate: "1874 LM 01",
    make: "Kia",
    model: "Picanto",
    year: 2023,
    kind: "city-car",
    fuel: "petrol",
    seats: 5,
    beacon: { code: "SR-BX-0058", status: "pending" },
  },
  {
    id: "veh-6",
    plate: "3307 GB 01",
    make: "Toyota",
    model: "Corolla",
    year: 2018,
    kind: "sedan",
    fuel: "hybrid",
    seats: 5,
    beacon: null,
  },
]

/**
 * Données de la page Véhicules ; l'affectation de la semaine vient du planning.
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */
export async function getVehiclesData(): Promise<VehiclesData> {
  const index = indexSlots(plannedAssignments, plannedRegularizations)
  const dates = weekDates(startOfWeek(PLANNING_TODAY))

  return {
    vehicles: vehicleRecords.map((vehicle) => ({
      ...vehicle,
      week: dates.map((date) => getDayAssignment(index, vehicle.id, date)),
    })),
  }
}
