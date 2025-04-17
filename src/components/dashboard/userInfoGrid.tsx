"use client"

import { AppUser } from "@/interface/appUser"
import { useEffect, useState } from "react"

import {
  User,
  Mail,
  ShieldCheck,
  CheckCircle,
  CalendarCheck,
  Clock,
} from "lucide-react"

interface Props {
  user: AppUser
}

export function UserInfoGrid({ user }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const userInfo = [
    { label: "Nombre", value: user.name ?? "Sin nombre", icon: <User className="w-5 h-5" /> },
    { label: "Email", value: user.email, icon: <Mail className="w-5 h-5" /> },
    { label: "Proveedor", value: user.provider, icon: <ShieldCheck className="w-5 h-5" /> },
    { label: "Verificado", value: user.emailVerified ? "Sí" : "No", icon: <CheckCircle className="w-5 h-5" /> },
    {
      label: "Cuenta creada",
      value: user.createdAt
        ? new Date(user.createdAt).toLocaleString()
        : "No disponible",
      icon: <CalendarCheck className="w-5 h-5" />,
    },
    {
      label: "Último ingreso",
      value: user.last_sign_in_at
        ? new Date(user.last_sign_in_at).toLocaleString()
        : "No disponible",
      icon: <Clock className="w-5 h-5" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">
      {userInfo.map((item, index) => (
        <div
          key={index}
          className="p-6 bg-card rounded-lg border border-border text-foreground transition-colors duration-300 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <h2 className="text-md font-semibold">{item.label}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  )
}