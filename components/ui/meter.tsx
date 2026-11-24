import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const meterVariants = cva("relative w-full overflow-hidden rounded-full bg-track", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

const meterIndicatorVariants = cva("h-full rounded-full", {
  variants: {
    tone: {
      primary: "bg-primary",
      moss: "bg-moss",
      mint: "bg-mint",
      sage: "bg-sage",
      fern: "bg-fern",
      inverse: "bg-primary-foreground",
      success: "bg-moss",
      danger: "bg-danger-muted",
      warning: "bg-ochre",
      neutral: "bg-stone",
    },
  },
  defaultVariants: {
    tone: "primary",
  },
})

type MeterProps = Omit<ComponentProps<"div">, "children"> &
  VariantProps<typeof meterVariants> &
  VariantProps<typeof meterIndicatorVariants> & {
    value: number
    max?: number
    /** Libellé lu par les lecteurs d'écran. */
    label: string
  }

/** Jauge horizontale (valeur mesurée, pas une progression de tâche). */
function Meter({ value, max = 100, label, size, tone, className, ...props }: MeterProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      data-slot="meter"
      className={cn(meterVariants({ size }), className)}
      {...props}
    >
      <div
        data-slot="meter-indicator"
        className={meterIndicatorVariants({ tone })}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export { Meter, meterVariants, meterIndicatorVariants }
export type { MeterProps }
