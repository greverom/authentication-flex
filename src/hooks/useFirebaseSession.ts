
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
import { useAuthStore } from "@/store/useAuthStore"

export function useFirebaseSession() {
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser({
          id: user.uid,
          email: user.email ?? "unknown@example.com",
          name: user.displayName ?? undefined,
          provider: "firebase",
        })
      }
    })

    return () => unsubscribe()
  }, [setUser])
}