"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, Music, Headphones, PenTool, Zap } from "lucide-react"
import { useGame } from "../context/game-context"

export default function PracticeSystem() {
  const { gameState, updateSkill, spendPracticePoints } = useGame()

  const practiceTypes = [
    {
      id: "livePerformance",
      name: "Live Performance",
      icon: Mic,
      description: "Improve stage presence and crowd interaction",
      cost: 2,
      skillGain: 0.8,
    },
    {
      id: "voice",
      name: "Voice Training",
      icon: Music,
      description: "Enhance vocal range and technique",
      cost: 2,
      skillGain: 1.0,
    },
    {
      id: "production",
      name: "Music Production",
      icon: Headphones,
      description: "Learn beats, mixing, and sound design",
      cost: 2,
      skillGain: 0.7,
    },
    {
      id: "writing",
      name: "Songwriting",
      icon: PenTool,
      description: "Craft better lyrics and melodies",
      cost: 2,
      skillGain: 0.9,
    },
  ]

  const handlePractice = (practiceType: (typeof practiceTypes)[0]) => {
    if (gameState.practicePoints >= practiceType.cost) {
      spendPracticePoints(practiceType.cost)
      updateSkill(practiceType.id as keyof typeof gameState.skills, practiceType.skillGain)
    }
  }

  return (
    <div className="space-y-4">
      {/* Practice Points Header */}
      <Card className="bg-black/20 border-white/20 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">Practice Points</span>
            </div>
            <span className="text-lg font-bold">{gameState.practicePoints}/100</span>
          </div>
          <Progress value={gameState.practicePoints} className="h-3" />
          <p className="text-xs opacity-80 mt-2">Resets every week</p>
        </CardContent>
      </Card>

      {/* Practice Options */}
      <div className="space-y-3">
        {practiceTypes.map((practice) => {
          const Icon = practice.icon
          const currentSkill = gameState.skills[practice.id as keyof typeof gameState.skills]
          const canPractice = gameState.practicePoints >= practice.cost

          return (
            <Card key={practice.id} className="bg-black/20 border-white/20 text-white">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold">{practice.name}</h3>
                      <Badge variant="secondary" className="bg-white/10 text-white">
                        Level {currentSkill.toFixed(1)}
                      </Badge>
                    </div>

                    <p className="text-sm opacity-80 mb-3">{practice.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="opacity-80">Cost: </span>
                        <span className="font-bold">{practice.cost} points</span>
                        <span className="opacity-80 ml-2">Gain: </span>
                        <span className="font-bold text-green-400">+{practice.skillGain}</span>
                      </div>

                      <Button
                        onClick={() => handlePractice(practice)}
                        disabled={!canPractice}
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                      >
                        Practice
                      </Button>
                    </div>

                    <div className="mt-2">
                      <Progress value={currentSkill} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tips */}
      <Card className="bg-black/20 border-white/20 text-white">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">💡 Practice Tips</h3>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Higher skills improve song ratings</li>
            <li>• Balanced skills unlock collaborations</li>
            <li>• Genre-specific skills boost streaming</li>
            <li>• Practice consistently for best results</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
