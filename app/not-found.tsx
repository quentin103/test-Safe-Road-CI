import type { Metadata } from "next"
import Link from "next/link"

import { LogoIcon } from "@/components/brand/logo-mark"
import { DeadEndIllustration } from "@/components/errors/dead-end-illustration"
import { GoBackButton } from "@/components/errors/go-back-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { mainNav } from "@/lib/navigation"

export const metadata: Metadata = {
  title: "Page introuvable",
}

/** Page 404 : toute adresse inconnue, et tout `notFound()` sans page dédiée plus proche. */
export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col px-4 py-4">
      <header className="mx-auto flex w-full max-w-5xl items-center gap-2.5">
        <LogoIcon className="size-10" />
        <span className="text-[15px] font-bold">Safe Road CI</span>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 items-center py-4">
        <div className="grid w-full overflow-hidden rounded-[1.5rem] bg-card md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* L'illustration remplit le panneau, calée en bas : les collines touchent les bords. */}
          <div className="relative min-h-64 bg-accent/60">
            <DeadEndIllustration className="absolute inset-0 size-full" />
          </div>

          <div className="flex flex-col gap-4 p-6 md:p-8">
            <Badge variant="warning" className="h-6 gap-1 px-2.5 text-xs font-bold [&>svg]:size-3.5!">
              <Icon icon="danger-triangle-linear" />
              Erreur 404
            </Badge>
            <div className="flex flex-col gap-2">
              <h1 className="text-[28px] leading-[1.15] font-semibold tracking-[-0.02em]">
                Cette route ne mène nulle part
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                La page que vous cherchez n’existe pas, a été déplacée, ou son lien est incomplet. Vérifiez l’adresse, ou
                reprenez depuis le tableau de bord.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                nativeButton={false}
                render={<Link href="/dashboard" />}
                className="h-10 gap-1.5 rounded-xl px-4 text-sm font-bold"
              >
                <Icon icon="widget-5-linear" data-icon="inline-start" className="size-4" />
                Retour au tableau de bord
              </Button>
              <GoBackButton />
            </div>

            <nav aria-label="Pages du portail" className="flex flex-col gap-2 border-t border-track pt-4">
              <span className="text-xs font-semibold text-soft-foreground">Ou allez directement à :</span>
              <ul className="flex flex-wrap gap-1.5">
                {mainNav.slice(1).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex h-8 items-center gap-1.5 rounded-full bg-muted px-3 text-xs font-semibold transition-colors outline-none hover:bg-accent hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <Icon icon={item.icon} className="size-3.5 text-primary" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>

      <p className="mx-auto w-full max-w-5xl text-center text-xs text-muted-foreground">
        Le problème persiste ? Écrivez à votre contact SafeRoad en précisant l’adresse de la page.
      </p>
    </div>
  )
}
