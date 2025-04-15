import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuthStore } from "@/store/useAuthStore"

export function useSupabaseSession() {
  const setUser = useAuthStore((state) => state.setUser)
  const setHydrated = useAuthStore((state) => state.setHydrated)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      if (user) {
        setUser({
          id: user.id,
          email: user.email ?? "unknown@example.com",
          name: user.user_metadata?.display_name ?? undefined,
          provider: "supabase",
        })
      }

      setHydrated(true) 
    }

    fetchUser()
  }, [setUser, setHydrated])
}