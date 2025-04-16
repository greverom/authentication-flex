"use client"
import { RegisterForm } from "@/components/auth/registerForm";
import { useRedirectIfAuthenticated } from "@/hooks/auth/guard/useRedirectIfAuthenticated";

export default function RegisterPage() {
   useRedirectIfAuthenticated()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <RegisterForm />
    </div>
  )
}