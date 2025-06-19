"use client"

import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface NotificationBadgeProps {
  count: number
  onClick?: () => void
}

export default function NotificationBadge({ count, onClick }: NotificationBadgeProps) {
  if (count === 0) return null

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <Bell className="w-5 h-5 text-yellow-400 animate-pulse" />
      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
        {count > 9 ? "9+" : count}
      </Badge>
    </div>
  )
}
