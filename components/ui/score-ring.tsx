import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type ScoreRingProps = ComponentProps<"div"> & {
  value: number
  max?: number
  /** Diamètre en px. */
  size?: number
  /** Épaisseur de l'anneau en px. */
  thickness?: number
  /** Texte lu par les lecteurs d'écran (par défaut « 82 sur 100 »). */
  label?: string
  trackClassName?: string
  indicatorClassName?: string
}

/** Anneau de score avec contenu centré (valeur, unité…). */
function ScoreRing({
  value,
  max = 100,
  size = 140,
  thickness = 14,
  label,
  trackClassName,
  indicatorClassName,
  className,
  children,
  style,
  ...props
}: ScoreRingProps) {
  const center = size / 2
  const radius = center - thickness
  const circumference = 2 * Math.PI * radius
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0

  return (
    <div
      role="img"
      aria-label={label ?? `${value} sur ${max}`}
      data-slot="score-ring"
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          className={cn("text-track", trackClassName)}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${ratio * circumference} ${circumference}`}
          className={cn("text-primary", indicatorClassName)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export { ScoreRing }
export type { ScoreRingProps }
