"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function HomePage() {
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8 space-y-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center">Bienvenido to Auth Flex</h1>
      <p className="text-sm md:text-lg text-muted-foreground text-center max-w-md">
        Elige tu proveedor de autenticación
      </p>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="firebase"
            checked={provider === "firebase"}
            onCheckedChange={() => handleSelect("firebase")}
          />
          <Label htmlFor="firebase" className="text-md">Firebase</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="supabase"
            checked={provider === "supabase"}
            onCheckedChange={() => handleSelect("supabase")}
          />
          <Label htmlFor="supabase" className="text-md">Supabase</Label>
        </div>
      </div>

      <Button onClick={handleContinue} className="w-40 mt-4">
        Iniciar
      </Button>
    </main>
  )
}