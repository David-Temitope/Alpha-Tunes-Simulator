"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, X, Gift } from "lucide-react"

interface AchievementNotificationProps {
  achievements: string[]
  onDismiss: (achievementId: string) => void
}

export default function AchievementNotification({ achievements, onDismiss }: AchievementNotificationProps) {
  const [visible, setVisible] = useState<string[]>([])

  useEffect(() => {
    achievements.forEach((id, index) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, id])
      }, index * 500)
    })
  }, [achievements])

  const handleDismiss = (achievementId: string) => {
    setVisible((prev) => prev.filter((id) => id !== achievementId))
    setTimeout(() => onDismiss(achievementId), 300)
  }

  if (visible.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {visible.map((achievementId) => (
        <Card
          key={achievementId}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 text-white shadow-2xl animate-in slide-in-from-right-full duration-500"
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-white/20 text-white">Achievement Unlocked!</Badge>
                  <Button
                    onClick={() => handleDismiss(achievementId)}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <h4 className="font-bold text-sm">Achievement Name</h4>
                <p className="text-xs opacity-90">Achievement description here</p>
                <div className="flex items-center gap-1 mt-2">
                  <Gift className="w-3 h-3" />
                  <span className="text-xs">Reward claimed!</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
