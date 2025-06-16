"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Heart, Star, TrendingUp, Clock, Music, Zap, Briefcase, BarChart3 } from "lucide-react"
import { useGame } from "../context/game-context"

export default function Dashboard() {
  const { gameState, nextWeek } = useGame()

  const skillAverage = Object.values(gameState.skills).reduce((a, b) => a + b, 0) / 6
  const unlockedPlatforms = gameState.socialPlatforms.filter((p) => p.unlocked).length
  const activeHustles = gameState.sideHustles.filter((h) => h.active).length
  const portfolioValue = gameState.tradeItems.reduce((total, item) => total + item.owned * item.currentPrice, 0)

  return (
    <div className="space-y-4">
      {/* Stats Overview with 3D styling */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400 drop-shadow-lg" />
              <div>
                <p className="text-sm opacity-80">Total Earnings</p>
                <p className="font-bold text-green-400 drop-shadow-lg">${gameState.earnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400 drop-shadow-lg" />
              <div>
                <p className="text-sm opacity-80">Fans</p>
                <p className="font-bold text-blue-400 drop-shadow-lg">{gameState.fans.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Week & Resources with enhanced 3D styling */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
              <span className="font-bold drop-shadow-lg">Week {gameState.week}</span>
            </div>
            <Button
              onClick={nextWeek}
              size="sm"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Next Week
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Practice Points
                </span>
                <span className="font-bold">{gameState.practicePoints}/100</span>
              </div>
              <Progress value={gameState.practicePoints} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  Marketing Points
                </span>
                <span className="font-bold">{gameState.marketingPoints}/5</span>
              </div>
              <Progress value={(gameState.marketingPoints / 5) * 100} className="h-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Time Slots
                </span>
                <span className="font-bold">{gameState.timeSlots}/7</span>
              </div>
              <Progress value={(gameState.timeSlots / 7) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm flex items-center gap-1">
                  <Zap className="w-4 h-4 text-green-400" />
                  Energy
                </span>
                <span className="font-bold">{gameState.energy}/10</span>
              </div>
              <Progress value={(gameState.energy / 10) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spiritual Morale with enhanced styling */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-red-400 drop-shadow-lg" />
            <span className="font-bold drop-shadow-lg">Spiritual Morale</span>
          </div>
          <Progress value={gameState.spiritualMorale} className="h-3 mb-2" />
          <p className="text-xs opacity-80">
            {gameState.spiritualMorale >= 80
              ? "✨ Blessed - Expect good fortune!"
              : gameState.spiritualMorale >= 60
                ? "😊 Good - Things are looking up"
                : gameState.spiritualMorale >= 40
                  ? "😐 Neutral - Stay consistent"
                  : gameState.spiritualMorale >= 20
                    ? "😟 Low - Consider your choices"
                    : "😰 Struggling - Seek guidance"}
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-purple-400 mb-2">
              <Music className="w-6 h-6" />
              {gameState.songs.length}
            </div>
            <p className="text-sm opacity-80">Songs Released</p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-cyan-400 mb-2">
              <Users className="w-6 h-6" />
              {unlockedPlatforms}
            </div>
            <p className="text-sm opacity-80">Social Platforms</p>
          </CardContent>
        </Card>
      </div>

      {/* New Stats for Side Hustles and Trading */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-orange-400 mb-2">
              <Briefcase className="w-6 h-6" />
              {activeHustles}
            </div>
            <p className="text-sm opacity-80">Active Jobs</p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-400 mb-2">
              <BarChart3 className="w-6 h-6" />${portfolioValue.toFixed(0)}
            </div>
            <p className="text-sm opacity-80">Portfolio Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Overview with enhanced 3D styling */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
            Skills Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(gameState.skills).map(([skill, level]) => (
            <div key={skill}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm capitalize">{skill.replace(/([A-Z])/g, " $1").trim()}</span>
                <Badge variant="secondary" className="bg-white/10 text-white shadow-lg">
                  {level.toFixed(1)}
                </Badge>
              </div>
              <Progress value={level} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity with enhanced styling */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400 drop-shadow-lg" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Practiced voice training (+0.5 skill)
            </p>
            <p className="opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Posted on {gameState.socialPlatforms.find((p) => p.unlocked)?.name || "social media"}
            </p>
            <p className="opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Gained {Math.floor(Math.random() * 20 + 5)} new fans this week
            </p>
            <p className="opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Earned ${Math.floor(gameState.weeklyEarnings)} from streaming
            </p>
            {activeHustles > 0 && (
              <p className="opacity-80 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Working {activeHustles} side job{activeHustles > 1 ? "s" : ""} this week
              </p>
            )}
            {portfolioValue > 0 && (
              <p className="opacity-80 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Trading portfolio worth ${portfolioValue.toFixed(0)}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
