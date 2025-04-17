
import { getCurrentUser } from "@/server/auth/login/actions"
import { mapSupabaseUserToAppUser } from "@/lib/auth/mapSupabaseUserToAppUser"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const appUser = mapSupabaseUserToAppUser(user)

  return <DashboardContent user={appUser} />
}