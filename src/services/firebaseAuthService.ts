import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
import type { AppUser } from "@/interface/user" 

export const firebaseAuthService = {
  async login(email: string, password: string): Promise<AppUser> {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const user = userCredential.user

    return {
      id: user.uid,
      email: user.email ?? "unknown@example.com",
      name: user.displayName ?? undefined,
      provider: "firebase",
    }
  },

  async register(email: string, password: string): Promise<AppUser> {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    const user = userCredential.user

    return {
      id: user.uid,
      email: user.email ?? "unknown@example.com",
      name: user.displayName ?? undefined,
      provider: "firebase",
    }
  },

  async logout(): Promise<void> {
    await signOut(firebaseAuth)
  },
}