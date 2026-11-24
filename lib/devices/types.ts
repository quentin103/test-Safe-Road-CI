export type VersionStatus = "current" | "recommended" | "mandatory"

export type AppVersion = {
  version: string
  /** Téléphones suivis sur cette version. */
  count: number
  status: VersionStatus
}

/** Téléphones suivis un jour donné : actifs (données reçues sur 48 h) ou silencieux. */
export type DailyActivity = {
  /** Date ISO (AAAA-MM-JJ). */
  date: string
  active: number
  silent: number
}

export type SilenceCause = {
  id: string
  icon: string
  title: string
  description: string
  /** Ce que le conducteur doit faire sur son téléphone, dans l'ordre. */
  steps: string[]
}

export type DevicesData = {
  /** Date du jour (ISO). */
  today: string
  /** Minutes écoulées depuis la dernière mise à jour des chiffres. */
  updatedMinutesAgo: number
  summary: {
    tracked: number
    /** Téléphones enrôlés qui n'ont encore rien envoyé. */
    withoutFirstData: number
    active48h: number
    silent48h: number
    outdated: number
    mandatoryUpdates: number
  }
  activity: DailyActivity[]
  versions: AppVersion[]
  /** Note sur les versions : date de publication, date de retrait. */
  versionsNote: string
  causes: SilenceCause[]
  messages: { silent: string; update: string }
}
