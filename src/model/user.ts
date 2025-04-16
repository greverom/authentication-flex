export interface AppUser {
  id: string
  email: string
  name?: string
  provider: "firebase" | "supabase"
  role?: string            // Supabase 
  last_sign_in_at?: string // Supabase 
  emailVerified?: boolean
  createdAt?: string       // Firebase
  lastLoginAt?: string     // Firebase
  photoURL?: string        // Firebase 
}