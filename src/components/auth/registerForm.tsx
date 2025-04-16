"use client"

import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { registerUser } from "@/services/authActions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { toast } from "sonner"
import { getAuthProvider } from "@/services/authProvider"

export function RegisterForm() {
  const [authProvider, setAuthProvider] = useState<"firebase" | "supabase">("supabase")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

   useEffect(() => {
      const provider = getAuthProvider()
      setAuthProvider(provider)
    }, [])
  
    const backgroundClass =
      authProvider === "firebase"
        ? "bg-gradient-to-br from-yellow-200 to-red-300"
        : "bg-gradient-to-br from-green-100 via-green-300 to-emerald-200"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      setIsLoading(true)
      setError(null)
    
      const user = await registerUser(email, password)
      setUser(user)
      toast.success("Cuenta creada. Inicia sesión para continuar.")
      router.push("/login")
    } catch (err) {
      const error = err as Error
      setError(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`w-full min-h-screen flex items-center justify-center  
      transition-colors duration-700 ${backgroundClass}`}>
    <Card className="w-full max-w-md mx-auto dark:bg-black/30 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Fill in your details to register</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="Your full name" autoComplete="name"  className="placeholder:text-muted-foreground dark:placeholder:text-gray-300" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email"  className="placeholder:text-muted-foreground dark:placeholder:text-gray-300" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password"/>
              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)} >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? "Hide" : "Show"} password</span>
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full mt-5 py-5" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registrando...
              </>
            ) : (
              "Crear Cuenta"
            )}
          </Button>

          {error && (
            <Alert className="p-0 border-none bg-transparent shadow-none">
              <AlertDescription className="text-sm text-red-500 p-0">{error}</AlertDescription>
            </Alert>
          )}

        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline dark:text-white">
            Iniciar Sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}