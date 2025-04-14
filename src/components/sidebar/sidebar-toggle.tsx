import type * as React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  expanded: boolean
}

export function SidebarToggle({ expanded, className, ...props }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 rounded-full transition-colors", className)}
      {...props}
    >
      <ChevronLeft
        className={cn(
          "h-4 w-4 transition-transform duration-300 ease-in-out",
          !expanded && "rotate-180"
        )}
      />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}