"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"

import { InviteMemberDialog } from "@/components/organization/invite-member-dialog"
import { MembersCard } from "@/components/organization/members-card"
import { OrganizationCard } from "@/components/organization/organization-card"
import { OrganizationLogCard } from "@/components/organization/organization-log-card"
import { PermissionsSheet } from "@/components/organization/permissions-sheet"
import { addDays } from "@/lib/planning/week"
import { fullName } from "@/lib/organization/organization"
import type { FormerMember, OrganizationData, OrganizationEvent } from "@/lib/organization/types"

/** Organisation, membres, invitations et journal : partagent le même état. */
export function OrganizationBoard({ today, organization, ...initial }: OrganizationData) {
  const [members, setMembers] = useState(initial.members)
  const [invitations, setInvitations] = useState(initial.invitations)
  const [formerMembers, setFormerMembers] = useState(initial.formerMembers)
  const [events, setEvents] = useState(initial.events)

  const currentUser = members.find((member) => member.isCurrentUser)
  const author = currentUser ? fullName(currentUser) : "Vous"
  const counts = useMemo(
    () => ({
      members: members.length,
      admins: members.filter((member) => member.role === "admin").length,
      managers: members.filter((member) => member.role === "manager").length,
      pending: invitations.length,
    }),
    [members, invitations]
  )
  const takenEmails = [...members.map((member) => member.email), ...invitations.map((invitation) => invitation.email)]

  function log(type: OrganizationEvent["type"], text: string) {
    const time = new Date().toISOString().slice(11, 16)
    setEvents((list) => [{ id: `ev-${crypto.randomUUID()}`, type, text, at: `${today}T${time}:00Z` }, ...list])
  }

  function invite(email: string) {
    // TODO : appeler l'API d'invitation d'un membre.
    setInvitations((list) => [
      { id: `minv-${crypto.randomUUID()}`, email, role: "manager", sentAt: today, sentBy: author, expiresAt: addDays(today, 7) },
      ...list,
    ])
    log("invited", `${author} a invité ${email}`)
    toast.success(`Invitation envoyée à ${email}`)
  }

  return (
    <>
      <OrganizationCard organization={organization} counts={counts} />

      <div className="grid gap-3 lg:grid-cols-[minmax(0,16fr)_minmax(0,9fr)] lg:items-start">
        <MembersCard
          members={members}
          invitations={invitations}
          formerMembers={formerMembers}
          actions={
            <>
              <PermissionsSheet currentRole={currentUser?.role ?? "manager"} />
              {currentUser?.role === "admin" && (
                <InviteMemberDialog domain={organization.website} takenEmails={takenEmails} onInvite={invite} />
              )}
            </>
          }
          onRemove={(member) => {
            // TODO : appeler l'API de retrait d'un membre.
            setMembers((list) => list.filter((item) => item.id !== member.id))
            const former: FormerMember = {
              id: `old-${member.id}`,
              firstName: member.firstName,
              lastName: member.lastName,
              role: member.role,
              from: member.since,
              to: today,
              removedBy: author,
            }
            setFormerMembers((list) => [former, ...list])
            log("removed", `${author} a retiré ${fullName(member)}`)
            toast.success(`${fullName(member)} n’a plus accès au portail.`)
          }}
          onRemind={(invitation) => {
            // TODO : appeler l'API de renvoi.
            setInvitations((list) =>
              list.map((item) => (item.id === invitation.id ? { ...item, sentAt: today, expiresAt: addDays(today, 7) } : item))
            )
            toast.success(`Invitation renvoyée à ${invitation.email}`)
          }}
          onCancel={(invitation) => {
            // TODO : appeler l'API d'annulation.
            setInvitations((list) => list.filter((item) => item.id !== invitation.id))
            toast.success(`L’invitation de ${invitation.email} est annulée.`)
          }}
        />
        <OrganizationLogCard events={events} today={today} />
      </div>
    </>
  )
}
