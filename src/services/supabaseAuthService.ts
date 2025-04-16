import { supabase } from "@/lib/supabase"
import type { AppUser } from "@/model/user"

export const supabaseAuthService = {
  async login(email: string, password: string): Promise<AppUser> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    const user = data.user
    if (error || !user) throw new Error(error?.message || "No user returned")

    return {
      id: user.id,
      email: user.email ?? "unknown@example.com",
      name: user.user_metadata?.display_name ?? undefined,
      provider: "supabase",
      role: user.user_metadata?.role ?? "usuario",
      emailVerified: user.user_metadata?.email_verified ?? false,
      last_sign_in_at: user.last_sign_in_at,
    }
  },

  async register(email: string, password: string): Promise<AppUser> {
    const { data, error } = await supabase.auth.signUp({ email, password })
    const user = data.user
    if (error || !user) throw new Error(error?.message || "No user returned")

    return {
      id: user.id,
      email: user.email ?? "unknown@example.com",
      name: user.user_metadata?.display_name ?? undefined,
      provider: "supabase",
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("auth-store") 
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
  },
}