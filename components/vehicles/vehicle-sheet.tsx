"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { CardLink } from "@/components/ui/card-link"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { BeaconStatusCell } from "@/components/vehicles/beacon-status"
import { LicensePlate } from "@/components/vehicles/license-plate"
import { VehicleIcon } from "@/components/vehicles/vehicle-identity"
import { WeekAssignment, WeekAssignmentLegend } from "@/components/vehicles/week-assignment"
import type { Vehicle } from "@/lib/vehicles/types"
import {
  fuelLabels,
  getBeaconStatus,
  normalizeBeaconCode,
  vehicleKindLabels,
} from "@/lib/vehicles/vehicle"

const beaconHelp = {
  inventoried: "Reconnue par un téléphone de la flotte : il n’y a rien d’autre à faire.",
  pending: "Posée mais pas encore reconnue. Elle passe en « Inventoriée » dès qu’un téléphone de la flotte la détecte.",
  none: "Aucune balise posée. Une fois fixée dans le véhicule, saisissez le numéro inscrit sur son étiquette.",
} as const

type VehicleSheetProps = {
  /** Véhicule dont la fiche est ouverte ; `null` ferme le panneau. */
  vehicle: Vehicle | null
  /** Numéros de balise déjà attribués, pour refuser les doublons. */
  usedBeaconCodes: string[]
  onClose: () => void
  onBeaconSave: (vehicle: Vehicle, code: string) => void
}

/** Fiche d'un véhicule, en panneau latéral : caractéristiques, balise, affectation. */
export function VehicleSheet({ vehicle, usedBeaconCodes, onClose, onBeaconSave }: VehicleSheetProps) {
  // Garde le dernier véhicule affiché pendant l'animation de fermeture.
  const [shown, setShown] = useState(vehicle)
  if (vehicle && vehicle !== shown) setShown(vehicle)

  return (
    <Sheet
      open={vehicle !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <SheetContent className="gap-0 bg-card data-[side=right]:w-full data-[side=right]:sm:max-w-sm">
        {shown && (
          <>
            <SheetHeader className="flex-row items-center gap-3 border-b border-track p-4 pr-12">
              <VehicleIcon kind={shown.kind} />
              <div className="flex min-w-0 flex-col gap-1">
                <SheetTitle className="text-base leading-none font-bold">
                  <span className="sr-only">Fiche du véhicule </span>
                  <LicensePlate plate={shown.plate} />
                </SheetTitle>
                <SheetDescription className="text-xs text-soft-foreground">
                  {shown.make} {shown.model} · {shown.year}
                </SheetDescription>
              </div>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              <section aria-labelledby="vehicle-specs-title" className="flex flex-col gap-2">
                <h3 id="vehicle-specs-title" className="text-sm font-bold">
                  Caractéristiques
                </h3>
                <dl className="grid grid-cols-2 gap-2">
                  <Spec label="Catégorie" value={vehicleKindLabels[shown.kind]} />
                  <Spec label="Carburant" value={fuelLabels[shown.fuel]} />
                  <Spec label="Places" value={String(shown.seats)} />
                  <Spec label="Année" value={String(shown.year)} />
                </dl>
              </section>

              <section aria-labelledby="vehicle-beacon-title" className="flex flex-col gap-2">
                <h3 id="vehicle-beacon-title" className="text-sm font-bold">
                  Balise
                </h3>
                <div className="flex flex-col gap-2.5 rounded-xl border border-track p-3">
                  <BeaconStatusCell vehicle={shown} />
                  <p className="text-xs leading-snug text-muted-foreground">
                    {beaconHelp[getBeaconStatus(shown)]}
                  </p>
                  {!shown.beacon && (
                    <BeaconForm
                      key={shown.id}
                      usedCodes={usedBeaconCodes}
                      onSave={(code) => onBeaconSave(shown, code)}
                    />
                  )}
                </div>
              </section>

              <section aria-labelledby="vehicle-week-title" className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 id="vehicle-week-title" className="text-sm font-bold">
                    Affectation cette semaine
                  </h3>
                  <CardLink href="/planning">Planning</CardLink>
                </div>
                <WeekAssignment week={shown.week} />
                <WeekAssignmentLegend />
              </section>

              <p className="mt-auto flex items-start gap-2 rounded-xl bg-muted p-3 text-xs leading-snug text-soft-foreground">
                <Icon icon="shield-check-linear" className="size-4 shrink-0 text-primary" />
                La fiche ne montre ni la position ni les trajets du véhicule.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl bg-muted px-3 py-2">
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="text-[13px] font-bold">{value}</dd>
    </div>
  )
}

function BeaconForm({ usedCodes, onSave }: { usedCodes: string[]; onSave: (code: string) => void }) {
  const [value, setValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const code = normalizeBeaconCode(value)
    if (!code) return setError("Saisissez un numéro au format SR-BX-0000.")
    if (usedCodes.includes(code)) return setError("Cette balise est déjà attribuée à un autre véhicule.")
    onSave(code)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
      <Field data-invalid={error ? true : undefined} className="gap-1.5">
        <FieldLabel htmlFor="beacon-code" className="text-[13px] font-semibold">
          Numéro de la balise
        </FieldLabel>
        <div className="flex gap-2">
          <Input
            id="beacon-code"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              setError(null)
            }}
            placeholder="SR-BX-0000"
            autoComplete="off"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "beacon-code-error" : "beacon-code-help"}
            className="h-9 rounded-xl border-transparent bg-muted font-mono text-[13px] md:text-[13px]"
          />
          <Button type="submit" className="h-9 rounded-xl px-3.5 text-[13px] font-bold">
            Enregistrer
          </Button>
        </div>
        {error ? (
          <FieldError id="beacon-code-error" className="text-xs">
            {error}
          </FieldError>
        ) : (
          <FieldDescription id="beacon-code-help" className="text-xs">
            Le numéro est inscrit sur l’étiquette de la balise.
          </FieldDescription>
        )}
      </Field>
    </form>
  )
}
