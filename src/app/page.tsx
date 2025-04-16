"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRedirectIfAuthenticated } from "@/hooks/auth/guard/useRedirectIfAuthenticated"

export default function HomePage() {
  useRedirectIfAuthenticated() 
  
  const [provider, setProvider] = useState<"firebase" | "supabase">("firebase")
  const router = useRouter()

  function handleSelect(newProvider: "firebase" | "supabase") {
    setProvider(newProvider)
  }

  function handleContinue() {
    localStorage.setItem("auth-provider", provider)
    router.push("/login")
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-center bg-contain
                    dark:bg-gray-800 text-foreground p-5 space-y-12 ">

      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-60 z-0 blur-sm pointer-events-none"
        style={{ backgroundImage: "url('/imageFondo.png')" }}
        aria-hidden="true"
      />

      <div className="z-10 bg-transparent w-full max-w-md text-center">
        <h1 className="text-2xl md:text-4xl font-bold">Bienvenido to Auth Flex</h1>
        <p className="text-sm md:text-lg text-muted-foreground max-w-md mt-2 dark:text-gray-300">
          Elige tu proveedor de autenticación
        </p>

        <div className="flex flex-col items-center space-y-2 mt-6">
          <div className="flex items-center justify-center space-x-2">
            <Checkbox
              id="firebase"
              checked={provider === "firebase"}
              onCheckedChange={() => handleSelect("firebase")}
            />
            <Label htmlFor="firebase" className="text-md">Firebase</Label>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Checkbox
              id="supabase"
              checked={provider === "supabase"}
              onCheckedChange={() => handleSelect("supabase")}
            />
            <Label htmlFor="supabase" className="text-md">Supabase</Label>
          </div>
        </div>

        <Button onClick={handleContinue} className="w-40 mt-6">
          Iniciar
        </Button>
      </div>
    </main>
  )
}