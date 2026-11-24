"use client"

import { useState, type FormEvent } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel } from "@/components/ui/field"
import { Icon } from "@/components/ui/icon"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

// Compact par défaut, tailles de la maquette en `tall:` (≥ 820 px de haut sur desktop).
const fieldClass =
  "h-11 rounded-xl border-transparent bg-muted short:h-10 tall:h-13"
const inputClass = "h-full pl-2 text-[15px] md:text-[15px]"
const addonIconClass = "size-4.5 text-muted-foreground"
const labelClass = "text-[13px] font-semibold"
const fieldGap = "gap-1 tall:gap-1.5"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO : brancher l'API d'authentification Safe Road CI.
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-100 flex-col gap-2 tall:gap-4"
    >
      <div className="flex flex-col gap-1 tall:gap-1.5">
        <h2 className="text-[26px] leading-tight font-semibold tracking-[-0.02em] short:text-2xl tall:text-3xl">
          Bon retour&nbsp;!
        </h2>
        <p className="text-sm text-muted-foreground tall:text-[15px]">
          Connectez-vous à l’espace de votre organisation.
        </p>
      </div>

      <Field className={fieldGap}>
        <FieldLabel htmlFor="email" className={labelClass}>
          Adresse e-mail
        </FieldLabel>
        <InputGroup className={fieldClass}>
          <InputGroupAddon className="pl-3.5">
            <Icon icon="letter-linear" className={addonIconClass} />
          </InputGroupAddon>
          <InputGroupInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nom@organisation.ci"
            required
            className={inputClass}
          />
        </InputGroup>
      </Field>

      <Field className={fieldGap}>
        <div className="flex items-baseline justify-between gap-3">
          <FieldLabel htmlFor="password" className={labelClass}>
            Mot de passe
          </FieldLabel>
          <a
            href="#"
            className="text-[13px] font-bold text-primary underline underline-offset-2"
          >
            Mot de passe oublié&nbsp;?
          </a>
        </div>
        <InputGroup className={fieldClass}>
          <InputGroupAddon className="pl-3.5">
            <Icon icon="lock-keyhole-linear" className={addonIconClass} />
          </InputGroupAddon>
          <InputGroupInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            required
            className={inputClass}
          />
          <InputGroupAddon align="inline-end" className="pr-1.5">
            <InputGroupButton
              size="icon-sm"
              className="size-9 rounded-[10px] text-soft-foreground tall:size-10"
              aria-label={
                showPassword
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }
              aria-pressed={showPassword}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              <Icon
                icon={showPassword ? "eye-closed-linear" : "eye-linear"}
                className="size-4.5"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <Field orientation="horizontal" className="min-h-7 gap-2.5 short:min-h-6 tall:min-h-10">
        <Checkbox
          id="remember"
          name="remember"
          className="size-4.5 rounded-[5px]"
        />
        <FieldLabel
          htmlFor="remember"
          className="text-sm font-normal text-soft-foreground"
        >
          Rester connecté sur cet appareil
        </FieldLabel>
      </Field>

      <Button
        type="submit"
        className="h-11 w-full gap-2.5 rounded-xl text-base font-bold short:h-10 tall:h-13"
      >
        Se connecter
        <Icon
          icon="arrow-right-linear"
          data-icon="inline-end"
          className="size-4.5"
        />
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        première connexion
        <span className="h-px flex-1 bg-border" />
      </div>

      <a
        href="#"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-11 w-full gap-2 rounded-xl border-[1.5px] bg-card text-sm font-bold text-primary hover:bg-muted hover:text-primary short:h-10 tall:h-12"
        )}
      >
        <Icon
          icon="letter-linear"
          data-icon="inline-start"
          className="size-4.5"
        />
        Activer mon compte avec une invitation
      </a>
    </form>
  )
}
