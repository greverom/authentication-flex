// src/services/authProvider.ts
import { firebaseAuthService } from "./firebaseAuthService"
import { supabaseAuthService } from "./supabaseAuthService"
import type { AuthProvider } from "@/interface/auth-provider"

function getAuthProviderFromStorage(): "firebase" | "supabase" {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("auth-provider")
    if (stored === "firebase" || stored === "supabase") {
      return stored
    }
  }

  const envProvider = process.env.NEXT_PUBLIC_AUTH_PROVIDER
  return envProvider === "firebase" ? "firebase" : "supabase"
}

const selectedProvider = getAuthProviderFromStorage()

const authProvider: AuthProvider =
  selectedProvider === "firebase"
    ? firebaseAuthService
    : supabaseAuthService

export default authProvider