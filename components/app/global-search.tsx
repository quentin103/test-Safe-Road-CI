"use client"

import type { FormEvent } from "react"

import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

/** Recherche globale de l'en-tête (véhicules, invitations…). */
export function GlobalSearch({ className }: { className?: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO : brancher la recherche (route ou API).
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("min-w-0", className)}>
      <label htmlFor="global-search" className="sr-only">
        Rechercher
      </label>
      <InputGroup className="h-11 rounded-full border-transparent bg-card">
        <InputGroupInput
          id="global-search"
          name="q"
          type="search"
          placeholder="Rechercher un véhicule, une invitation…"
          className="h-full pl-4 text-[13px] md:text-[13px]"
        />
        <InputGroupAddon align="inline-end" className="pr-1.5">
          <InputGroupButton
            type="submit"
            size="icon-sm"
            aria-label="Lancer la recherche"
            className="size-8.5 rounded-full bg-foreground text-primary-foreground hover:bg-foreground/85 hover:text-primary-foreground"
          >
            <Icon icon="magnifier-linear" className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
