"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { SidebarItem } from "./sidebar-item"
import { SidebarToggle } from "./sidebar-toggle"

import {
  Home,
  BarChart2,
  Users,
  FileText,
  Settings,
  Bell,
  LogIn,
} from "lucide-react"
import { ThemeToggle } from "../theme/theme-toggle"

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
}

export function Sidebar({ className, ...props }: SidebarProps) {
  const [expanded, setExpanded] = React.useState(false)

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  const items = [
    { icon: Home, label: "Dashboard", href: "#" },
    { icon: BarChart2, label: "Analytics", href: "#" },
    { icon: Users, label: "Customers", href: "#" },
    { icon: FileText, label: "Documents", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: LogIn, label: "Login", href: "/login" }
  ]

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 flex flex-col h-screen bg-background border-r border-border transition-all duration-300 ease-in-out",
        expanded ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between p-4">
        <div
          className={cn(
            "flex items-center",
            expanded ? "justify-between w-full" : "justify-center"
          )}
        >
          {expanded && (
            <span className="text-xl whitespace-nowrap overflow-hidden font-semibold transition-opacity duration-200">
              Acme Inc
            </span>
          )}
          <SidebarToggle expanded={expanded} onClick={toggleSidebar} />
        </div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
              expanded={expanded}
            />
          ))}
        </nav>
      </div>

      <div className="mt-auto p-2 space-y-2 border-t border-border">
        <SidebarItem
          icon={Settings}
          label="Settings"
          href="#"
          expanded={expanded}
        />
       <div
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
            "hover:bg-accent hover:text-accent-foreground",
            "dark:hover:bg-gray-600",
            expanded ? "justify-start" : "justify-center"
          )}
        >
          <ThemeToggle expanded={expanded} />
        </div>
      </div>
    </div>
  )
}