"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MotionConfig, motion } from "motion/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Icon } from "@/components/ui/icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  isNavItemActive,
  logoutNavItem,
  mainNav,
  type NavItem,
} from "@/lib/navigation"
import { cn } from "@/lib/utils"

type AppRailProps = {
  userName: string
  userInitials: string
  className?: string
}

/**
 * Rail de navigation vertical (icônes + infobulles), affiché à partir de `md`.
 * L'adresse courante est lue sous Suspense : sur les routes dynamiques, la coquille
 * statique affiche le rail sans élément actif, puis il s'allume au chargement.
 * La pastille de la page active glisse d'une icône à l'autre (animation partagée Motion).
 */
export function AppRail(props: AppRailProps) {
  return (
    <MotionConfig reducedMotion="user">
      <Suspense fallback={<RailNav {...props} pathname={null} />}>
        <RailWithPathname {...props} />
      </Suspense>
    </MotionConfig>
  )
}

function RailWithPathname(props: AppRailProps) {
  const pathname = usePathname()
  return <RailNav {...props} pathname={pathname} />
}

function RailNav({
  userName,
  userInitials,
  className,
  pathname,
}: AppRailProps & { pathname: string | null }) {
  return (
    <nav
      aria-label="Navigation principale"
      className={cn(
        "flex min-h-0 flex-col items-center gap-1 overflow-y-auto rounded-full bg-card p-1.5 [scrollbar-width:none]",
        className
      )}
    >
      {mainNav.map((item) => (
        <RailLink
          key={item.href}
          item={item}
          active={pathname !== null && isNavItemActive(pathname, item.href)}
        />
      ))}

      <span aria-hidden="true" className="h-12 min-h-3 shrink" />

      <RailLink item={logoutNavItem} />

      <Tooltip>
        <TooltipTrigger
          render={<span />}
          aria-label={userName}
          className="shrink-0 rounded-full"
        >
          <Avatar className="size-9.5 after:border-0">
            <AvatarFallback className="bg-primary text-[13px] font-bold text-primary-foreground">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="right">{userName}</TooltipContent>
      </Tooltip>
    </nav>
  )
}

function RailLink({ item, active = false }: { item: NavItem; active?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={item.href}
            aria-label={item.title}
            aria-current={active ? "page" : undefined}
          />
        }
        className={cn(
          "relative flex size-9.5 shrink-0 items-center justify-center rounded-full transition-colors duration-300 outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          active ? "text-primary-foreground" : "text-foreground hover:bg-muted"
        )}
      >
        {active && (
          <motion.span
            layoutId="rail-active-pill"
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-foreground"
            transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
          />
        )}
        <Icon icon={item.icon} className="relative size-4.5" />
      </TooltipTrigger>
      <TooltipContent side="right">{item.title}</TooltipContent>
    </Tooltip>
  )
}
