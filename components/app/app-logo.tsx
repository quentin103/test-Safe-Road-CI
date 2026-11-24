import Link from "next/link"

import { LogoIcon } from "@/components/brand/logo-mark"
import { cn } from "@/lib/utils"

/** Logo cliquable qui ramène au tableau de bord. */
export function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard"
      aria-label="Safe Road CI, tableau de bord"
      className={cn(
        "flex size-10 shrink-0 rounded-[22%] outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <LogoIcon className="size-full" />
    </Link>
  )
}
