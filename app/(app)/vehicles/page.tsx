import type { Metadata } from "next"

import { NotificationsButton } from "@/components/app/notifications-button"
import { PageHeader } from "@/components/app/page-header"
import { RoleBadge } from "@/components/app/role-badge"
import { BeaconSetupCard } from "@/components/vehicles/beacon-setup-card"
import { HiddenDataCard } from "@/components/vehicles/hidden-data-card"
import { VehicleFleet } from "@/components/vehicles/vehicle-fleet"
import { getCurrentUser } from "@/lib/session"
import { getVehiclesData } from "@/lib/vehicles/data"

export const metadata: Metadata = {
  title: "Véhicules",
}

export default async function VehiclesPage() {
  const [user, data] = await Promise.all([getCurrentUser(), getVehiclesData()])

  return (
    <>
      <PageHeader
        title="Véhicules"
        description={`Parc de ${user.organization} : fiches, balises et affectations prévues. Sans position ni trajet.`}
        actions={
          <>
            <RoleBadge role={user.role} />
            <NotificationsButton />
          </>
        }
      />

      <main className="flex min-w-0 flex-col gap-3">
        <VehicleFleet initialVehicles={data.vehicles} />

        <div className="grid gap-3 lg:grid-cols-[minmax(0,16fr)_minmax(0,9fr)]">
          <BeaconSetupCard />
          <HiddenDataCard />
        </div>
      </main>
    </>
  )
}
