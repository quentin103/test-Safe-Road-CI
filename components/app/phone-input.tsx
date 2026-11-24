"use client"

import type { ComponentProps } from "react"

import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  formatIvorianNumber,
  IVORIAN_DIAL_CODE,
  normalizeIvorianNumber,
} from "@/lib/phone"
import { cn } from "@/lib/utils"

type PhoneInputProps = Omit<ComponentProps<"input">, "value" | "onChange" | "type"> & {
  /** Les 10 chiffres nationaux, sans espace. */
  value: string
  onValueChange: (digits: string) => void
}

/** Saisie d'un numéro ivoirien : indicatif +225 fixe, chiffres groupés par deux. */
export function PhoneInput({ value, onValueChange, className, ...props }: PhoneInputProps) {
  return (
    <InputGroup className={cn("h-10 rounded-xl bg-muted", className)}>
      <InputGroupAddon className="h-full py-1 pl-1">
        <span className="flex h-full items-center rounded-lg bg-card px-2.5 text-[13px] font-bold text-foreground">
          {IVORIAN_DIAL_CODE}
        </span>
      </InputGroupAddon>
      <InputGroupInput
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="07 48 21 63 05"
        value={formatIvorianNumber(value)}
        onChange={(event) => onValueChange(normalizeIvorianNumber(event.target.value))}
        className="h-full pl-2.5 text-sm md:text-sm"
        {...props}
      />
      <InputGroupAddon align="inline-end" className="pr-3.5">
        <Icon icon="smartphone-linear" className="size-4.5 text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  )
}
