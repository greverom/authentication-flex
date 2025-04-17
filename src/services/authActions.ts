import { useAuthStore } from "@/store/useAuthStore"
import authProvider from "./authProvider"
import { AppUser } from "@/interface/appUser"

const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER

export async function loginUser(email: string, password: string) {
  if (provider === "supabase") {
    throw new Error("Supabase login is handled via server actions. Use form action={login} instead.")
  }

  const user = await authProvider.login(email, password)
  console.log("usuario autenticado:", user)
  return user as AppUser
}

export async function registerUser(email: string, password: string) {
  if (provider === "supabase") {
    throw new Error("Supabase register is handled via server actions. Use form action={signup} instead.")
  }

  return authProvider.register(email, password)
}

export async function logoutUser() {
  if (provider === "supabase") {
    throw new Error("Supabase logout is handled via server action. Use server logout() instead.")
  }

  await authProvider.logout()

  const setUser = useAuthStore.getState().setUser
  setUser(null)
}