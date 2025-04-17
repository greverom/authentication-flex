import { AppUser } from "@/interface/appUser"
import { type User } from "@supabase/supabase-js"


export const mapSupabaseUserToAppUser = (user: User): AppUser => {
  return {
    id: user.id,
    name: user.user_metadata?.name ?? null,
    email: user.email!,
    provider: "supabase",
    emailVerified: !!user.email_confirmed_at,
    createdAt: user.created_at,
    last_sign_in_at: user.last_sign_in_at ?? null,
    lastLoginAt: null,
    photoURL: user.user_metadata?.avatar_url ?? null,
    role: user.role ?? null,
  }
}