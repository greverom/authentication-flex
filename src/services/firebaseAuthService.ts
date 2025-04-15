import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type User } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"

export const firebaseAuthService = {
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
    return userCredential.user
  },

  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    return userCredential.user
  },

  async logout(): Promise<void> {
    await signOut(firebaseAuth)
  },
}