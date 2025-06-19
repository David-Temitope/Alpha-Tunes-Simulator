"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Star, TrendingUp, CheckCircle, XCircle } from "lucide-react"
import { useGame } from "../context/game-context"

export default function RecordLabels() {
  const { gameState, signWithLabel } = useGame()

  const calculateNetProfit = () => {
    const totalIncome = gameState.financialRecords
      .filter((record) => record.type === "income")
      .reduce((sum, record) => sum + record.amount, 0)
    const totalExpenses = gameState.financialRecords
      .filter((record) => record.type === "expense")
      .reduce((sum, record) => sum + record.amount, 0)
    return totalIncome - totalExpenses
  }

  const getAverageSkill = () => {
    return Object.values(gameState.skills).reduce((a, b) => a + b, 0) / 6
  }

  const getTotalInfluence = () => {
    return gameState.socialPlatforms.reduce((total, platform) => total + platform.influence, 0)
  }

  const netProfit = calculateNetProfit()
  const avgSkill = getAverageSkill()
  const totalInfluence = getTotalInfluence()

  const labels = [
    {
      id: "wise-record",
      name: "Wise Record",
      description: "Independent label focusing on emerging talent",
      requirements: {
        netProfit: 15000,
        influence: 20,
        songs: 10,
        avgSkill: 3.5,
      },
      benefits: [
        "15% revenue share",
        "Basic marketing support",
        "Distribution to major platforms",
        "Monthly $500 advance",
      ],
      color: "from-green-600 to-emerald-600",
      tier: 1,
    },
    {
      id: "sound-tunes",
      name: "Sound Tunes",
      description: "Mid-tier label with strong digital presence",
      requirements: {
        netProfit: 35000,
        influence: 50,
        songs: 15,
        avgSkill: 4.0,
      },
      benefits: [
        "20% revenue share",
        "Professional marketing team",
        "Music video production",
        "Monthly $1,200 advance",
        "Radio promotion",
      ],
      color: "from-blue-600 to-cyan-600",
      tier: 2,
    },
    {
      id: "vibe-on",
      name: "Vibe On",
      description: "Established label with industry connections",
      requirements: {
        netProfit: 75000,
        influence: 100,
        songs: 20,
        avgSkill: 4.5,
      },
      benefits: [
        "25% revenue share",
        "Celebrity collaborations",
        "International distribution",
        "Monthly $2,500 advance",
        "Award show nominations",
      ],
      color: "from-purple-600 to-pink-600",
      tier: 3,
    },
    {
      id: "xp-music",
      name: "XP Music Industries",
      description: "Major label with global reach",
      requirements: {
        netProfit: 150000,
        influence: 200,
        songs: 25,
        avgSkill: 5.0,
      },
      benefits: [
        "30% revenue share",
        "A-list producer access",
        "Global tour support",
        "Monthly $5,000 advance",
        "Grammy consideration",
      ],
      color: "from-orange-600 to-red-600",
      tier: 4,
    },
    {
      id: "davoe-entertainment",
      name: "DaVoe Entertainment",
      description: "Premium label for established artists",
      requirements: {
        netProfit: 300000,
        influence: 400,
        songs: 30,
        avgSkill: 5.5,
      },
      benefits: [
        "35% revenue share",
        "Exclusive brand partnerships",
        "Private jet tours",
        "Monthly $10,000 advance",
        "Hall of Fame consideration",
      ],
      color: "from-yellow-600 to-orange-600",
      tier: 5,
    },
    {
      id: "alpha-tunes",
      name: "Alpha Tunes",
      description: "The ultimate destination for music legends",
      requirements: {
        netProfit: 500000,
        influence: 800,
        songs: 40,
        avgSkill: 6.0,
      },
      benefits: [
        "40% revenue share",
        "Lifetime royalty guarantees",
        "Personal management team",
        "Monthly $20,000 advance",
        "Music industry ownership",
      ],
      color: "from-indigo-600 to-purple-600",
      tier: 6,
    },
  ]

  const checkRequirements = (label: (typeof labels)[0]) => {
    return {
      netProfit: netProfit >= label.requirements.netProfit,
      influence: totalInfluence >= label.requirements.influence,
      songs: gameState.songs.length >= label.requirements.songs,
      avgSkill: avgSkill >= label.requirements.avgSkill,
    }
  }

  const isEligible = (label: (typeof labels)[0]) => {
    const reqs = checkRequirements(label)
    return Object.values(reqs).every(Boolean)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2">Record Labels</h2>
        <p className="text-slate-300">Build your career and attract major label attention</p>
      </div>

      {/* Current Status */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Your Current Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Net Profit:</span>
                <span className="font-bold text-green-400">${netProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Influence:</span>
                <span className="font-bold text-purple-400">{totalInfluence}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Songs Released:</span>
                <span className="font-bold text-blue-400">{gameState.songs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Avg Skill Level:</span>
                <span className="font-bold text-yellow-400">{avgSkill.toFixed(1)}</span>
              </div>
            </div>
          </div>
          {gameState.recordLabel && (
            <div className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-green-400">Signed with {gameState.recordLabel}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Record Labels */}
      <div className="space-y-4">
        {labels.map((label) => {
          const requirements = checkRequirements(label)
          const eligible = isEligible(label)
          const isSigned = gameState.recordLabel === label.name

          return (
            <Card
              key={label.id}
              className={`bg-slate-900 border-slate-700 ${
                eligible ? "ring-2 ring-green-500/50" : ""
              } ${isSigned ? "ring-2 ring-blue-500" : ""}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${label.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{label.name}</CardTitle>
                      <p className="text-slate-400 text-sm">{label.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: label.tier }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-slate-500 ml-1">Tier {label.tier}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {isSigned ? (
                      <Badge className="bg-blue-500/20 text-blue-400">Current Label</Badge>
                    ) : eligible ? (
                      <Badge className="bg-green-500/20 text-green-400">Eligible</Badge>
                    ) : (
                      <Badge className="bg-slate-500/20 text-slate-400">Not Eligible</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Requirements */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Requirements</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Net Profit:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">
                            ${label.requirements.netProfit.toLocaleString()}
                          </span>
                          {requirements.netProfit ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Influence:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{label.requirements.influence}</span>
                          {requirements.influence ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Songs:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{label.requirements.songs}</span>
                          {requirements.songs ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Avg Skill:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{label.requirements.avgSkill}</span>
                          {requirements.avgSkill ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Benefits</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {label.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                {!isSigned && (
                  <Button
                    onClick={() => eligible && signWithLabel(label.name)}
                    disabled={!eligible}
                    className={`w-full bg-gradient-to-r ${label.color} hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {eligible ? "Sign Contract" : "Requirements Not Met"}
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Tips */}
      <Card className="bg-slate-900 border-slate-700">
        <CardContent className="p-4">
          <h3 className="font-bold text-white mb-2">🎯 Label Tips</h3>
          <ul className="text-sm space-y-1 text-slate-300">
            <li>• Build consistent income through streaming and side hustles</li>
            <li>• Grow your social media influence across all platforms</li>
            <li>• Release quality songs regularly to build your catalog</li>
            <li>• Practice consistently to improve your average skill level</li>
            <li>• Higher tier labels offer better revenue shares and benefits</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
