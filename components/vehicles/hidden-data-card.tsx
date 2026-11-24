import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { IconBubble } from "@/components/ui/icon-bubble"

const hiddenData = [
  { icon: "map-point-linear", label: "La position ou le parcours d’un véhicule" },
  { icon: "route-linear", label: "Les trajets effectués avec ce véhicule" },
  { icon: "chart-2-linear", label: "Un score par véhicule" },
]

/** Rappel de ce que la page Véhicules ne montre jamais, et pourquoi. */
export function HiddenDataCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="shield-check-linear" className="size-4.5 text-primary" />
        <CardTitle>
          <h2>Ce que l’écran ne montre pas</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ul className="flex flex-col gap-2">
          {hiddenData.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-[13px]">
              <IconBubble icon={item.icon} tone="danger" size="sm" />
              <span className="sr-only">Jamais affiché :</span>
              {item.label}
            </li>
          ))}
        </ul>
        <p className="text-xs leading-snug text-muted-foreground">
          Un véhicule est souvent conduit par une seule personne : ses données de conduite resteraient
          identifiables.
        </p>
      </CardContent>
    </Card>
  )
}
