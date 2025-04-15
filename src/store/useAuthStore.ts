
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AppUser } from "@/interface/user"

interface AuthState {
  user: AppUser | null
  isHydrated: boolean
  setUser: (user: AppUser) => void
  clearUser: () => void
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-store", 
      partialize: (state) => ({ user: state.user }), 
    }
  )
)