"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

export function useRedirectIfAuthenticated() {
  const router = useRouter()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (hasRedirected.current) return

    const idleCallback = window.requestIdleCallback || function (cb) { setTimeout(cb, 1) }

    idleCallback(() => {
      const provider = localStorage.getItem("auth-provider")
      const supabaseToken = localStorage.getItem("sb-wxbbqgljawjbnjrioibz-auth-token")
      const firebaseToken = localStorage.getItem("firebase-access-token")

      const isLoggedIn =
        (provider === "supabase" && !!supabaseToken) ||
        (provider === "firebase" && !!firebaseToken)

      if (isLoggedIn) {
        hasRedirected.current = true
        router.replace("/dashboard")
      }
    })
  }, [router])
}