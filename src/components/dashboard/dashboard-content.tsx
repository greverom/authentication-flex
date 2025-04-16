"use client"

import { Sidebar } from "@/components/sidebar/sidebar"
import { logoutUser } from "@/services/authActions"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/useAuthStore"

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
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
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
            <div className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-xl font-semibold">🕒 Último ingreso</h2>
              <p className="mt-2 text-muted-foreground">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "No disponible"}
              </p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-xl font-semibold">📧 Email</h2>
              <p className="mt-2 text-muted-foreground">{user.email}</p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-xl font-semibold">🧑 Nombre</h2>
              <p className="mt-2 text-muted-foreground">{user.name ?? "Sin nombre"}</p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-xl font-semibold">🔐 Proveedor</h2>
              <p className="mt-2 text-muted-foreground">{user.provider}</p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-xl font-semibold">📌 Rol</h2>
              <p className="mt-2 text-muted-foreground">{user.role ?? "No disponible"}</p>
            </div>

            <div className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-xl font-semibold">✅ Verificado</h2>
              <p className="mt-2 text-muted-foreground">{user.emailVerified ? "Sí" : "No"}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}