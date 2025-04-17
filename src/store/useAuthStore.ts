import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AppUser } from "@/interface/appUser"

interface AuthState {
  user: AppUser | null
  setUser: (user: AppUser | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-store", 
      
    }
  )
)