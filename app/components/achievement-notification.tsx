"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, X } from "lucide-react"
import type { Achievement } from "../../lib/achievements"

interface AchievementNotificationProps {
  achievement: Achievement
  onClose: () => void
  onClaim: () => void
}

export default function AchievementNotification({ achievement, onClose, onClaim }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClaim = () => {
    onClaim()
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-400 shadow-2xl max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-200" />
              <h3 className="font-bold text-white">Achievement Unlocked!</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false)
                setTimeout(onClose, 300)
              }}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{achievement.icon}</div>
            <div>
              <h4 className="font-bold text-white">{achievement.title}</h4>
              <p className="text-sm text-yellow-100">{achievement.description}</p>
            </div>
          </div>

          {achievement.reward && (
            <div className="bg-white/20 rounded-lg p-2 mb-3">
              <p className="text-xs text-yellow-100 mb-1">Reward:</p>
              <p className="text-sm font-semibold text-white">
                {achievement.reward.type === "money" && `$${achievement.reward.amount.toLocaleString()}`}
                {achievement.reward.type === "fans" && `${achievement.reward.amount.toLocaleString()} fans`}
                {achievement.reward.type === "skill" &&
                  `+${achievement.reward.amount} ${achievement.reward.skill} skill`}
              </p>
            </div>
          )}

          <Button onClick={handleClaim} className="w-full bg-white text-orange-600 hover:bg-yellow-100 font-semibold">
            Claim Reward
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
