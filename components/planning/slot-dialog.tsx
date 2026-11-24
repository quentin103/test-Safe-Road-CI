"use client"

import { useState, type FormEvent } from "react"

import { DriverChip } from "@/components/planning/driver-avatar"
import { DriverPicker, type DriverOption } from "@/components/planning/driver-picker"
import { NoBeaconNote, SlotSummary } from "@/components/planning/slot-summary"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatRelativeDateTime, formatShortDay } from "@/lib/format"
import { indexSlots, slotKey } from "@/lib/planning/planning"
import type { PlannedDriver, PlanningVehicle } from "@/lib/planning/types"

const reasonSuggestions = ["Conducteur en congé", "Échange de véhicule", "Véhicule en panne"]

/** Case à ouvrir ; véhicule et jour absents = « Ajouter au planning » (on les choisit dans la fenêtre). */
export type SlotRequest = { vehicleId?: string; date?: string; driverId?: string }

export type SlotChange = { vehicleId: string; date: string; driverId: string; reason?: string }

type SlotDialogProps = {
  request: SlotRequest | null
  today: string
  /** Jours proposés quand on ajoute sans partir d'une case (aujourd'hui et après). */
  dates: string[]
  vehicles: PlanningVehicle[]
  drivers: PlannedDriver[]
  index: ReturnType<typeof indexSlots>
  onSave: (change: SlotChange) => void
  onRemove: (vehicleId: string, date: string) => void
  onClose: () => void
}

/** Une seule fenêtre pour tout le planning : « Qui conduit ce véhicule ce jour-là ? » */
export function SlotDialog({ request, onClose, ...props }: SlotDialogProps) {
  // Garde la dernière demande pendant l'animation de fermeture ; formulaire neuf à chaque ouverture.
  const [shown, setShown] = useState(request)
  const [session, setSession] = useState(0)
  if (request && request !== shown) {
    setShown(request)
    setSession((value) => value + 1)
  }

  const vehicle = shown?.vehicleId ? props.vehicles.find((item) => item.id === shown.vehicleId) : undefined
  const fromSlot = Boolean(vehicle && shown?.date)

  return (
    <Dialog
      open={request !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100svh-2rem)] gap-3.5 overflow-y-auto rounded-[1.25rem] bg-card p-4.5 sm:max-w-120"
      >
        <DialogHeader>
          <DialogTitle className="text-base leading-snug font-bold">
            {fromSlot && vehicle ? `Qui conduit ${vehicle.plate} ?` : "Ajouter au planning"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {fromSlot ? "Choisissez qui conduit ce jour-là." : "Choisissez un véhicule, un jour et le conducteur."}
          </DialogDescription>
        </DialogHeader>
        {shown && <SlotForm key={session} request={shown} {...props} />}
      </DialogContent>
    </Dialog>
  )
}

function SlotForm({
  request,
  today,
  dates,
  vehicles,
  drivers,
  index,
  onSave,
  onRemove,
}: Omit<SlotDialogProps, "request" | "onClose"> & { request: SlotRequest }) {
  const fromSlot = Boolean(request.vehicleId && request.date)
  const [vehicleId, setVehicleId] = useState<string | null>(request.vehicleId ?? null)
  const [date, setDate] = useState<string>(request.date ?? dates[0] ?? today)

  const key = vehicleId ? slotKey(vehicleId, date) : null
  const current = key ? index.bySlot.get(key) : undefined
  const previous = key ? index.regularized.get(key) : undefined
  const currentDriver = drivers.find((driver) => driver.id === current?.driverId)
  const previousFrom = previous && drivers.find((driver) => driver.id === previous.fromDriverId)

  const [driverId, setDriverId] = useState<string | null>(request.driverId ?? current?.driverId ?? null)
  const [reason, setReason] = useState("")

  const vehicle = vehicles.find((item) => item.id === vehicleId)
  const changed = driverId !== (current?.driverId ?? null)
  // Jour commencé ou passé et conducteur déjà en place : le changement doit être motivé.
  const needsReason = Boolean(current) && date <= today && changed
  const canSubmit = Boolean(vehicleId && driverId) && changed && (!needsReason || reason.trim().length > 0)

  const options: DriverOption[] = drivers.map((driver) => {
    const elsewhere = [...index.bySlot.values()].find(
      (item) => item.date === date && item.driverId === driver.id && item.vehicleId !== vehicleId
    )
    const plate = elsewhere && vehicles.find((item) => item.id === elsewhere.vehicleId)?.plate
    return { driver, unavailable: plate ? `Déjà sur ${plate}` : undefined }
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit || !vehicleId || !driverId) return
    onSave({ vehicleId, date, driverId, reason: needsReason ? reason.trim() : undefined })
  }

  const vehicleItems = vehicles.map((item) => ({ value: item.id, label: `${item.plate} · ${item.make} ${item.model}` }))
  const dateItems = dates.map((value) => ({
    value,
    label: `${formatShortDay(value)}${value === today ? " · aujourd’hui" : ""}`,
  }))

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
      {fromSlot && vehicle ? (
        <SlotSummary vehicle={vehicle} date={date}>
          {currentDriver && (
            <span className="flex flex-col items-end gap-0.5">
              <span className="text-[11px] text-muted-foreground">Prévu</span>
              <DriverChip driver={currentDriver} />
            </span>
          )}
        </SlotSummary>
      ) : (
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="slot-vehicle" className="text-[13px] font-semibold">
              Véhicule
            </FieldLabel>
            <Select items={vehicleItems} value={vehicleId} onValueChange={(value) => setVehicleId(value as string | null)}>
              <SelectTrigger id="slot-vehicle" className="h-9! w-full rounded-xl border-transparent bg-muted text-[13px]">
                <SelectValue placeholder="Choisir un véhicule" />
              </SelectTrigger>
              <SelectContent>
                {vehicleItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="slot-date" className="text-[13px] font-semibold">
              Jour
            </FieldLabel>
            <Select items={dateItems} value={date} onValueChange={(value) => value && setDate(value as string)}>
              <SelectTrigger id="slot-date" className="h-9! w-full rounded-xl border-transparent bg-muted text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {currentDriver && (
            <p className="flex items-center gap-1.5 text-xs text-soft-foreground sm:col-span-2">
              Déjà prévu ce jour-là : <DriverChip driver={currentDriver} />
            </p>
          )}
        </div>
      )}

      <DriverPicker
        name="slot-driver"
        legend={current ? "Conducteur" : "Qui conduit ?"}
        options={options}
        value={driverId}
        onChange={setDriverId}
      />

      {needsReason && (
        <Field className="gap-1.5">
          <FieldLabel htmlFor="slot-reason" className="text-[13px] font-semibold">
            Pourquoi ce changement ?
          </FieldLabel>
          <Input
            id="slot-reason"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            maxLength={120}
            autoComplete="off"
            aria-describedby="slot-reason-help"
            className="h-9 rounded-xl border-transparent bg-muted text-[13px] md:text-[13px]"
          />
          <div className="flex flex-wrap gap-1.5">
            {reasonSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setReason(suggestion)}
                className="h-7 rounded-full bg-card px-2.5 text-xs font-medium"
              >
                {suggestion}
              </Button>
            ))}
          </div>
          <FieldDescription id="slot-reason-help" className="text-xs">
            Le jour est commencé : le planning garde le conducteur prévu, votre nom et ce motif.
          </FieldDescription>
        </Field>
      )}

      {previous && previousFrom && currentDriver && (
        <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
          <Icon icon="history-linear" className="size-3.5" />
          Déjà changé {formatRelativeDateTime(previous.at, today)} par {previous.by} :
          <DriverChip driver={previousFrom} struck />
          <Icon icon="arrow-right-linear" className="size-3" />
          <DriverChip driver={currentDriver} />
          <span>({previous.reason})</span>
        </p>
      )}

      {vehicle && !vehicle.hasBeacon && <NoBeaconNote />}

      <div className="flex flex-wrap items-center justify-end gap-2">
        {current && date > today && vehicleId && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onRemove(vehicleId, date)}
            className="mr-auto h-10 rounded-xl px-3 text-sm font-bold text-danger-soft-foreground hover:bg-danger-soft hover:text-danger-soft-foreground"
          >
            <Icon icon="trash-bin-minimalistic-linear" data-icon="inline-start" className="size-4" />
            Retirer
          </Button>
        )}
        <DialogClose
          render={
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-xl bg-card px-4 text-sm font-bold text-primary hover:text-primary"
            />
          }
        >
          Annuler
        </DialogClose>
        <Button type="submit" disabled={!canSubmit} className="h-10 rounded-xl px-5 text-sm font-bold disabled:opacity-40">
          Enregistrer
        </Button>
      </div>
    </form>
  )
}
