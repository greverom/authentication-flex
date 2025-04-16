import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
import type { AppUser } from "@/model/user"

export const firebaseAuthService = {
  async login(email: string, password: string): Promise<AppUser> {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const user = userCredential.user
    const token = await user.getIdToken()
    localStorage.setItem("firebase-access-token", token)

    return {
      id: user.uid,
      email: user.email ?? "unknown@example.com",
      name: user.displayName ?? undefined,
      provider: "firebase",
      emailVerified: user.emailVerified,
      last_sign_in_at: user.metadata.lastSignInTime ?? undefined,
      createdAt: user.metadata.creationTime ?? undefined,
      lastLoginAt: user.metadata.lastSignInTime ?? undefined,
      photoURL: user.photoURL ?? undefined,
    }
  },

  async register(email: string, password: string): Promise<AppUser> {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    const user = userCredential.user
    localStorage.setItem("firebase-full-user", JSON.stringify(user))

    return {
      id: user.uid,
      email: user.email ?? "unknown@example.com",
      name: user.displayName ?? undefined,
      provider: "firebase",
      emailVerified: user.emailVerified,
      last_sign_in_at: user.metadata.lastSignInTime ?? undefined,
      createdAt: user.metadata.creationTime ?? undefined,
      lastLoginAt: user.metadata.lastSignInTime ?? undefined,
      photoURL: user.photoURL ?? undefined,
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("firebase-access-token")
    localStorage.removeItem("auth-store")
    await signOut(firebaseAuth)
  }
}