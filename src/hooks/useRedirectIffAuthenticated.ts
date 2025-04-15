"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useRedirectIfAuthenticated() {
  const router = useRouter()

  useEffect(() => {
    const provider = localStorage.getItem("auth-provider")
    const supabaseToken = localStorage.getItem("sb-wxbbqgljawjbnjrioibz-auth-token")
    const firebaseUser = localStorage.getItem("firebase:authUser")

    const isLoggedIn =
      (provider === "supabase" && !!supabaseToken) ||
      (provider === "firebase" && !!firebaseUser)

    if (isLoggedIn) {
      router.replace("/dashboard")
    }
  }, [router])
}