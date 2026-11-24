import type { Assignment, PlannedDriver, Regularization } from "@/lib/planning/types"
import { addDays, startOfWeek, weekDates } from "@/lib/planning/week"
import { formatPhoneSuffix } from "@/lib/phone"
import type { DayAssignment } from "@/lib/vehicles/types"

/** Clé d'une case du planning : un véhicule, un jour. */
export const slotKey = (vehicleId: string, date: string) => `${vehicleId}|${date}`

/** « …63 05 » : seule identification d'un conducteur dans le planning. */
export const driverLabel = (driver: PlannedDriver) => formatPhoneSuffix(driver.phone)

/** « 05 » : pastille du conducteur. */
export const driverCode = (driver: PlannedDriver) => driver.phone.slice(-2)

/** Index des affectations et de la dernière régularisation de chaque case. */
export function indexSlots(assignments: Assignment[], regularizations: Regularization[]) {
  const bySlot = new Map(assignments.map((item) => [slotKey(item.vehicleId, item.date), item]))
  const regularized = new Map<string, Regularization>()
  for (const item of [...regularizations].sort((a, b) => a.at.localeCompare(b.at))) {
    regularized.set(slotKey(item.vehicleId, item.date), item)
  }
  return { bySlot, regularized }
}

/** État d'une case pour la page Véhicules : affecté, régularisé ou libre. */
export function getDayAssignment(
  index: ReturnType<typeof indexSlots>,
  vehicleId: string,
  date: string
): DayAssignment {
  const key = slotKey(vehicleId, date)
  if (!index.bySlot.has(key)) return "none"
  return index.regularized.has(key) ? "regularized" : "assigned"
}

/** Indicateurs de la semaine en cours, à partir de la date du jour. */
export function summarizeWeek({
  today,
  vehicleCount,
  assignments,
  regularizations,
}: {
  today: string
  vehicleCount: number
  assignments: Assignment[]
  regularizations: Regularization[]
}) {
  const dates = weekDates(startOfWeek(today))
  const inWeek = assignments.filter((item) => dates.includes(item.date))
  const index = indexSlots(assignments, regularizations)
  const remainingDays = dates.filter((date) => date >= today).length
  const remaining = inWeek.filter((item) => item.date >= today).length

  return {
    assignments: inWeek.length,
    regularized: inWeek.filter((item) => index.regularized.has(slotKey(item.vehicleId, item.date))).length,
    vehiclesToday: inWeek.filter((item) => item.date === today).length,
    freeSlotsUntilSunday: vehicleCount * remainingDays - remaining,
    drivers: new Set(inWeek.map((item) => item.driverId)).size,
  }
}

/** Jours de la semaine affichée encore planifiables (aujourd'hui et après). */
export function plannableDates(weekStart: string, today: string) {
  const dates = weekDates(weekStart).filter((date) => date >= today)
  // Semaine passée : on propose la fin de la semaine en cours.
  return dates.length > 0 ? dates : weekDates(startOfWeek(today)).filter((date) => date >= today)
}

/** Lundi de la semaine précédente ou suivante. */
export const shiftWeek = (weekStart: string, weeks: number) => addDays(weekStart, weeks * 7)
