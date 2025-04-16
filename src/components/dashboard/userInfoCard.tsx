"use client"

import { AppUser } from "@/model/user"

interface Props {
  label: string
  value: string
}

export function getUserInfo(user: AppUser) {
  return [
    {
      label: "🕒 Último ingreso",
      value: user.last_sign_in_at
        ? new Date(user.last_sign_in_at).toLocaleString()
        : "No disponible",
    },
    {
      label: "📧 Email",
      value: user.email,
    },
    {
      label: "🧑 Nombre",
      value: user.name ?? "Sin nombre",
    },
    {
      label: "🔐 Proveedor",
      value: user.provider,
    },
    {
      label: "📌 Rol",
      value: user.role ?? "No disponible",
    },
    {
      label: "✅ Verificado",
      value: user.emailVerified ? "Sí" : "No",
    },
  ]
}

export function UserInfoCard({ label, value }: Props) {
  return (
    <div className="p-6 bg-card rounded-lg border border-border dark:bg-gray-700">
      <h2 className="text-xl font-semibold">{label}</h2>
      <p className="mt-2 text-muted-foreground">{value}</p>
    </div>
  )
}