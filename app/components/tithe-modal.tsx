"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign, Sparkles, X } from "lucide-react"
import { useGame } from "../context/game-context"

export default function TitheModal() {
  const { gameState, setShowTitheModal, updateMorale, setGameState } = useGame()
  const [decision, setDecision] = useState<"tithe" | "skip" | null>(null)

  const titheAmount = Math.floor(gameState.weeklyEarnings * 0.1)

  const handleTithe = () => {
    setDecision("tithe")
    updateMorale(15)
    setGameState((prev) => ({
      ...prev,
      earnings: prev.earnings - titheAmount,
    }))

    setTimeout(() => {
      setShowTitheModal(false)
      setDecision(null)
    }, 2000)
  }

  const handleSkip = () => {
    setDecision("skip")
    updateMorale(-10)

    // Random chance of setback
    if (Math.random() < 0.3) {
      const fansLost = Math.floor(gameState.fans * 0.05)
      setGameState((prev) => ({
        ...prev,
        fans: Math.max(0, prev.fans - fansLost),
      }))
    }

    setTimeout(() => {
      setShowTitheModal(false)
      setDecision(null)
    }, 2000)
  }

  if (decision) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-sm bg-black/90 border-white/20 text-white">
          <CardContent className="p-6 text-center">
            {decision === "tithe" ? (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">Blessed!</h3>
                <p className="text-sm opacity-80">Your faithfulness has been noted. Good things are coming your way!</p>
                <Badge className="mt-3 bg-green-500/20 text-green-400">+15 Spiritual Morale</Badge>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-400">Skipped</h3>
                <p className="text-sm opacity-80">You chose to keep your earnings. Be mindful of the consequences.</p>
                <Badge className="mt-3 bg-red-500/20 text-red-400">-10 Spiritual Morale</Badge>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm bg-black/90 border-white/20 text-white">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl">Weekly Tithe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm opacity-80 mb-2">This week you earned:</p>
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-400">
              <DollarSign className="w-6 h-6" />
              {gameState.weeklyEarnings.toLocaleString()}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="text-sm opacity-80 mb-1">Suggested tithe (10%):</p>
            <div className="flex items-center justify-center gap-1 text-lg font-bold">
              <DollarSign className="w-5 h-5" />
              {titheAmount.toLocaleString()}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleTithe}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Heart className="w-4 h-4 mr-2" />
              Pay Tithe (+15 Morale)
            </Button>

            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Skip This Week (-10 Morale)
            </Button>
          </div>

          <div className="text-xs opacity-60 text-center">
            <p>High morale brings blessings: viral hits, label offers, fan boosts</p>
            <p>Low morale may trigger setbacks</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
