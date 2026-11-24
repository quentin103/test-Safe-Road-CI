"use client"

import { useState, type FormEvent, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FuelType, Vehicle, VehicleKind } from "@/lib/vehicles/types"
import {
  fuelLabels,
  normalizeBeaconCode,
  normalizePlate,
  vehicleKindLabels,
} from "@/lib/vehicles/vehicle"
import { cn } from "@/lib/utils"

type AddVehicleDialogProps = {
  open: boolean
  /** Véhicules du parc, pour refuser une plaque ou une balise en double. */
  vehicles: Vehicle[]
  onClose: () => void
  onAdd: (vehicle: Vehicle) => void
}

/** Fenêtre d'ajout d'un véhicule au parc. */
export function AddVehicleDialog({ open, vehicles, onClose, onAdd }: AddVehicleDialogProps) {
  // Nouveau formulaire vierge à chaque ouverture.
  const [session, setSession] = useState(0)
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setSession((value) => value + 1)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100svh-2rem)] gap-3.5 overflow-y-auto rounded-[1.25rem] bg-card p-4.5 sm:max-w-120"
      >
        <DialogHeader>
          <DialogTitle className="text-base leading-snug font-bold">Ajouter un véhicule</DialogTitle>
          <DialogDescription className="text-xs">
            La fiche ne contient que l’équipement du véhicule : ni position, ni trajet.
          </DialogDescription>
        </DialogHeader>
        <AddVehicleForm key={session} vehicles={vehicles} onAdd={onAdd} />
      </DialogContent>
    </Dialog>
  )
}

const fieldOrder = ["plate", "make", "model", "kind", "fuel", "year", "seats", "beacon"] as const

type Errors = Partial<Record<(typeof fieldOrder)[number], string>>

const kindItems = Object.entries(vehicleKindLabels).map(([value, label]) => ({ value, label }))
const fuelItems = Object.entries(fuelLabels).map(([value, label]) => ({ value, label }))

function AddVehicleForm({ vehicles, onAdd }: { vehicles: Vehicle[]; onAdd: (vehicle: Vehicle) => void }) {
  const [kind, setKind] = useState<VehicleKind | null>(null)
  const [fuel, setFuel] = useState<FuelType | null>(null)
  const [errors, setErrors] = useState<Errors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = (name: string) => String(form.get(name) ?? "").trim()
    const nextYear = new Date().getFullYear() + 1

    const plate = normalizePlate(text("plate"))
    const make = text("make")
    const model = text("model")
    const year = Number(text("year"))
    const seats = Number(text("seats"))
    const beaconInput = text("beacon")
    const beacon = beaconInput ? normalizeBeaconCode(beaconInput) : null

    const next: Errors = {}
    if (!plate) next.plate = "Saisissez une immatriculation au format 1234 AB 01."
    else if (vehicles.some((vehicle) => vehicle.plate === plate)) next.plate = "Ce véhicule est déjà dans le parc."
    if (!make) next.make = "Indiquez la marque."
    if (!model) next.model = "Indiquez le modèle."
    if (!Number.isInteger(year) || year < 1980 || year > nextYear) next.year = `Entre 1980 et ${nextYear}.`
    if (!Number.isInteger(seats) || seats < 1 || seats > 60) next.seats = "Entre 1 et 60 places."
    if (!kind) next.kind = "Choisissez une catégorie."
    if (!fuel) next.fuel = "Choisissez un carburant."
    if (beaconInput && !beacon) next.beacon = "Format attendu : SR-BX-0000."
    else if (beacon && vehicles.some((vehicle) => vehicle.beacon?.code === beacon))
      next.beacon = "Cette balise est déjà attribuée à un autre véhicule."

    setErrors(next)
    if (Object.keys(next).length > 0 || !plate || !kind || !fuel) {
      // Place le focus sur le premier champ en erreur, dans l'ordre du formulaire.
      const first = fieldOrder.find((field) => next[field])
      if (first) document.getElementById(`vehicle-${first}`)?.focus()
      return
    }

    // TODO : appeler l'API de création du véhicule.
    onAdd({
      id: `veh-${crypto.randomUUID()}`,
      plate,
      make,
      model,
      year,
      kind,
      fuel,
      seats,
      beacon: beacon ? { code: beacon, status: "pending" } : null,
      week: Array(7).fill("none"),
    })
  }

  const clear = (field: keyof Errors) => () => {
    if (!errors[field]) return
    setErrors((current) => {
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField id="vehicle-plate" label="Immatriculation" error={errors.plate} className="sm:col-span-2">
          <Input
            id="vehicle-plate"
            name="plate"
            placeholder="1234 AB 01"
            autoComplete="off"
            onChange={clear("plate")}
            {...invalidProps("vehicle-plate", errors.plate)}
            className={inputClass}
          />
        </FormField>
        <FormField id="vehicle-make" label="Marque" error={errors.make}>
          <Input
            id="vehicle-make"
            name="make"
            autoComplete="off"
            onChange={clear("make")}
            {...invalidProps("vehicle-make", errors.make)}
            className={inputClass}
          />
        </FormField>
        <FormField id="vehicle-model" label="Modèle" error={errors.model}>
          <Input
            id="vehicle-model"
            name="model"
            autoComplete="off"
            onChange={clear("model")}
            {...invalidProps("vehicle-model", errors.model)}
            className={inputClass}
          />
        </FormField>
        <FormField id="vehicle-kind" label="Catégorie" error={errors.kind}>
          <Select
            items={kindItems}
            value={kind}
            onValueChange={(value) => {
              setKind(value as VehicleKind | null)
              clear("kind")()
            }}
          >
            <SelectTrigger
              id="vehicle-kind"
              {...invalidProps("vehicle-kind", errors.kind)}
              className="h-9! w-full rounded-xl border-transparent bg-muted text-[13px]"
            >
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {kindItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField id="vehicle-fuel" label="Carburant" error={errors.fuel}>
          <Select
            items={fuelItems}
            value={fuel}
            onValueChange={(value) => {
              setFuel(value as FuelType | null)
              clear("fuel")()
            }}
          >
            <SelectTrigger
              id="vehicle-fuel"
              {...invalidProps("vehicle-fuel", errors.fuel)}
              className="h-9! w-full rounded-xl border-transparent bg-muted text-[13px]"
            >
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {fuelItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField id="vehicle-year" label="Année" error={errors.year}>
          <Input
            id="vehicle-year"
            name="year"
            inputMode="numeric"
            autoComplete="off"
            onChange={clear("year")}
            {...invalidProps("vehicle-year", errors.year)}
            className={inputClass}
          />
        </FormField>
        <FormField id="vehicle-seats" label="Places" error={errors.seats}>
          <Input
            id="vehicle-seats"
            name="seats"
            inputMode="numeric"
            autoComplete="off"
            onChange={clear("seats")}
            {...invalidProps("vehicle-seats", errors.seats)}
            className={inputClass}
          />
        </FormField>
        <FormField
          id="vehicle-beacon"
          label="Numéro de balise (facultatif)"
          error={errors.beacon}
          description="Laissez vide si la balise n’est pas encore posée."
          className="sm:col-span-2"
        >
          <Input
            id="vehicle-beacon"
            name="beacon"
            placeholder="SR-BX-0000"
            autoComplete="off"
            onChange={clear("beacon")}
            {...invalidProps("vehicle-beacon", errors.beacon, true)}
            className={cn(inputClass, "font-mono")}
          />
        </FormField>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <DialogClose
          render={
            <Button
              variant="outline"
              className="h-10 rounded-xl bg-card px-4 text-sm font-bold text-primary hover:text-primary"
            />
          }
        >
          Annuler
        </DialogClose>
        <Button type="submit" className="h-10 rounded-xl px-5 text-sm font-bold">
          Ajouter le véhicule
        </Button>
      </div>
    </form>
  )
}

const inputClass = "h-9 rounded-xl border-transparent bg-muted text-[13px] md:text-[13px]"

function invalidProps(id: string, error: string | undefined, hasDescription = false) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : hasDescription ? `${id}-help` : undefined,
  }
}

function FormField({
  id,
  label,
  error,
  description,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  description?: string
  className?: string
  children: ReactNode
}) {
  return (
    <Field data-invalid={error ? true : undefined} className={cn("gap-1.5", className)}>
      <FieldLabel htmlFor={id} className="text-[13px] font-semibold">
        {label}
      </FieldLabel>
      {children}
      {error ? (
        <FieldError id={`${id}-error`} className="text-xs">
          {error}
        </FieldError>
      ) : (
        description && (
          <FieldDescription id={`${id}-help`} className="text-xs">
            {description}
          </FieldDescription>
        )
      )}
    </Field>
  )
}
