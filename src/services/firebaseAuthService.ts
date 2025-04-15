import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"

export const firebaseAuthService = {
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
    const user = userCredential.user
    const token = await user.getIdToken()
    localStorage.setItem("firebase-access-token", token)

    return user
  },

  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    const user = userCredential.user

    localStorage.setItem("firebase-full-user", JSON.stringify(user))

    return user
  },

  async logout(): Promise<void> {
    localStorage.removeItem("firebase-access-token")
    localStorage.removeItem("auth-store") 
    await signOut(firebaseAuth)
  }
}