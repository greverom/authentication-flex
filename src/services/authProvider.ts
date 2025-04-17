import { AuthProvider } from "@/interface/auth-provider"
import { firebaseAuthService } from "./firebaseAuthService"
import { supabaseAuthService } from "./supabaseAuthService"

function getAuthProviderFromEnv(): "firebase" | "supabase" {
  const envProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER
  return envProvider === "firebase" ? "firebase" : "supabase"
}

const selectedProvider = getAuthProviderFromEnv()

const authProvider: AuthProvider =
  selectedProvider === "firebase"
    ? firebaseAuthService
    : supabaseAuthService

export default authProvider