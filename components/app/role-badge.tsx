import { cn } from "@/lib/utils"

/** Pastille du rôle de l'utilisateur connecté, dans l'en-tête de page. */
export function RoleBadge({ role, className }: { role: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full bg-card px-4 text-[13px] font-semibold",
        className
      )}
    >
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-sage" />
      {role}
    </span>
  )
}
