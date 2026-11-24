"use client"

import {
  addCollection,
  Icon as IconifyIcon,
  type IconProps as IconifyIconProps,
} from "@iconify/react"

import solarIcons from "@/lib/icons/solar.json"
import { cn } from "@/lib/utils"

/** Jeu d'icônes utilisé quand aucun préfixe n'est précisé. */
export const DEFAULT_ICON_SET = "solar"

/**
 * Icônes Solar embarquées dans l'app (générées par `npm run icons`) : elles s'affichent
 * sans appel à api.iconify.design, donc aussi hors ligne ou depuis un autre appareil du réseau.
 * Une icône absente du fichier est encore récupérée en ligne, et le script la signale.
 */
addCollection(solarIcons)

type IconProps = IconifyIconProps & {
  /** Raccourci pour `width` + `height` (ex. 20, "1.5rem"). */
  size?: number | string
}

/**
 * Ajoute le préfixe par défaut si le nom n'en a pas :
 * "home-2-bold" → "solar:home-2-bold", "mdi:home" reste tel quel.
 */
function resolveIcon(icon: IconifyIconProps["icon"]) {
  if (typeof icon !== "string" || icon.includes(":")) return icon
  return `${DEFAULT_ICON_SET}:${icon}`
}

/**
 * Icône globale du back-office (Iconify, jeu Solar par défaut).
 *
 * @example
 * <Icon icon="home-2-bold" />            // solar:home-2-bold
 * <Icon icon="user-linear" size={20} />  // taille explicite
 * <Icon icon="mdi:home" />               // autre jeu Iconify
 */
function Icon({ icon, size, width, height, className, ...props }: IconProps) {
  return (
    <IconifyIcon
      data-slot="icon"
      icon={resolveIcon(icon)}
      width={width ?? size}
      height={height ?? size}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
}

export { Icon }
export type { IconProps }
