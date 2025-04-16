"use client"

import { useEffect, useState } from "react"
import   Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { loginUser } from "@/services/authActions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter,
         CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { getAuthProvider } from "@/services/authProvider"

export function LoginForm() {
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
      ? "bg-gradient-to-br from-yellow-100 to-red-300"
      : "bg-gradient-to-br from-green-100 via-green-300 to-emerald-200"

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
      router.replace("/dashboard")
  
    } catch (err) {
      const error = err as Error
      setError(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`w-full min-h-screen flex items-center justify-center  
                    transition-colors duration-500 ${backgroundClass}`}>
     <Card className="w-full max-w-md mx-auto shadow-xl bg-white/90 dark:bg-black/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl ">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
  
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div className="space-y-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                disabled={isLoading}
                className="placeholder:text-muted-foreground dark:placeholder:text-gray-300"
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
                  className="absolute right-0 top-0 h-full px-3 py-2 dark:bg-text-white hover:bg-transparent dark:hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground dark:text-gray-200" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground dark:text-gray-200" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password "}
                  </span>
                </Button>
              </div>
            </div>
  
            <Button type="submit" className="w-full mt-5 py-5" disabled={isLoading}>
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
          </form>
        </CardContent>
  
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline dark:text-white">
              Registrarse
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}