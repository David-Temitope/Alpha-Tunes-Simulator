"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Users,
  DollarSign,
  Music,
  Calendar,
  Award,
  Zap,
  Clock,
  Heart,
  Building2,
  Target,
} from "lucide-react"
import { useGame } from "../context/game-context"

export default function Dashboard() {
  const { gameState, nextWeek } = useGame()

  const totalStreams = gameState.songs.reduce((total, song) => {
    return total + Object.values(song.streams).reduce((songTotal, streams) => songTotal + streams, 0)
  }, 0)

  const totalSocialFollowers = gameState.socialPlatforms.reduce((total, platform) => total + platform.followers, 0)

  const activeHustles = gameState.sideHustles.filter((h) => h.active)
  const weeklyHustleIncome = activeHustles.reduce((total, hustle) => {
    return total + (hustle.weeklyPay.min + hustle.weeklyPay.max) / 2
  }, 0)

  const weeklyExpenses = gameState.expenses.rent + gameState.expenses.food + gameState.expenses.transportation

  const netWeeklyIncome = weeklyHustleIncome - weeklyExpenses

  // Calculate skill average
  const skillAverage =
    Object.values(gameState.skills).reduce((sum, skill) => sum + skill, 0) / Object.keys(gameState.skills).length

  return (
    <div className="space-y-4">
      {/* Week Progress */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Week {gameState.week} Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-400/20">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-400">
                <Zap className="w-5 h-5" />
                {gameState.practicePoints}/100
              </div>
              <p className="text-xs text-blue-200">Practice Points</p>
            </div>
            <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-400/20">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
                <Clock className="w-5 h-5" />
                {gameState.timeSlots}/7
              </div>
              <p className="text-xs text-blue-200">Time Slots</p>
            </div>
          </div>
          <Button
            onClick={nextWeek}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg"
          >
            Advance to Week {gameState.week + 1}
          </Button>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-400 mb-1">
              <DollarSign className="w-6 h-6" />
              {gameState.earnings.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200">Total Earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-400 mb-1">
              <Users className="w-6 h-6" />
              {gameState.fans.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200">Total Fans</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-purple-400 mb-1">
              <Music className="w-6 h-6" />
              {gameState.songs.length}
            </div>
            <p className="text-xs text-blue-200">Songs Created</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-pink-400 mb-1">
              <TrendingUp className="w-6 h-6" />
              {totalStreams.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200">Total Streams</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Financial Overview */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Weekly Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-blue-200">Side Hustle Income:</span>
            <span className="font-bold text-green-400">+${weeklyHustleIncome.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-200">Living Expenses:</span>
            <span className="font-bold text-red-400">-${weeklyExpenses}</span>
          </div>
          <hr className="border-blue-400/20" />
          <div className="flex justify-between items-center font-bold">
            <span className="text-white">Net Weekly:</span>
            <span className={netWeeklyIncome >= 0 ? "text-green-400" : "text-red-400"}>
              {netWeeklyIncome >= 0 ? "+" : ""}${netWeeklyIncome.toFixed(0)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Skills Overview */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-400" />
            Skills Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(gameState.skills).map(([skill, level]) => (
            <div key={skill} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-200 capitalize">{skill.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="text-sm font-bold text-white">{level.toFixed(1)}</span>
              </div>
              <Progress value={level} className="h-2" />
            </div>
          ))}
          <div className="mt-3 p-2 bg-blue-900/30 rounded-lg border border-blue-400/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-200">Average Skill Level:</span>
              <span className="font-bold text-yellow-400">{skillAverage.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Overview */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Social Media Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-400/20">
              <div className="text-lg font-bold text-blue-400">{totalSocialFollowers.toLocaleString()}</div>
              <p className="text-xs text-blue-200">Total Followers</p>
            </div>
            <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-400/20">
              <div className="text-lg font-bold text-green-400">
                {gameState.socialPlatforms.filter((p) => p.unlocked).length}/7
              </div>
              <p className="text-xs text-blue-200">Platforms Unlocked</p>
            </div>
          </div>
          <div className="space-y-2">
            {gameState.socialPlatforms
              .filter((p) => p.unlocked)
              .slice(0, 3)
              .map((platform) => (
                <div key={platform.id} className="flex justify-between items-center text-sm">
                  <span className="text-blue-200">{platform.name}:</span>
                  <span className="text-white">{platform.followers.toLocaleString()} followers</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Side Hustles */}
      {activeHustles.length > 0 && (
        <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              Active Side Hustles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activeHustles.map((hustle) => (
                <div
                  key={hustle.id}
                  className="flex justify-between items-center p-2 bg-blue-900/30 rounded-lg border border-blue-400/20"
                >
                  <span className="text-sm text-blue-200">{hustle.title}</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                    ${hustle.weeklyPay.min}-${hustle.weeklyPay.max}/week
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Spiritual Morale */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            Spiritual Morale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Current Level:</span>
              <span className="font-bold text-pink-400">{gameState.spiritualMorale}/100</span>
            </div>
            <Progress value={gameState.spiritualMorale} className="h-3" />
            <p className="text-xs text-blue-200">
              {gameState.spiritualMorale >= 80
                ? "Blessed! Expect good fortune."
                : gameState.spiritualMorale >= 50
                  ? "Balanced spiritual state."
                  : "Consider tithing to improve morale."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Record Label Status */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Career Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Record Label:</span>
              <span className="font-bold text-white">{gameState.recordLabel || "Independent"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Career Week:</span>
              <span className="font-bold text-blue-400">Week {gameState.week}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200">Industry Status:</span>
              <span className="font-bold text-yellow-400">
                {gameState.fans >= 100000
                  ? "Superstar"
                  : gameState.fans >= 50000
                    ? "Celebrity"
                    : gameState.fans >= 10000
                      ? "Rising Star"
                      : gameState.fans >= 1000
                        ? "Local Artist"
                        : "Beginner"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardContent className="p-4">
          <h3 className="font-bold text-white mb-2">💡 Weekly Tips</h3>
          <ul className="text-sm space-y-1 text-blue-200">
            <li>• Use all practice points each week for skill growth</li>
            <li>• Post on social media to grow your fanbase</li>
            <li>• Balance side hustles with music career development</li>
            <li>• Consider tithing 10% of earnings for spiritual blessings</li>
            <li>• Upload songs to streaming platforms for passive income</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
