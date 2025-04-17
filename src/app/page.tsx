"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useRedirectIfAuthenticated } from "@/hooks/guard/useRedirectIfAuthenticated"

export default function HomePage() {
  useRedirectIfAuthenticated()
  const router = useRouter()

  function handleContinue() {
    router.push("/login")
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8 space-y-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center">Bienvenido a Auth Flex</h1>
      <p className="text-sm md:text-lg text-muted-foreground text-center max-w-md">
        Inicia sesión para continuar
      </p>

      <Button onClick={handleContinue} className="w-40 mt-4">
        Iniciar
      </Button>
    </main>
  )
}