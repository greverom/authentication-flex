"use client"

import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
import { useAuthStore } from "@/store/useAuthStore"

export function useFirebaseSession() {
  const { user, isHydrated, setUser, clearUser, setHydrated } = useAuthStore()

  useEffect(() => {

    if (isHydrated && user) return

    // console.log("useFirebaseSession montado")

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email ?? "unknown@example.com",
          name: user.displayName ?? undefined,
          provider: "firebase",
        })
      } else {
        clearUser()
      }

      setHydrated()
    })

    return () => unsubscribe()
  }, [user, isHydrated, setUser, clearUser, setHydrated])
}