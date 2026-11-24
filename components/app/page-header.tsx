import type { ReactNode } from "react"
import Link from "next/link"

import { AppMobileNav } from "@/components/app/app-mobile-nav"
import { GlobalSearch } from "@/components/app/global-search"
import { NotificationsButton } from "@/components/app/notifications-button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  /** Lien de retour affiché au-dessus du titre (« ← Conducteurs »). */
  back?: { href: string; label: string }
  /** Remplace la recherche + notifications par défaut. */
  actions?: ReactNode
}

/**
 * En-tête de page : titre, sous-titre et outils globaux (recherche, notifications).
 * Se place sur la première ligne de la grille de `app/(app)/layout.tsx`.
 */
export function PageHeader({ title, description, back, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-3 md:col-start-2 md:row-start-1">
      <AppMobileNav className="md:hidden" />
      <div className={cn("flex min-w-60 flex-1 flex-col", back ? "gap-1.5" : "gap-0.5")}>
        {back && (
          <Link
            href={back.href}
            className="flex w-fit items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline hover:underline-offset-2"
          >
            <Icon icon="arrow-left-linear" className="size-4" />
            {back.label}
          </Link>
        )}
        <h1 className="text-[22px] leading-[1.3] font-semibold tracking-[-0.01em]">
          {title}
        </h1>
        {description && (
          <p className="text-[13px] text-muted-foreground">{description}</p>
        )}
      </div>
      <div
        className={cn(
          "flex items-center gap-2.5",
          actions ? "w-full justify-end sm:w-auto" : "w-full lg:w-110"
        )}
      >
        {actions ?? (
          <>
            <GlobalSearch className="flex-1" />
            <NotificationsButton unreadCount={1} />
          </>
        )}
      </div>
    </header>
  )
}
