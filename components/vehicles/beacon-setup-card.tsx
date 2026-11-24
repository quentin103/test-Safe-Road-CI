import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Steps, type StepItem } from "@/components/ui/steps"

const steps: StepItem[] = [
  {
    icon: "car-linear",
    title: "Poser la balise",
    description: "Fixez-la à l’intérieur du véhicule, à l’abri de la chaleur directe.",
  },
  {
    icon: "tag-linear",
    title: "Saisir son numéro",
    description: "Reportez le numéro SR-BX inscrit sur l’étiquette dans la fiche du véhicule.",
  },
  {
    icon: "bluetooth-wave-linear",
    title: "Attendre la détection",
    description: "Elle passe en « Inventoriée » dès qu’un téléphone de la flotte la reconnaît.",
  },
]

/** Mode d'emploi en trois étapes pour équiper un véhicule d'une balise. */
export function BeaconSetupCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2">
        <Icon icon="info-circle-linear" className="size-4.5 text-primary" />
        <CardTitle>
          <h2>Équiper un véhicule d’une balise</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <Steps items={steps} className="flex-1" />
      </CardContent>
    </Card>
  )
}
