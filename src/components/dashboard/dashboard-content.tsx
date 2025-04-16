"use client"

import { Sidebar } from "@/components/sidebar/sidebar"
import { logoutUser } from "@/services/authActions"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"
import { getUserInfo, UserInfoCard } from "./userInfoCard"


export function DashboardContent() {
  const user = useAuthStore((state) => state.user)

  async function handleLogout() {
    try {
      await logoutUser()
      window.location.href = "/"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300 dark:bg-gray-800">
      <Sidebar />

      <main className="flex-1 p-8 ml-16 transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {user && (
            <p className="text-sm text-muted-foreground mt-1">
              Usuario <strong>{user.email}</strong> usando <strong>{user.provider}</strong>
            </p>
          )}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {user && (
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {getUserInfo(user).map((item, index) => (
              <UserInfoCard key={index} label={item.label} value={item.value} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}