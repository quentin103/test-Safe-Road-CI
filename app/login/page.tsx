import type { Metadata } from "next"

import { LoginForm } from "@/components/auth/login-form"
import { LoginShowcase } from "@/components/auth/login-showcase"
import { LogoMark } from "@/components/brand/logo-mark"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Connexion",
}

/**
 * Page de connexion : tient dans la hauteur de la fenêtre, sans défilement.
 * Compacte par défaut, tailles de la maquette à partir de 820 px de haut sur desktop (`tall:`).
 */
export default function LoginPage() {
  return (
    <main className="flex h-svh items-center justify-center p-3 short:p-2">
      <div className="flex size-full max-h-190 max-w-310 gap-3 rounded-[28px] bg-card p-2 tall:rounded-[30px] tall:p-3">
        <LoginShowcase />

        <section className="flex min-h-0 grow basis-100 flex-col justify-between gap-3 overflow-y-auto px-5 py-3.5 short:gap-2 short:py-2.5 tall:gap-6 tall:px-8 tall:py-9">
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            {/* Marque visible quand le panneau vert est masqué (petits écrans). */}
            <span className="flex items-center gap-2.5 lg:hidden">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <LogoMark className="size-4.5" />
              </span>
              <span className="text-[15px] font-bold">Safe Road CI</span>
            </span>
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "h-8 gap-1.5 rounded-full px-3.5 text-[13px] font-semibold tall:h-9"
              )}
            >
              <Icon
                icon="question-circle-linear"
                data-icon="inline-start"
                className="size-4"
              />
              Besoin d’aide
            </a>
          </div>

          <LoginForm />

          <div className="mx-auto flex w-full max-w-100 flex-col gap-2.5 tall:gap-3.5">
            <div className="flex items-center gap-3 rounded-xl bg-sand px-3.5 py-2.5 text-sand-foreground tall:py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-card text-ochre tall:size-9">
                <Icon icon="smartphone-linear" className="size-4.5" />
              </span>
              <p className="text-[13px] leading-normal">
                <strong>Vous êtes conducteur&nbsp;?</strong> Votre score et vos
                trajets sont dans l’application Safe Road CI, pas ici.
              </p>
            </div>

            <footer className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
              <span>© 2026 Safe Road CI</span>
              <nav className="flex gap-3.5">
                <a href="#" className="text-soft-foreground underline">
                  Confidentialité
                </a>
                <a href="#" className="text-soft-foreground underline">
                  Conditions
                </a>
              </nav>
            </footer>
          </div>
        </section>
      </div>
    </main>
  )
}
