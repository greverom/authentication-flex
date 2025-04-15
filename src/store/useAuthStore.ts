// src/store/useAuthStore.ts
import { create } from "zustand"
import { AppUser } from "@/interface/user"

interface AuthState {
  user: AppUser | null
  isHydrated: boolean
  setUser: (user: AppUser) => void
  clearUser: () => void
  setHydrated: (hydrated: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, isHydrated: false }),
  setHydrated: (hydrated) => set({ isHydrated: hydrated }),
}))