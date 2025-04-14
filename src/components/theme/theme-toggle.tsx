"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface ThemeToggleProps {
  className?: string
  expanded?: boolean
}

export function ThemeToggle({ className, expanded = true }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null 
  }

  const Icon = theme === "dark" ? Moon : Sun
  const label = theme === "dark" ? "Light mode" : "Dark mode"

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "flex items-center text-sm font-medium rounded-md hover:text-accent-foreground transition-all duration-200 w-full",
        className
      )}
    >
      <div className="w-5 min-w-[20px] flex justify-center">
        <Icon className="h-5 w-5" />
      </div>

      <span
        className={cn(
          "ml-3 transition-opacity duration-200 overflow-hidden whitespace-nowrap",
          expanded ? "opacity-100" : "opacity-0"
        )}
      >
        {label}
      </span>

      {!expanded && <span className="sr-only">{label}</span>}
    </button>
  )
}