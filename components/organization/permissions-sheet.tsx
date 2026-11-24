"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { permissions, roleLabels } from "@/lib/organization/organization"
import type { MemberRole } from "@/lib/organization/types"
import { cn } from "@/lib/utils"

/** Bouton « Qui peut faire quoi » et panneau latéral comparant les deux rôles. */
export function PermissionsSheet({ currentRole }: { currentRole: MemberRole }) {
  const roles: MemberRole[] = ["admin", "manager"]

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="h-9 gap-1.5 rounded-xl bg-card px-3 text-[13px] font-bold text-primary hover:text-primary"
          />
        }
      >
        <Icon icon="key-linear" data-icon="inline-start" className="size-4" />
        Qui peut faire quoi
      </SheetTrigger>
      <SheetContent className="gap-0 bg-card data-[side=right]:w-full data-[side=right]:sm:max-w-md">
        <SheetHeader className="border-b border-track p-4 pr-12">
          <SheetTitle className="flex items-center gap-2 text-base font-bold">
            <Icon icon="key-linear" className="size-4.5 text-primary" />
            Qui peut faire quoi
          </SheetTitle>
          <SheetDescription className="text-xs">Les deux rôles du portail, côte à côte.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full border-separate border-spacing-0 text-[13px]">
            <thead>
              <tr>
                <th scope="col" className="pb-2 text-left text-[11px] font-semibold tracking-[0.06em] text-soft-foreground uppercase">
                  Action
                </th>
                {roles.map((role) => (
                  <th
                    key={role}
                    scope="col"
                    className={cn(
                      "w-24 rounded-t-xl px-1.5 pt-2 pb-2 text-center text-xs leading-tight font-bold",
                      role === currentRole ? "bg-accent/70" : "bg-muted"
                    )}
                  >
                    {roleLabels[role]}
                    {role === currentRole && <span className="block text-[11px] font-semibold text-accent-foreground">Vous</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissions.map((row, index) => (
                <tr key={row.action}>
                  <th scope="row" className="border-t border-track py-2.5 pr-2 text-left font-normal">
                    {row.action}
                  </th>
                  {roles.map((role) => {
                    const allowed = row[role]
                    return (
                      <td
                        key={role}
                        className={cn(
                          "border-t border-track text-center",
                          role === currentRole ? "bg-accent/40" : "bg-muted/60",
                          index === permissions.length - 1 && "rounded-b-xl"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex size-6 items-center justify-center rounded-full",
                            allowed ? "bg-accent text-primary" : "bg-danger-soft text-danger-soft-foreground"
                          )}
                        >
                          <Icon icon={allowed ? "check-linear" : "close-linear"} className="size-3.5" />
                          <span className="sr-only">{allowed ? "Autorisé" : "Non autorisé"}</span>
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-muted p-3 text-xs leading-snug text-soft-foreground">
            <Icon icon="shield-check-linear" className="size-4 shrink-0 text-primary" />
            Un rôle interne SafeRoad ne s’attribue jamais depuis le portail, même par un administrateur.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}
