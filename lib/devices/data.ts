import type { DevicesData } from "@/lib/devices/types"

/**
 * Données de la page Santé des téléphones.
 * TODO : remplacer par l'appel à l'API Safe Road CI.
 */
export async function getDevicesData(organization: string): Promise<DevicesData> {
  return {
    today: "2026-11-11",
    updatedMinutesAgo: 12,
    summary: {
      tracked: 24,
      withoutFirstData: 2,
      active48h: 22,
      silent48h: 2,
      outdated: 7,
      mandatoryUpdates: 2,
    },
    activity: [
      { date: "2026-10-29", active: 21, silent: 1 },
      { date: "2026-10-30", active: 21, silent: 1 },
      { date: "2026-10-31", active: 19, silent: 3 },
      { date: "2026-11-01", active: 18, silent: 4 },
      { date: "2026-11-02", active: 21, silent: 1 },
      { date: "2026-11-03", active: 21, silent: 1 },
      { date: "2026-11-04", active: 22, silent: 1 },
      { date: "2026-11-05", active: 22, silent: 1 },
      { date: "2026-11-06", active: 23, silent: 1 },
      { date: "2026-11-07", active: 21, silent: 3 },
      { date: "2026-11-08", active: 20, silent: 4 },
      { date: "2026-11-09", active: 23, silent: 1 },
      { date: "2026-11-10", active: 23, silent: 1 },
      { date: "2026-11-11", active: 22, silent: 2 },
    ],
    versions: [
      { version: "3.4.1", count: 17, status: "current" },
      { version: "3.4.0", count: 5, status: "recommended" },
      { version: "3.3.2", count: 2, status: "mandatory" },
    ],
    versionsNote: "Version 3.4.1 publiée le 28 octobre. La 3.3.2 ne sera plus acceptée après le 30 novembre.",
    causes: [
      {
        id: "battery",
        icon: "battery-low-linear",
        title: "Économie de batterie",
        description: "Beaucoup de téléphones d’entrée de gamme ferment les applications en arrière-plan.",
        steps: [
          "Paramètres, puis Batterie : mettre Safe Road CI sur « Aucune restriction ».",
          "Dans les applications récentes, verrouiller Safe Road CI pour qu’elle ne soit pas fermée.",
        ],
      },
      {
        id: "location",
        icon: "map-point-remove-linear",
        title: "Localisation coupée",
        description: "Sans localisation, l’application ne peut pas mesurer la conduite.",
        steps: [
          "Paramètres, puis Localisation : l’activer.",
          "Dans les autorisations de Safe Road CI, choisir « Toujours autoriser ».",
        ],
      },
      {
        id: "network",
        icon: "wi-fi-router-minimalistic-linear",
        title: "Pas de connexion internet",
        description: "Les données attendent le réseau et partent dès que la connexion revient.",
        steps: [
          "Vérifier qu’il reste du crédit internet ou se connecter à un wifi.",
          "Rien d’autre à faire : les trajets enregistrés partiront tout seuls.",
        ],
      },
      {
        id: "version",
        icon: "smartphone-update-linear",
        title: "Version trop ancienne",
        description: "Une version retirée n’envoie plus ses données.",
        steps: ["Ouvrir le Play Store, puis mettre à jour Safe Road CI."],
      },
      {
        id: "reset",
        icon: "restart-linear",
        title: "Téléphone changé ou réinitialisé",
        description: "L’application doit être réinstallée sur le nouveau téléphone.",
        steps: [
          "Installer Safe Road CI depuis le Play Store.",
          "Saisir à nouveau le code d’invitation reçu par SMS.",
        ],
      },
    ],
    messages: {
      silent: `Bonjour à tous. Pour que Safe Road CI fonctionne, vérifiez votre téléphone : localisation activée, application sans restriction de batterie, crédit internet disponible. Merci. ${organization}`,
      update: `Bonjour à tous. Une nouvelle version de Safe Road CI est disponible. Ouvrez le Play Store et mettez l’application à jour avant le 30 novembre, sinon vos trajets ne seront plus comptés. Merci. ${organization}`,
    },
  }
}
