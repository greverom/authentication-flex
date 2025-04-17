// src/store/useAuthStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AppUser } from "@/interface/appUser"

interface AuthState {
  user: AppUser | null
  setUser: (user: AppUser | null) => void
  hasHydrated: boolean
  setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "auth-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)