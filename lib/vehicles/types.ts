export type VehicleKind = "pickup" | "minibus" | "suv" | "sedan" | "city-car" | "van"

export type FuelType = "diesel" | "petrol" | "hybrid" | "electric"

/** État de la balise : détectée par un téléphone de la flotte, posée sans détection, ou absente. */
export type BeaconStatus = "inventoried" | "pending" | "none"

/** Affectation d'un jour : prévue, régularisée après coup, ou aucune. */
export type DayAssignment = "assigned" | "regularized" | "none"

export type Beacon = {
  /** Numéro inscrit sur l'étiquette, au format SR-BX-0000. */
  code: string
  status: Exclude<BeaconStatus, "none">
}

export type Vehicle = {
  id: string
  /** Immatriculation telle qu'affichée (« 2481 KL 01 »). */
  plate: string
  make: string
  model: string
  year: number
  kind: VehicleKind
  fuel: FuelType
  seats: number
  /** `null` : aucune balise posée. */
  beacon: Beacon | null
  /** Affectation prévue du lundi au dimanche de la semaine en cours (7 valeurs). */
  week: DayAssignment[]
}

export type VehiclesData = {
  vehicles: Vehicle[]
}
