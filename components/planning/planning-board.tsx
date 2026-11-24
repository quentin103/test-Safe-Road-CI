"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import { PlanningCard, type PlanningView } from "@/components/planning/planning-card"
import type { AssignPreset } from "@/components/planning/planning-grid"
import { PlanningStats } from "@/components/planning/planning-stats"
import { RegularizationsCard } from "@/components/planning/regularizations-card"
import { SlotDialog, type SlotChange, type SlotRequest } from "@/components/planning/slot-dialog"
import { formatLongDay } from "@/lib/format"
import {
  driverLabel,
  indexSlots,
  plannableDates,
  shiftWeek,
  slotKey,
  summarizeWeek,
} from "@/lib/planning/planning"
import type { PlanningData } from "@/lib/planning/types"
import { startOfWeek } from "@/lib/planning/week"

type PlanningBoardProps = PlanningData & {
  /** Auteur des régularisations faites depuis cette page. */
  userName: string
}

/** Planning complet : indicateurs, grille, fenêtres d'affectation et régularisations. */
export function PlanningBoard({ today, vehicles, drivers, userName, ...initial }: PlanningBoardProps) {
  const [assignments, setAssignments] = useState(initial.assignments)
  const [regularizations, setRegularizations] = useState(initial.regularizations)
  const [weekStart, setWeekStart] = useState(() => startOfWeek(today))
  const [view, setView] = useState<PlanningView>("vehicle")
  const [request, setRequest] = useState<SlotRequest | null>(null)

  const index = useMemo(() => indexSlots(assignments, regularizations), [assignments, regularizations])
  const summary = useMemo(
    () => summarizeWeek({ today, vehicleCount: vehicles.length, assignments, regularizations }),
    [today, vehicles.length, assignments, regularizations]
  )

  const plateOf = (vehicleId: string) => vehicles.find((item) => item.id === vehicleId)?.plate ?? ""
  const labelOf = (driverId: string) => {
    const driver = drivers.find((item) => item.id === driverId)
    return driver ? driverLabel(driver) : ""
  }

  function openSlot(vehicleId: string, date: string) {
    setRequest({ vehicleId, date })
  }

  function save({ vehicleId, date, driverId, reason }: SlotChange) {
    const key = slotKey(vehicleId, date)
    const current = index.bySlot.get(key)
    const when = formatLongDay(date).toLowerCase()
    setRequest(null)

    if (current && reason !== undefined) {
      // Jour commencé ou passé : on garde la trace du conducteur prévu.
      // TODO : appeler l'API de régularisation.
      const time = new Date().toISOString().slice(11, 16)
      setAssignments((list) => list.map((item) => (slotKey(item.vehicleId, item.date) === key ? { ...item, driverId } : item)))
      setRegularizations((list) => [
        {
          id: `reg-${crypto.randomUUID()}`,
          vehicleId,
          date,
          fromDriverId: current.driverId,
          toDriverId: driverId,
          reason,
          by: userName,
          at: `${today}T${time}:00Z`,
        },
        ...list,
      ])
      toast.success(`Changement enregistré : ${labelOf(driverId)} conduit ${plateOf(vehicleId)} ${when}.`)
      return
    }

    // TODO : appeler l'API d'affectation.
    setAssignments((list) => [...list.filter((item) => slotKey(item.vehicleId, item.date) !== key), { vehicleId, date, driverId }])
    toast.success(`${labelOf(driverId)} conduit ${plateOf(vehicleId)} ${when}.`)
  }

  function remove(vehicleId: string, date: string) {
    // TODO : appeler l'API de retrait.
    setAssignments((list) => list.filter((item) => slotKey(item.vehicleId, item.date) !== slotKey(vehicleId, date)))
    setRequest(null)
    toast.success(`${plateOf(vehicleId)} n’a plus de conducteur ${formatLongDay(date).toLowerCase()}.`)
  }

  function assignFromGrid(preset: AssignPreset) {
    setRequest(preset)
  }

  function changeWeek(direction: -1 | 0 | 1) {
    setWeekStart((current) => (direction === 0 ? startOfWeek(today) : shiftWeek(current, direction)))
  }

  const dialogProps = { today, vehicles, drivers, index }

  return (
    <>
      <PlanningStats summary={summary} vehicleCount={vehicles.length} today={today} />

      <PlanningCard
        weekStart={weekStart}
        view={view}
        onViewChange={setView}
        onWeekChange={changeWeek}
        onOpenSlot={openSlot}
        onAssign={assignFromGrid}
        onCreate={() => setRequest({})}
        {...dialogProps}
      />

      <RegularizationsCard regularizations={regularizations} vehicles={vehicles} drivers={drivers} today={today} />

      <SlotDialog
        request={request}
        dates={plannableDates(weekStart, today)}
        onSave={save}
        onRemove={remove}
        onClose={() => setRequest(null)}
        {...dialogProps}
      />
    </>
  )
}
