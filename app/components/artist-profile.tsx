"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Edit, Star, Music, Users, DollarSign, Award, Calendar } from "lucide-react"
import { useGame } from "../context/game-context"

export default function ArtistProfile() {
  const { gameState, setGameState } = useGame()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    bio: gameState.artist.bio,
  })

  const handleSave = () => {
    setGameState({
      ...gameState,
      artist: {
        ...gameState.artist,
        bio: editData.bio,
      },
    })
    setIsEditing(false)
  }

  const skillAverage = Object.values(gameState.skills).reduce((a, b) => a + b, 0) / 4
  const totalStreams = gameState.songs.reduce((total, song) => {
    return total + Object.values(song.streams).reduce((a, b) => a + b, 0)
  }, 0)

  const achievements = [
    {
      id: "first-song",
      name: "First Song",
      description: "Upload your first song",
      unlocked: gameState.songs.length > 0,
    },
    { id: "fan-milestone", name: "Rising Star", description: "Reach 1,000 fans", unlocked: gameState.fans >= 1000 },
    {
      id: "earnings-milestone",
      name: "Money Maker",
      description: "Earn $10,000",
      unlocked: gameState.earnings >= 10000,
    },
    {
      id: "skill-master",
      name: "Skill Master",
      description: "Reach 50 in any skill",
      unlocked: Math.max(...Object.values(gameState.skills)) >= 50,
    },
    {
      id: "social-influencer",
      name: "Social Influencer",
      description: "Unlock 5 social platforms",
      unlocked: gameState.socialPlatforms.filter((p) => p.unlocked).length >= 5,
    },
    {
      id: "collector",
      name: "Collector",
      description: "Own 5 marketplace items",
      unlocked: gameState.marketplaceItems.filter((i) => i.owned).length >= 5,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={gameState.artist.profileImage || "/placeholder.svg"}
                alt={gameState.artist.stageName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {gameState.artist.stageName}
                </h1>
                <Button onClick={() => setIsEditing(!isEditing)} size="sm" className="bg-white/10 hover:bg-white/20">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-lg opacity-80 mb-2">{gameState.artist.originalName}</p>
              <Badge className="bg-purple-500/20 text-purple-400 mb-3">{gameState.artist.genre} Artist</Badge>

              {isEditing ? (
                <div className="space-y-3">
                  <Textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    placeholder="Tell your fans about yourself..."
                    className="bg-white/10 border-white/20 text-white resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm" className="bg-green-500 hover:bg-green-600">
                      Save
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm opacity-80">{gameState.artist.bio || "No bio yet. Click edit to add one!"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-400 mb-2">
              <DollarSign className="w-6 h-6" />
              {gameState.earnings.toLocaleString()}
            </div>
            <p className="text-sm opacity-80">Total Earnings</p>
          </CardContent>
        </Card>

        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-400 mb-2">
              <Users className="w-6 h-6" />
              {gameState.fans.toLocaleString()}
            </div>
            <p className="text-sm opacity-80">Total Fans</p>
          </CardContent>
        </Card>
      </div>

      {/* Career Stats */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="w-5 h-5 text-purple-400" />
            Career Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold text-purple-400">{gameState.songs.length}</div>
              <p className="text-xs opacity-80">Songs Released</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold text-orange-400">{totalStreams.toLocaleString()}</div>
              <p className="text-xs opacity-80">Total Streams</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold text-cyan-400">{gameState.week}</div>
              <p className="text-xs opacity-80">Weeks Active</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="text-xl font-bold text-yellow-400">{skillAverage.toFixed(1)}</div>
              <p className="text-xs opacity-80">Avg Skill Level</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Breakdown */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Skills Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(gameState.skills).map(([skill, level]) => (
            <div key={skill}>
              <div className="flex justify-between items-center mb-2">
                <span className="capitalize font-medium">{skill.replace(/([A-Z])/g, " $1").trim()}</span>
                <Badge variant="secondary" className="bg-white/10 text-white">
                  {level.toFixed(1)}/100
                </Badge>
              </div>
              <Progress value={level} className="h-3" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  achievement.unlocked ? "bg-green-500/20 border border-green-500/30" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{achievement.name}</h4>
                  <p className="text-sm opacity-80">{achievement.description}</p>
                </div>
                {achievement.unlocked && <Badge className="bg-green-500/20 text-green-400">Unlocked</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {gameState.songs.slice(-3).map((song) => (
              <div key={song.id} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                <img
                  src={song.artwork || "/placeholder.svg"}
                  alt={song.title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">Released "{song.title}"</p>
                  <p className="text-xs opacity-80">{new Date(song.uploadDate).toLocaleDateString()}</p>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400">⭐ {song.rating.toFixed(1)}</Badge>
              </div>
            ))}
            {gameState.songs.length === 0 && (
              <p className="text-center opacity-60 py-4">No activity yet. Start creating music!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
