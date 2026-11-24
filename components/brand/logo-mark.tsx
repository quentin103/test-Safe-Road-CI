import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

/**
 * Tracé du pictogramme SafeRoad CI : trois voies (pleine, pointillée, courte) et un « + ».
 * Coordonnées du fichier d'origine (carré de 1 024), traits de 36 à bouts ronds.
 */
const GLYPH_PATH =
  "M385 385V639M512 385V421M512 494V530M512 603V639M639 385V512M585 639H693M639 585V693"

/** Pictogramme seul, cadré au plus juste. Hérite de la couleur du texte. */
export function LogoMark({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="367 367 345 345"
      fill="none"
      stroke="currentColor"
      strokeWidth={36}
      strokeLinecap="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d={GLYPH_PATH} />
    </svg>
  )
}

type LogoIconProps = ComponentProps<"svg"> & {
  /**
   * `solid` : carré vert, voies blanches (sur fond clair).
   * `inverse` : carré blanc, voies vertes (sur fond vert).
   */
  variant?: "solid" | "inverse"
}

/** Icône complète de l'application, comme le logo : carré aux coins arrondis et pictogramme. */
export function LogoIcon({ variant = "solid", className, ...props }: LogoIconProps) {
  const solid = variant === "solid"

  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true" className={cn("shrink-0", className)} {...props}>
      <rect width="1024" height="1024" rx="224" className={solid ? "fill-primary" : "fill-card"} />
      <path
        d={GLYPH_PATH}
        fill="none"
        strokeWidth={36}
        strokeLinecap="round"
        className={solid ? "stroke-primary-foreground" : "stroke-primary"}
      />
    </svg>
  )
}
