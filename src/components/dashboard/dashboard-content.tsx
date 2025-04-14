"use client"

import { Sidebar } from "@/components/sidebar/sidebar"
import { logoutUser } from "@/services/authActions"
import { Button } from "@/components/ui/button"

export function DashboardContent() {
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
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <p className="text-muted-foreground">
          Welcome to your dashboard. Toggle the sidebar using the button in the top left.
        </p>

        <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-6 bg-card rounded-lg border border-border text-foreground transition-colors duration-300"
            >
              <h2 className="text-xl font-semibold">Card {i + 1}</h2>
              <p className="mt-2 text-muted-foreground">
                This is a sample card in the dashboard.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}