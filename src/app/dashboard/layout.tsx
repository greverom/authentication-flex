"use client"

import { useSupabaseSession } from "@/hooks/useSupabaseSession"
import { useAuthStore } from "@/store/useAuthStore"
import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isHydrated } = useAuthStore()
  const router = useRouter()

  useSupabaseSession()

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/login")
    }
  }, [user, router, isHydrated])

  if (!isHydrated) {
    return <div className="p-10 text-center">Verificando sesión...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}