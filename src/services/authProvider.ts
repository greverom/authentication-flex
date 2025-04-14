import { firebaseAuthService } from "./firebaseAuthService"
import { supabaseAuthService } from "./supabaseAuthService"

const authProvider =
  process.env.NEXT_PUBLIC_AUTH_PROVIDER === "firebase"
    ? firebaseAuthService
    : supabaseAuthService

export default authProvider