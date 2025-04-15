
export interface AppUser {
    id: string
    email: string
    name?: string
    provider: "firebase" | "supabase"
  }