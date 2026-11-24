"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"
import { animate, stagger } from "motion/react"

/**
 * Blocs animés à l'arrivée sur une page, dans l'ordre de lecture : l'en-tête, chaque carte
 * et indicateur, et les autres blocs de <main> qui ne contiennent pas de carte.
 */
const TARGETS = [
  "header",
  "[data-slot=stat-card]",
  "[data-slot=card]",
  "main > :not(:has([data-slot=card], [data-slot=stat-card]))",
].join(", ")

const ANIMATED_STYLES = ["opacity", "transform", "filter"] as const
const DURATION = 0.4
const STAGGER = 0.035

/**
 * Dernière page affichée. `null` au chargement complet : le serveur a déjà peint la page,
 * on ne l'anime pas (et on ne touche pas au DOM avant l'hydratation).
 */
let lastPathname: string | null = null

/**
 * Entrée de page en cascade : fondu, légère montée et flou qui se dissipe.
 * Rendu par `app/(app)/template.tsx`, donc remonté à chaque navigation ; on n'anime que si
 * l'adresse a changé. Le conteneur est en `display: contents` pour ne pas casser la grille.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  // Avant la première peinture : les blocs partent cachés, sans clignotement.
  useLayoutEffect(() => {
    const pathname = window.location.pathname
    const previous = lastPathname
    lastPathname = pathname
    if (previous === null || previous === pathname || !scope.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const targets = [...scope.current.querySelectorAll<HTMLElement>(TARGETS)]
    for (const element of targets) element.style.opacity = "0"

    // Une fois terminée, on rend la main au CSS (pas de transform ni de filtre résiduel).
    const clear = () => {
      for (const element of targets) {
        for (const property of ANIMATED_STYLES) element.style.removeProperty(property)
      }
    }
    // `animate` global (et non `useAnimate`) : l'animation n'est pas interrompue au démontage,
    // y compris par le double montage de StrictMode en développement.
    animate(
      targets,
      { opacity: [0, 1], y: [12, 0], filter: ["blur(6px)", "blur(0px)"] },
      { duration: DURATION, ease: [0.22, 1, 0.36, 1], delay: stagger(STAGGER) }
    ).then(clear, clear)
    // Filet de sécurité : quoi qu'il arrive, le contenu redevient visible.
    window.setTimeout(clear, (DURATION + STAGGER * targets.length) * 1000 + 300)
  }, [])

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  )
}
