import Link from "next/link"

import { LogoMark } from "@/components/brand/logo-mark"
import { cn } from "@/lib/utils"

/** Pastille logo cliquable qui ramène au tableau de bord. */
export function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard"
      aria-label="Safe Road CI, tableau de bord"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
        className
      )}
    >
      <LogoMark className="size-5" />
    </Link>
  )
}
