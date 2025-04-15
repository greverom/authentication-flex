"use client"

import { LoginForm } from "@/components/auth/loginForm"
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIffAuthenticated"

export default function LoginPage() {
  useRedirectIfAuthenticated()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <LoginForm />
    </div>
  )
}