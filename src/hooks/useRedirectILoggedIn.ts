"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"

export function useRedirectIfLoggedIn() {
  const { user, isHydrated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated) return 
    if (user) {
      router.replace("/dashboard")
    }
  }, [user, isHydrated, router])
}