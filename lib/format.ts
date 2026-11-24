const LOCALE = "fr-FR"

/** Remplace le trait d'union par le signe moins typographique (−). */
function typographicMinus(text: string) {
  return text.replace(/-/g, "\u2212")
}

/**
 * Valeur agrégée renvoyée par l'API : `null` quand elle porte sur moins de
 * 5 conducteurs (masquée pour préserver l'anonymat).
 */
export type MaskedCount = number | null

export const MASKED_COUNT_LABEL = "moins de\u00a05"

/** 4860 → « 4 860 », 2.4 → « 2,4 » (avec `fractionDigits = 1`). */
export function formatNumber(value: number, fractionDigits = 0) {
  return typographicMinus(
    new Intl.NumberFormat(LOCALE, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value)
  )
}

/** -0.2 → « −0,2 », 0.1 → « +0,1 », 0 → « 0 ». */
export function formatDelta(value: number, fractionDigits = 0) {
  return typographicMinus(
    new Intl.NumberFormat(LOCALE, {
      minimumFractionDigits: value === 0 ? 0 : fractionDigits,
      maximumFractionDigits: fractionDigits,
      signDisplay: "exceptZero",
    }).format(value)
  )
}

/** 0.12 → « +12 % ». */
export function formatPercentDelta(ratio: number, fractionDigits = 0) {
  return typographicMinus(
    new Intl.NumberFormat(LOCALE, {
      style: "percent",
      maximumFractionDigits: fractionDigits,
      signDisplay: "exceptZero",
    }).format(ratio)
  )
}

export function formatCount(value: MaskedCount) {
  return value === null ? MASKED_COUNT_LABEL : formatNumber(value)
}

export type TrendTone = "success" | "danger" | "neutral"

/**
 * Couleur d'une variation selon le sens souhaité : pour des événements de
 * conduite, une baisse est bonne (`goodWhen = "down"`).
 */
export function trendTone(delta: number, goodWhen: "up" | "down" = "up"): TrendTone {
  if (delta === 0) return "neutral"
  return delta > 0 === (goodWhen === "up") ? "success" : "danger"
}

/** 0.84 → « 84 % ». */
export function formatPercent(ratio: number, fractionDigits = 0) {
  return new Intl.NumberFormat(LOCALE, {
    style: "percent",
    maximumFractionDigits: fractionDigits,
  }).format(ratio)
}

/** « 2026-10-28 » → « 28 oct. » (ou « 28 oct. 2026 » avec `withYear`). */
export function formatDate(isoDate: string, { withYear = false } = {}) {
  return new Intl.DateTimeFormat(LOCALE, {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(isoDate))
}

/**
 * Écart en jours entre deux dates : « il y a 6 jours », « hier »…
 * La date de référence vient des données (pas de l'horloge) pour un rendu stable.
 */
export function formatRelativeDays(isoDate: string, referenceIsoDate: string) {
  const days = Math.round((Date.parse(referenceIsoDate) - Date.parse(isoDate)) / 86_400_000)
  if (days === 0) return "aujourd’hui"
  return new Intl.RelativeTimeFormat(LOCALE, { numeric: "always" }).format(-days, "day")
}

/** « 2026-11-11 » → « mer. 11 nov. ». */
export function formatShortDay(isoDate: string) {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(isoDate))
}

/** « 2026-11-11 » → « Mercredi 11 novembre ». */
export function formatLongDay(isoDate: string) {
  const text = new Intl.DateTimeFormat(LOCALE, {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(isoDate))
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** Heure UTC d'un horodatage ISO : « 08:40 ». */
export function formatTime(isoDateTime: string) {
  return new Intl.DateTimeFormat(LOCALE, { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(
    new Date(isoDateTime)
  )
}

/** « aujourd’hui à 08:40 », « hier à 17:15 » ou « 6 nov. à 09:05 ». */
export function formatRelativeDateTime(isoDateTime: string, referenceIsoDate: string) {
  const day = isoDateTime.slice(0, 10)
  const days = Math.round((Date.parse(referenceIsoDate) - Date.parse(day)) / 86_400_000)
  const label = days === 0 ? "aujourd’hui" : days === 1 ? "hier" : formatDate(day)
  return `${label} à ${formatTime(isoDateTime)}`
}
