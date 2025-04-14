import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
  expanded: boolean
}

export function SidebarItem({ icon: Icon, label, href, expanded }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        "dark:hover:bg-gray-600"
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
    </Link>
  )
}