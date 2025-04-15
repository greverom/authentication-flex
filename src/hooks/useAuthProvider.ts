"use client"

import { useState, useEffect } from "react"

export function useAuthProvider() {
  const [provider, setProvider] = useState<"firebase" | "supabase" | null>(null)

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-provider="))
      ?.split("=")[1]

    if (cookieValue === "firebase" || cookieValue === "supabase") {
      setProvider(cookieValue)
    }
  }, [])

  return provider
}