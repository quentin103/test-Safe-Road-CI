import { redirect } from "next/navigation"

/** La racine renvoie vers le tableau de bord. */
export default function Home() {
  redirect("/dashboard")
}
