import type { DayAssignment } from "@/lib/vehicles/types"
import { countAssignedDays, dayAssignmentLabels, weekDays } from "@/lib/vehicles/vehicle"
import { cn } from "@/lib/utils"

const dayStyles: Record<DayAssignment, string> = {
  assigned: "bg-primary text-primary-foreground",
  regularized: "bg-sand text-ochre",
  none: "bg-track text-stone",
}

/** Les sept jours de la semaine colorés selon l'affectation, puis le total. */
export function WeekAssignment({ week, className }: { week: DayAssignment[]; className?: string }) {
  const days = countAssignedDays(week)

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <ol aria-label="Affectation du lundi au dimanche" className="flex gap-1">
        {weekDays.map((day, index) => {
          const state = week[index] ?? "none"
          return (
            <li
              key={day.name}
              className={cn(
                "flex size-5 items-center justify-center rounded-[6px] text-[10px] leading-none font-bold",
                dayStyles[state]
              )}
            >
              <span aria-hidden="true">{day.short}</span>
              <span className="sr-only">
                {day.name} : {dayAssignmentLabels[state].toLowerCase()}
              </span>
            </li>
          )
        })}
      </ol>
      <span className="text-xs leading-tight text-soft-foreground">
        {days === 0 ? "Non affecté cette semaine" : `${days} jour${days > 1 ? "s" : ""} sur 7`}
      </span>
    </div>
  )
}

/** Légende des couleurs d'affectation. */
export function WeekAssignmentLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-soft-foreground", className)}>
      {(Object.keys(dayStyles) as DayAssignment[]).map((state) => (
        <li key={state} className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-3 rounded-[4px]", dayStyles[state])} />
          {dayAssignmentLabels[state]}
        </li>
      ))}
    </ul>
  )
}
