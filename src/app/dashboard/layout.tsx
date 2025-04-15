"use client"

import { useSessionByProvider } from "@/hooks/useSessionByProvider"
import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isHydrated } = useAuthStore()
  const router = useRouter()

  useSessionByProvider() 

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/login")
    }
  }, [isHydrated, user, router])

  if (!isHydrated) {
    return <div className="p-10 text-center">Verificando sesión...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}