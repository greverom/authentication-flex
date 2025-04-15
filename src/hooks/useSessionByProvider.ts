import { useFirebaseSession } from "./useFirebaseSession"
import { useSupabaseSession } from "./useSupabaseSession"

export function useSessionByProvider() {
  useFirebaseSession()
  useSupabaseSession()
}