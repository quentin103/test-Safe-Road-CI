"use client"

import type { ReactNode } from "react"

import { DriverAvatar } from "@/components/planning/driver-avatar"
import { AssignedSlot, FreeSlot, PastFreeSlot } from "@/components/planning/planning-slot"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BeaconBadge } from "@/components/vehicles/beacon-status"
import { LicensePlate } from "@/components/vehicles/license-plate"
import { VehicleIcon } from "@/components/vehicles/vehicle-identity"
import { formatLongDay } from "@/lib/format"
import { driverLabel, indexSlots, slotKey } from "@/lib/planning/planning"
import type { Assignment, PlannedDriver, PlanningVehicle } from "@/lib/planning/types"
import { formatDayHeader, weekDates } from "@/lib/planning/week"
import { vehicleKindLabels } from "@/lib/vehicles/vehicle"
import { cn } from "@/lib/utils"

export type AssignPreset = { vehicleId?: string; date: string; driverId?: string }

type PlanningGridProps = {
  weekStart: string
  today: string
  vehicles: PlanningVehicle[]
  drivers: PlannedDriver[]
  index: ReturnType<typeof indexSlots>
  onOpenSlot: (vehicleId: string, date: string) => void
  onAssign: (preset: AssignPreset) => void
}

/** Planning par véhicule : une ligne par véhicule, une case par jour. */
export function PlanningByVehicle({ weekStart, today, vehicles, drivers, index, onOpenSlot, onAssign }: PlanningGridProps) {
  const dates = weekDates(weekStart)
  const driversById = new Map(drivers.map((driver) => [driver.id, driver]))

  return (
    <PlanningTable
      dates={dates}
      today={today}
      rowHeader="Véhicule"
    >
      {vehicles.map((vehicle) => {
        const slots = dates.map((date) => index.bySlot.get(slotKey(vehicle.id, date)))
        return (
          <PlanningRow
            key={vehicle.id}
            header={<VehicleRowHeader vehicle={vehicle} />}
            days={slots.filter(Boolean).length}
          >
            {dates.map((date, day) => {
              const assignment = slots[day]
              const driver = assignment && driversById.get(assignment.driverId)
              const when = formatLongDay(date).toLowerCase()
              if (assignment && driver) {
                const regularized = index.regularized.has(slotKey(vehicle.id, date))
                return (
                  <AssignedSlot
                    key={date}
                    driver={driver}
                    label={driverLabel(driver)}
                    ariaLabel={`${vehicle.plate}, ${when} : ${driverLabel(driver)}${regularized ? ", changé après coup" : ""}. Modifier`}
                    past={date < today}
                    regularized={regularized}
                    onOpen={() => onOpenSlot(vehicle.id, date)}
                  />
                )
              }
              return date < today ? (
                <PastFreeSlot key={date} />
              ) : (
                <FreeSlot
                  key={date}
                  ariaLabel={`Ajouter un conducteur à ${vehicle.plate} le ${when}`}
                  onAssign={() => onAssign({ vehicleId: vehicle.id, date })}
                />
              )
            })}
          </PlanningRow>
        )
      })}
    </PlanningTable>
  )
}

/** Planning par conducteur : une ligne par conducteur, le véhicule confié chaque jour. */
export function PlanningByDriver({ weekStart, today, vehicles, drivers, index, onOpenSlot, onAssign }: PlanningGridProps) {
  const dates = weekDates(weekStart)
  const vehiclesById = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle]))
  const byDriverDay = new Map<string, Assignment>()
  for (const assignment of index.bySlot.values()) {
    if (vehiclesById.has(assignment.vehicleId)) byDriverDay.set(`${assignment.driverId}|${assignment.date}`, assignment)
  }

  return (
    <PlanningTable
      dates={dates}
      today={today}
      rowHeader="Conducteur"
    >
      {drivers.map((driver) => {
        const slots = dates.map((date) => byDriverDay.get(`${driver.id}|${date}`))
        return (
          <PlanningRow
            key={driver.id}
            header={
              <div className="flex items-center gap-2">
                <DriverAvatar driver={driver} className="size-7 text-[11px]" />
                <span className="text-[13px] font-bold tabular-nums">{driverLabel(driver)}</span>
              </div>
            }
            days={slots.filter(Boolean).length}
          >
            {dates.map((date, day) => {
              const assignment = slots[day]
              const vehicle = assignment && vehiclesById.get(assignment.vehicleId)
              const when = formatLongDay(date).toLowerCase()
              if (assignment && vehicle) {
                const regularized = index.regularized.has(slotKey(vehicle.id, date))
                return (
                  <AssignedSlot
                    key={date}
                    driver={driver}
                    label={vehicle.plate}
                    ariaLabel={`${driverLabel(driver)}, ${when} : ${vehicle.plate}${regularized ? ", changé après coup" : ""}. Modifier`}
                    past={date < today}
                    regularized={regularized}
                    showAvatar={false}
                    onOpen={() => onOpenSlot(vehicle.id, date)}
                  />
                )
              }
              return date < today ? (
                <PastFreeSlot key={date} />
              ) : (
                <FreeSlot
                  key={date}
                  ariaLabel={`Donner un véhicule à ${driverLabel(driver)} le ${when}`}
                  onAssign={() => onAssign({ driverId: driver.id, date })}
                />
              )
            })}
          </PlanningRow>
        )
      })}
    </PlanningTable>
  )
}

function PlanningTable({
  dates,
  today,
  rowHeader,
  children,
}: {
  dates: string[]
  today: string
  rowHeader: string
  children: ReactNode
}) {
  return (
    <Table className="min-w-[54rem] table-fixed border-separate border-spacing-0">
      <colgroup>
        <col className="w-34 sm:w-44" />
        {dates.map((date) => (
          <col key={date} />
        ))}
        <col className="w-12" />
      </colgroup>
      <TableHeader className="[&_tr]:border-0">
        <TableRow className="hover:bg-transparent">
          <TableHead className={cn(stickyCell, "h-auto px-0 pb-2 align-bottom")}>{rowHeader}</TableHead>
          {dates.map((date) => (
            <DayHeader key={date} date={date} today={today} />
          ))}
          <TableHead className="h-auto px-0 pb-2 text-right align-bottom">Jours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  )
}

const stickyCell = "sticky left-0 z-10 bg-card"

function DayHeader({ date, today }: { date: string; today: string }) {
  const { weekday, day } = formatDayHeader(date)
  const isToday = date === today

  return (
    <th scope="col" className="p-[3px] pb-2 align-bottom">
      <span
        className={cn(
          "flex flex-col items-center rounded-xl py-1 leading-tight",
          isToday ? "bg-foreground text-primary-foreground" : date < today ? "text-muted-foreground" : "text-foreground"
        )}
      >
        <span className="sr-only">
          {formatLongDay(date)}
          {isToday ? ", aujourd’hui" : ""}
        </span>
        <span aria-hidden="true" className="text-[11px] font-semibold uppercase">
          {weekday}
        </span>
        <span aria-hidden="true" className="text-base font-bold tabular-nums">
          {day}
        </span>
        {isToday && (
          <span aria-hidden="true" className="text-[10px] font-semibold text-mint">
            Aujourd’hui
          </span>
        )}
      </span>
    </th>
  )
}

function PlanningRow({ header, days, children }: { header: ReactNode; days: number; children: ReactNode[] }) {
  return (
    <TableRow className="border-0 hover:bg-transparent">
      <th scope="row" className={cn(stickyCell, "py-[3px] pr-2 text-left font-normal")}>
        {header}
      </th>
      {children.map((child, index) => (
        <td key={index} className="p-[3px]">
          {child}
        </td>
      ))}
      <td className="py-[3px] text-right text-[13px] font-bold whitespace-nowrap tabular-nums">
        {days}
        <span aria-hidden="true">&nbsp;j</span>
        <span className="sr-only"> jour{days > 1 ? "s" : ""}</span>
      </td>
    </TableRow>
  )
}

function VehicleRowHeader({ vehicle }: { vehicle: PlanningVehicle }) {
  return (
    <div className="flex items-center gap-2.5">
      <VehicleIcon kind={vehicle.kind} className="hidden size-9 sm:flex [&_svg]:size-4.5" />
      <div className="flex min-w-0 flex-col items-start gap-0.5">
        <LicensePlate plate={vehicle.plate} className="h-5.5 text-xs" />
        {!vehicle.hasBeacon && <BeaconBadge status="none" className="h-4.5 px-1.5 text-[10px] [&>svg]:size-3!" />}
        <span className="truncate text-[11px] leading-tight text-soft-foreground">
          {vehicle.make} {vehicle.model} · {vehicleKindLabels[vehicle.kind]}
        </span>
      </div>
    </div>
  )
}
