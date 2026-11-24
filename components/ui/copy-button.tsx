"use client"

import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

type CopyButtonProps = Omit<ComponentProps<typeof Button>, "onClick" | "children"> & {
  value: string
  /** Libellé lu par les lecteurs d'écran, ex. « Copier le code K7P-2QD ». */
  label?: string
  /** Texte affiché à côté de l'icône ; sans lui, le bouton n'est qu'une icône. */
  children?: ReactNode
}

/** Bouton qui copie une valeur dans le presse-papiers, avec confirmation visuelle. */
function CopyButton({ value, label = "Copier", className, children, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={copy}
      aria-label={copied ? "Copié" : label}
      data-copied={copied || undefined}
      className={cn("size-7 rounded-lg bg-muted text-soft-foreground hover:bg-track", className)}
      {...props}
    >
      <Icon icon={copied ? "copy-check-linear" : "copy-linear"} className="size-3.5" />
      {children && (copied ? "Copié" : children)}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copié" : ""}
      </span>
    </Button>
  )
}

export { CopyButton }
