"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { AppLogo } from "@/components/app/app-logo"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { isNavItemActive, logoutNavItem, mainNav } from "@/lib/navigation"
import { cn } from "@/lib/utils"

/** Menu de navigation en panneau latéral, pour les écrans sous `md`. */
export function AppMobileNav({ className }: { className?: string }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Ouvrir le menu"
            className={cn("size-10 rounded-full bg-card hover:bg-card/70", className)}
          />
        }
      >
        <Icon icon="hamburger-menu-linear" className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="gap-2 p-4">
        <SheetHeader className="flex-row items-center gap-3 p-0">
          <AppLogo className="size-10" />
          <SheetTitle className="text-base font-bold">Safe Road CI</SheetTitle>
        </SheetHeader>
        <Suspense fallback={<MobileNavLinks pathname={null} />}>
          <MobileNavLinksWithPathname />
        </Suspense>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavLinksWithPathname() {
  const pathname = usePathname()
  return <MobileNavLinks pathname={pathname} />
}

function MobileNavLinks({ pathname }: { pathname: string | null }) {
  return (
    <nav aria-label="Navigation principale" className="mt-2 flex flex-col gap-1">
      {[...mainNav, logoutNavItem].map((item) => {
        const active = pathname !== null && isNavItemActive(pathname, item.href)
        return (
          <SheetClose
            key={item.href}
            nativeButton={false}
            render={
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
              />
            }
            className={cn(
              "flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-foreground text-primary-foreground"
                : "text-foreground hover:bg-muted",
              item === logoutNavItem && "mt-4"
            )}
          >
            <Icon icon={item.icon} className="size-5" />
            {item.title}
          </SheetClose>
        )
      })}
    </nav>
  )
}
