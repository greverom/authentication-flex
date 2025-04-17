"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { loginUser } from "@/services/authActions"
import { login } from "@/server/auth/login/actions"
import { useRouter } from "next/navigation"

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
import { useAuthStore } from "@/store/useAuthStore"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER ?? "supabase"
  const setUser = useAuthStore((s) => s.setUser)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
  
    try {
      setIsLoading(true)
      setError(null)
      const user = await loginUser(email, password)
      setUser(user)
  
      router.push("/dashboard")
    } catch (err) {
      const error = err as Error
      setError(error.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const formContent = (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>

        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full mt-5" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando...
          </>
        ) : (
          "Iniciar Sesión"
        )}
      </Button>

      {error && (
        <Alert className="p-0 border-none bg-transparent shadow-none">
          <AlertDescription className="text-sm text-red-500 p-0">{error}</AlertDescription>
        </Alert>
      )}
    </>
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Estás usando <strong>{provider}</strong> como proveedor
        </CardDescription>
      </CardHeader>

      <CardContent>
        {provider === "supabase" ? (
          <form action={login} className="space-y-4">
            {formContent}
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formContent}
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Registrarse
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}