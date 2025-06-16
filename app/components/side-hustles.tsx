"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Clock, Zap, DollarSign, TrendingUp, AlertTriangle, Home } from "lucide-react"
import { useGame } from "../context/game-context"

export default function SideHustles() {
  const { gameState, startSideHustle } = useGame()

  const hustleIcons = {
    waiter: "🍽️",
    "studio-intern": "🎧",
    "freelance-designer": "🎨",
    "delivery-rider": "🚴",
    "open-mic": "🎤",
    "music-teacher": "🎼",
  }

  const hustleColors = {
    waiter: "from-orange-500 to-red-500",
    "studio-intern": "from-purple-500 to-pink-500",
    "freelance-designer": "from-blue-500 to-cyan-500",
    "delivery-rider": "from-green-500 to-teal-500",
    "open-mic": "from-yellow-500 to-orange-500",
    "music-teacher": "from-indigo-500 to-purple-500",
  }

  const canWork = (hustle: (typeof gameState.sideHustles)[0]) => {
    return (
      !hustle.active &&
      gameState.timeSlots >= hustle.timeSlots &&
      gameState.energy >= hustle.energyCost &&
      hustle.unlocked
    )
  }

  const handleStartHustle = (hustleId: string) => {
    startSideHustle(hustleId)
  }

  const totalWeeklyExpenses = gameState.expenses.rent + gameState.expenses.food + gameState.expenses.transportation

  return (
    <div className="space-y-4">
      {/* Resources Header */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-400">
                <Clock className="w-5 h-5" />
                {gameState.timeSlots}
              </div>
              <p className="text-xs opacity-80">Time Slots</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
                <Zap className="w-5 h-5" />
                {gameState.energy}
              </div>
              <p className="text-xs opacity-80">Energy</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-400">
                <DollarSign className="w-5 h-5" />
                {gameState.earnings.toLocaleString()}
              </div>
              <p className="text-xs opacity-80">Balance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Expenses */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-red-400" />
            Weekly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Rent:</span>
            <span className="font-bold text-red-400">${gameState.expenses.rent}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Food:</span>
            <span className="font-bold text-red-400">${gameState.expenses.food}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Transportation:</span>
            <span className="font-bold text-red-400">${gameState.expenses.transportation}</span>
          </div>
          <hr className="border-white/20" />
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span className="text-red-400">${totalWeeklyExpenses}</span>
          </div>
          {gameState.earnings < totalWeeklyExpenses && (
            <div className="flex items-center gap-2 p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Need more income to cover expenses!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Side Hustles */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-400" />
            Available Side Hustles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-80 mb-4">Work these jobs to earn money before your music pays the bills!</p>
        </CardContent>
      </Card>

      {/* Hustle Cards */}
      <div className="space-y-3">
        {gameState.sideHustles.map((hustle) => {
          const canStart = canWork(hustle)
          const isActive = hustle.active

          return (
            <Card
              key={hustle.id}
              className={`bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                isActive ? "ring-2 ring-green-400" : ""
              } ${!canStart && !isActive ? "opacity-60" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Hustle Icon */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${hustleColors[hustle.id as keyof typeof hustleColors]} rounded-xl flex items-center justify-center shadow-lg text-2xl`}
                  >
                    {hustleIcons[hustle.id as keyof typeof hustleIcons]}
                  </div>

                  {/* Hustle Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{hustle.title}</h3>
                        <p className="text-sm opacity-80">{hustle.description}</p>
                      </div>
                      {isActive && <Badge className="bg-green-500/20 text-green-400">Active</Badge>}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center p-2 bg-white/10 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-sm font-bold text-green-400">
                          <DollarSign className="w-4 h-4" />${hustle.weeklyPay.min}-${hustle.weeklyPay.max}
                        </div>
                        <p className="text-xs opacity-80">Weekly Pay</p>
                      </div>
                      <div className="text-center p-2 bg-white/10 rounded-lg">
                        <div className="flex items-center justify-center gap-1 text-sm font-bold text-blue-400">
                          <Clock className="w-4 h-4" />
                          {hustle.timeSlots} slots
                        </div>
                        <p className="text-xs opacity-80">Time Cost</p>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span>-{hustle.energyCost} Energy</span>
                        </div>
                        {hustle.skillGain && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-purple-400" />
                            <span>
                              +{hustle.skillGain.amount} {hustle.skillGain.skill}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleStartHustle(hustle.id)}
                      disabled={!canStart || isActive}
                      className={`w-full bg-gradient-to-r ${hustleColors[hustle.id as keyof typeof hustleColors]} hover:opacity-80 disabled:opacity-50 shadow-lg`}
                    >
                      {isActive ? "Working..." : canStart ? "Start Job" : "Can't Work"}
                    </Button>

                    {!canStart && !isActive && (
                      <p className="text-xs opacity-60 mt-2 text-center">
                        {gameState.timeSlots < hustle.timeSlots
                          ? "Not enough time slots"
                          : gameState.energy < hustle.energyCost
                            ? "Not enough energy"
                            : "Requirements not met"}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Jobs Summary */}
      {gameState.sideHustles.some((h) => h.active) && (
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Active Jobs This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gameState.sideHustles
                .filter((h) => h.active)
                .map((hustle) => (
                  <div key={hustle.id} className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <span className="font-medium">{hustle.title}</span>
                    <span className="text-green-400 font-bold">
                      ${hustle.weeklyPay.min}-${hustle.weeklyPay.max}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">💼 Hustle Tips</h3>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Balance work with music practice and social media</li>
            <li>• Some jobs provide skill bonuses and networking opportunities</li>
            <li>• Higher-paying jobs usually require more time and energy</li>
            <li>• Post about your hustle on social media for authenticity</li>
            <li>• Once your music income grows, you can quit these jobs</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
