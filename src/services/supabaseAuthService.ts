import { supabase } from "@/lib/supabase"

export const supabaseAuthService = {
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) throw new Error(error?.message || "No user returned")

    return data.user
  },

  async register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error || !data.user) throw new Error(error?.message || "No user returned")

    return data.user
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)
  },
}