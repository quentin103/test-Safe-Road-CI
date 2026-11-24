import type { DashboardData, PeriodKind } from "@/lib/dashboard/types"

/**
 * Données du tableau de bord pour la dernière période terminée (semaine, mois ou trimestre).
 * TODO : remplacer par l'appel à l'API Safe Road CI (les chiffres portant sur
 * moins de 5 conducteurs doivent arriver déjà masqués, à `null`).
 */
export async function getDashboardData(kind: PeriodKind = "week"): Promise<DashboardData> {
  return {
    period: {
      kind,
      caption: "Semaine 45, du 2 au 8 novembre 2026.",
    },
    score: {
      value: 82,
      max: 100,
      delta: 3,
      headline: "Votre flotte progresse pour la 3e semaine de suite.",
      insights: [
        { tone: "positive", text: "Les freinages brusques baissent : 0,9 pour 100 km." },
        { tone: "negative", text: "Les excès de vitesse remontent légèrement : 0,7 pour 100 km." },
        { tone: "positive", text: "24 conducteurs actifs : une base suffisante pour tous les chiffres." },
      ],
    },
    kpis: [
      { label: "Événements pour 100 km", value: 2.4, fractionDigits: 1, change: { delta: -0.2, fractionDigits: 1 } },
      { label: "Kilomètres parcourus", value: 4860, change: { ratio: 0.12 } },
      { label: "Conducteurs actifs", value: 24, change: { note: "base du calcul" } },
    ],
    actions: [
      {
        icon: "speedometer-max-linear",
        tone: "danger",
        title: "Parler des excès de vitesse en équipe",
        description: "Seule nature d’événement en hausse",
        href: "#evenements-par-nature",
      },
      {
        icon: "smartphone-linear",
        tone: "warning",
        title: "2 téléphones silencieux",
        description: "Envoyer un rappel à toute la flotte",
        href: "/devices",
      },
      {
        icon: "letter-linear",
        tone: "success",
        title: "3 invitations en attente",
        description: "Relancer depuis la page Conducteurs",
        href: "/drivers",
      },
      {
        icon: "car-linear",
        tone: "neutral",
        title: "1 véhicule sans balise",
        description: "Compléter la fiche du véhicule",
        href: "/vehicles",
      },
    ],
    trend: [
      { period: "S40", score: 71, eventsPer100Km: 3.1 },
      { period: "S41", score: 74, eventsPer100Km: 2.9 },
      { period: "S42", score: 72, eventsPer100Km: 3.0 },
      { period: "S43", score: 77, eventsPer100Km: 2.7 },
      { period: "S44", score: 79, eventsPer100Km: 2.6 },
      { period: "S45", score: 82, eventsPer100Km: 2.4 },
    ],
    eventTypes: [
      { key: "harsh-braking", label: "Freinages brusques", icon: "stop-circle-linear", value: 0.9, delta: -0.2 },
      { key: "speeding", label: "Excès de vitesse", icon: "speedometer-max-linear", value: 0.7, delta: 0.1 },
      { key: "harsh-acceleration", label: "Accélérations brusques", icon: "arrow-right-up-linear", value: 0.6, delta: -0.1 },
      { key: "sharp-turns", label: "Virages serrés", icon: "route-linear", value: 0.2, delta: 0 },
    ],
    shockAlerts: [
      { label: "Alerte envoyée", count: 6, tone: "primary" },
      { label: "Non confirmée", count: 9, tone: "moss" },
      { label: "Annulée", count: null, tone: "fern" },
    ],
    fleet: {
      funnel: [
        { label: "Invités", value: 31, tone: "mint" },
        { label: "Application installée", value: 26, tone: "moss" },
        { label: "Première télémétrie", value: 24, tone: "primary" },
      ],
      silentPhones: 2,
      vehiclesWithoutBeacon: 1,
    },
    badges: [
      { tier: "bronze", label: "Bronze", count: 11 },
      { tier: "silver", label: "Argent", count: 7 },
      { tier: "gold", label: "Or", count: null },
      { tier: "platinum", label: "Platine", count: 0 },
    ],
  }
}
