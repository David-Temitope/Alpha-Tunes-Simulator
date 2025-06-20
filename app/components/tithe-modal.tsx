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

  // Motivational quotes and scriptures
  const motivationalQuotes = [
    {
      text: "Give, and it will be given to you. A good measure, pressed down, shaken together and running over.",
      reference: "Luke 6:38",
    },
    {
      text: "Honor the Lord with your wealth, with the firstfruits of all your crops.",
      reference: "Proverbs 3:9",
    },
    {
      text: "Bring the whole tithe into the storehouse, that there may be food in my house.",
      reference: "Malachi 3:10",
    },
    {
      text: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion.",
      reference: "2 Corinthians 9:7",
    },
    {
      text: "God loves a cheerful giver.",
      reference: "2 Corinthians 9:7",
    },
    {
      text: "Trust in the Lord with all your heart and lean not on your own understanding.",
      reference: "Proverbs 3:5",
    },
    {
      text: "For where your treasure is, there your heart will be also.",
      reference: "Matthew 6:21",
    },
    {
      text: "The blessing of the Lord brings wealth, without painful toil for it.",
      reference: "Proverbs 10:22",
    },
    {
      text: "Commit to the Lord whatever you do, and he will establish your plans.",
      reference: "Proverbs 16:3",
    },
    {
      text: "And my God will meet all your needs according to the riches of his glory in Christ Jesus.",
      reference: "Philippians 4:19",
    },
  ]

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

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
    }, 3000)
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
    }, 3000)
  }

  if (decision) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-sm bg-gradient-to-br from-blue-950 to-purple-950 border-blue-400/30 text-white shadow-2xl">
          <CardContent className="p-6 text-center">
            {decision === "tithe" ? (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">Blessed!</h3>
                <p className="text-sm text-blue-200 mb-3">
                  Your faithfulness has been noted. Good things are coming your way!
                </p>
                <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-400/20 mb-3">
                  <p className="text-xs italic text-blue-200">"{randomQuote.text}"</p>
                  <p className="text-xs text-yellow-400 mt-1">- {randomQuote.reference}</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30">+15 Spiritual Morale</Badge>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-400">Skipped</h3>
                <p className="text-sm text-blue-200 mb-3">
                  You chose to keep your earnings. Be mindful of the consequences.
                </p>
                <div className="p-3 bg-red-900/20 rounded-lg border border-red-400/20 mb-3">
                  <p className="text-xs text-red-200">
                    "Remember, God loves a cheerful giver. Consider your heart's posture."
                  </p>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-400/30">-10 Spiritual Morale</Badge>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm bg-gradient-to-br from-blue-950 to-purple-950 border-blue-400/30 text-white shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl text-white">Weekly Tithe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-blue-200 mb-2">This week you earned:</p>
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-400">
              <DollarSign className="w-6 h-6" />
              {gameState.weeklyEarnings.toLocaleString()}
            </div>
          </div>

          <div className="bg-blue-900/30 rounded-lg p-4 text-center border border-blue-400/20">
            <p className="text-sm text-blue-200 mb-1">Suggested tithe (10%):</p>
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
              <DollarSign className="w-5 h-5" />
              {titheAmount.toLocaleString()}
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-400/20">
            <p className="text-xs italic text-blue-200 text-center">"{randomQuote.text}"</p>
            <p className="text-xs text-yellow-400 text-center mt-1">- {randomQuote.reference}</p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={handleTithe}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            >
              <Heart className="w-4 h-4 mr-2" />
              Pay Tithe (+15 Morale)
            </Button>

            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full border-blue-400/30 text-blue-200 hover:bg-blue-900/30 bg-transparent"
            >
              Skip This Week (-10 Morale)
            </Button>
          </div>

          <div className="text-xs text-blue-300 text-center">
            <p>High morale brings blessings: viral hits, label offers, fan boosts</p>
            <p>Low morale may trigger setbacks</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
