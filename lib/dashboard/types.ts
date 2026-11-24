import type { MaskedCount } from "@/lib/format"

export type PeriodKind = "week" | "month" | "quarter"

/** Dernière période terminée : la période en cours n'est jamais affichée. */
export type ClosedPeriod = {
  kind: PeriodKind
  /** Ex. « Semaine 45, du 2 au 8 novembre 2026. » */
  caption: string
}

export type ScoreInsight = {
  tone: "positive" | "negative"
  text: string
}

export type FleetScore = {
  value: number
  max: number
  /** Variation en points sur la période. */
  delta: number
  headline: string
  insights: ScoreInsight[]
}

export type Kpi = {
  label: string
  value: number
  fractionDigits?: number
  /** Variation absolue (`delta`), relative (`ratio`) ou simple mention (`note`). */
  change?: { delta: number; fractionDigits?: number } | { ratio: number } | { note: string }
}

export type ActionTone = "danger" | "warning" | "success" | "neutral"

export type SuggestedAction = {
  icon: string
  tone: ActionTone
  title: string
  description: string
  href: string
}

export type TrendPoint = {
  /** Libellé court de la période, ex. « S45 ». */
  period: string
  score: number
  eventsPer100Km: number
}

export type EventType = {
  key: string
  label: string
  icon: string
  /** Événements pour 100 km. */
  value: number
  delta: number
}

export type ShockAlertStatus = {
  label: string
  count: MaskedCount
  tone: "primary" | "moss" | "fern"
}

export type FleetFunnelStep = {
  label: string
  value: number
  tone: "mint" | "moss" | "primary"
}

export type FleetOverview = {
  funnel: FleetFunnelStep[]
  silentPhones: number
  vehiclesWithoutBeacon: number
}

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum"

export type FleetBadge = {
  tier: BadgeTier
  label: string
  count: MaskedCount
}

export type DashboardData = {
  period: ClosedPeriod
  score: FleetScore
  kpis: Kpi[]
  actions: SuggestedAction[]
  trend: TrendPoint[]
  eventTypes: EventType[]
  shockAlerts: ShockAlertStatus[]
  fleet: FleetOverview
  badges: FleetBadge[]
}
