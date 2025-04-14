import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
  
  export const firebaseAuthService = {
    async login(email: string, password: string) {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
      return userCredential.user
    },
  
    async register(email: string, password: string) {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
      return userCredential.user
    },
  
    async logout() {
      await signOut(firebaseAuth)
    },
  }