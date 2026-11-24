"use client"

import { DriverAvatar } from "@/components/planning/driver-avatar"
import { driverLabel } from "@/lib/planning/planning"
import type { PlannedDriver } from "@/lib/planning/types"
import { cn } from "@/lib/utils"

export type DriverOption = {
  driver: PlannedDriver
  /** Raison pour laquelle ce conducteur ne peut pas être choisi (« Sur 7315 HG 01 »). */
  unavailable?: string
}

type DriverPickerProps = {
  name: string
  legend: string
  options: DriverOption[]
  value: string | null
  onChange: (driverId: string) => void
}

/** Choix d'un conducteur parmi des tuiles (boutons radio natifs). */
export function DriverPicker({ name, legend, options, value, onChange }: DriverPickerProps) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-[13px] font-semibold">{legend}</legend>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
        {options.map(({ driver, unavailable }) => (
          <label
            key={driver.id}
            data-driver-tone={driver.tone}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-2 transition-colors",
              "hover:bg-muted has-checked:border-(color:--driver) has-checked:bg-(color:--driver-soft)",
              "has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
              "has-disabled:cursor-not-allowed has-disabled:bg-muted/60 has-disabled:hover:bg-muted/60"
            )}
          >
            <input
              type="radio"
              name={name}
              value={driver.id}
              checked={value === driver.id}
              onChange={() => onChange(driver.id)}
              disabled={Boolean(unavailable)}
              className="sr-only"
            />
            <DriverAvatar driver={driver} faded={Boolean(unavailable)} />
            <span className="flex min-w-0 flex-col">
              <span className={cn("text-[13px] font-bold tabular-nums", unavailable && "text-muted-foreground")}>
                {driverLabel(driver)}
              </span>
              {unavailable && <span className="truncate text-[11px] text-muted-foreground">{unavailable}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
