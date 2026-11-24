import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

const iconBubbleVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full",
  {
    variants: {
      tone: {
        muted: "bg-muted text-primary",
        neutral: "bg-track text-soft-foreground",
        success: "bg-accent text-primary",
        danger: "bg-danger-soft text-danger-soft-foreground",
        warning: "bg-sand text-ochre",
        info: "bg-info-soft text-info-foreground",
        primary: "bg-primary text-primary-foreground",
        sage: "bg-sage text-primary-foreground",
        card: "bg-card text-primary",
      },
      size: {
        sm: "size-7 [&_svg]:size-3.5",
        md: "size-8.5 [&_svg]:size-4",
        lg: "size-10 [&_svg]:size-4.5",
      },
    },
    defaultVariants: {
      tone: "muted",
      size: "md",
    },
  }
)

type IconBubbleProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof iconBubbleVariants> & {
    /** Nom d'icône Iconify (jeu Solar par défaut). */
    icon: string
  }

/** Pastille ronde contenant une icône. */
function IconBubble({ icon, tone, size, className, ...props }: IconBubbleProps) {
  return (
    <span
      data-slot="icon-bubble"
      aria-hidden="true"
      className={cn(iconBubbleVariants({ tone, size }), className)}
      {...props}
    >
      <Icon icon={icon} />
    </span>
  )
}

export { IconBubble, iconBubbleVariants }
export type { IconBubbleProps }
