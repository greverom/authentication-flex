import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { getCurrentUser } from "@/server/auth/login/actions"
import { mapSupabaseUserToAppUser } from "@/lib/auth/mapSupabaseUserToAppUser"

const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER

export default async function DashboardPage() {
  if (provider === "firebase") {
    return <DashboardContent/>
  }

  const user = await getCurrentUser()

  if (!user) return null

  const appUser = mapSupabaseUserToAppUser(user)

  return <DashboardContent user={appUser} />
}