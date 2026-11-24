"use client"

import { CopyableMessage } from "@/components/app/copyable-message"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DevicesData } from "@/lib/devices/types"
import { cn } from "@/lib/utils"

type FleetMessageCardProps = {
  messages: DevicesData["messages"]
  className?: string
}

/** Deux messages prêts à envoyer à tous les conducteurs : téléphones silencieux, mise à jour. */
export function FleetMessageCard({ messages, className }: FleetMessageCardProps) {
  return (
    <Card className={cn("[--card-gap:--spacing(3)]", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="chat-round-dots-linear" className="size-4.5 text-primary" />
          <h2>Message pour toute la flotte</h2>
        </CardTitle>
        <CardDescription>À envoyer par SMS ou dans votre groupe de discussion.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <Tabs defaultValue="silent" className="flex-1 gap-3">
          <TabsList variant="pill" size="sm" className="w-full">
            <TabsTrigger value="silent">Téléphones silencieux</TabsTrigger>
            <TabsTrigger value="update">Mise à jour</TabsTrigger>
          </TabsList>
          <TabsContent value="silent" className="flex flex-col">
            <CopyableMessage message={messages.silent} className="flex-1" />
          </TabsContent>
          <TabsContent value="update" className="flex flex-col">
            <CopyableMessage message={messages.update} className="flex-1" />
          </TabsContent>
        </Tabs>
        <p className="flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
          <Icon icon="users-group-rounded-linear" className="mt-px size-3.5 shrink-0" />
          Le message part à tout le monde : vous ne savez pas qui est concerné, et c’est voulu.
        </p>
      </CardContent>
    </Card>
  )
}
