import { cn } from "@/lib/utils"

/** Immatriculation affichée comme une plaque : cadre foncé, chiffres en gras. */
export function LicensePlate({ plate, className }: { plate: string; className?: string }) {
  return (
    <span
      data-slot="license-plate"
      className={cn(
        "inline-flex h-6 w-fit items-center rounded-md border-[1.5px] border-foreground bg-card px-1.5 text-[13px] leading-none font-bold tracking-[0.04em] whitespace-nowrap tabular-nums",
        className
      )}
    >
      {plate}
    </span>
  )
}
