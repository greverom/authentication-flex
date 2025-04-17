export interface AppUser {
  id: string
  name?: string | null
  email: string
  provider: string
  emailVerified: boolean
  createdAt?: string
  last_sign_in_at?: string | null
  lastLoginAt?: string | null
  photoURL?: string | null
  role?: string | null
}