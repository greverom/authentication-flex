
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"

export function useRedirectIfAuthenticated() {
  const user = useAuthStore((s) => s.user)
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const router = useRouter()

  useEffect(() => {
    if (!hasHydrated) return 

    if (user) {
      router.replace("/dashboard")
    }
  }, [user, hasHydrated, router])
}