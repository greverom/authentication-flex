"use client"

import { Sidebar } from "@/components/sidebar/sidebar"
import { logoutUser } from "@/services/authActions"
import { logout } from "@/server/auth/login/actions"
import { Button } from "@/components/ui/button"
import { AppUser } from "@/interface/appUser"
import { UserInfoGrid } from "./userInfoGrid"


interface DashboardContentProps {
  user: AppUser
}

export function DashboardContent({ user }: DashboardContentProps) {
  const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "supabase"
  
  // useEffect(() => {
  //   console.log("Usuario autenticado:", user)
  // }, [user])

  async function handleLogout() {
    try {
      await logoutUser()
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-8 ml-16 transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {provider === "supabase" ? (
            <form action={logout}>
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </form>
          ) : (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>

        <p className="text-muted-foreground mb-4">
          Bienvenido <strong>{user.name ?? "Usuario"}</strong>
        </p>

        <UserInfoGrid user={user} />
      </main>
    </div>
  )
}