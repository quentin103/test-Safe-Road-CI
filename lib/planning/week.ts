const LOCALE = "fr-FR"
const DAY_MS = 86_400_000

const toIso = (time: number) => new Date(time).toISOString().slice(0, 10)

/** Ajoute (ou retire) des jours à une date ISO. */
export function addDays(isoDate: string, days: number) {
  return toIso(Date.parse(isoDate) + days * DAY_MS)
}

/** Lundi de la semaine d'une date ISO. */
export function startOfWeek(isoDate: string) {
  const weekday = (new Date(isoDate).getUTCDay() + 6) % 7 // lundi = 0
  return addDays(isoDate, -weekday)
}

/** Les sept dates (lundi → dimanche) d'une semaine. */
export function weekDates(weekStart: string) {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
}

/** Numéro de semaine ISO 8601 (la semaine 1 contient le premier jeudi de l'année). */
export function isoWeekNumber(isoDate: string) {
  const thursday = new Date(addDays(isoDate, 3 - ((new Date(isoDate).getUTCDay() + 6) % 7)))
  const yearStart = Date.UTC(thursday.getUTCFullYear(), 0, 1)
  return Math.ceil(((thursday.getTime() - yearStart) / DAY_MS + 1) / 7)
}

const part = (isoDate: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(LOCALE, { ...options, timeZone: "UTC" }).format(new Date(isoDate))

const dayNumber = (isoDate: string) => {
  const day = new Date(isoDate).getUTCDate()
  return day === 1 ? "1er" : String(day)
}

/** « du 9 au 15 novembre 2026 », « du 30 novembre au 6 décembre 2026 »… */
export function formatWeekRange(weekStart: string) {
  const end = addDays(weekStart, 6)
  const [startMonth, endMonth] = [part(weekStart, { month: "long" }), part(end, { month: "long" })]
  const [startYear, endYear] = [part(weekStart, { year: "numeric" }), part(end, { year: "numeric" })]

  if (startYear !== endYear) {
    return `du ${dayNumber(weekStart)} ${startMonth} ${startYear} au ${dayNumber(end)} ${endMonth} ${endYear}`
  }
  if (startMonth !== endMonth) {
    return `du ${dayNumber(weekStart)} ${startMonth} au ${dayNumber(end)} ${endMonth} ${endYear}`
  }
  return `du ${dayNumber(weekStart)} au ${dayNumber(end)} ${endMonth} ${endYear}`
}

/** En-tête de colonne : « lun. » et « 9 ». */
export function formatDayHeader(isoDate: string) {
  return { weekday: part(isoDate, { weekday: "short" }), day: String(new Date(isoDate).getUTCDate()) }
}
