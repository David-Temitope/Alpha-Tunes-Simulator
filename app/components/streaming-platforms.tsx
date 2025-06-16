"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Play, DollarSign, Upload, TrendingUp, Music } from "lucide-react"
import { useGame } from "../context/game-context"

export default function StreamingPlatforms() {
  const { gameState, addEarnings, addFans, uploadSong } = useGame()
  const [uploadingTo, setUploadingTo] = useState<string | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [songData, setSongData] = useState({
    title: "",
    genre: "",
    duration: 180,
    artwork: "/placeholder.svg?height=200&width=200",
    rating: 0,
  })

  const platforms = [
    {
      id: "SoundVibe",
      name: "SoundVibe",
      realName: "SoundCloud",
      earningsPerStream: 0.1,
      unlocked: true,
      color: "from-orange-500 to-red-500",
      difficulty: 1,
      icon: "🎵",
    },
    {
      id: "Amaplay",
      name: "Amaplay",
      realName: "Audiomack",
      earningsPerStream: 0.02,
      unlocked: true,
      color: "from-blue-500 to-purple-500",
      difficulty: 1,
      icon: "🎧",
    },
    {
      id: "TuneJam",
      name: "TuneJam",
      realName: "Boomplay",
      earningsPerStream: 0.5,
      unlocked: gameState.earnings >= 100,
      color: "from-green-500 to-teal-500",
      difficulty: 2,
      icon: "🎶",
    },
    {
      id: "StreamTunes",
      name: "StreamTunes",
      realName: "YouTube Music",
      earningsPerStream: 2.0,
      unlocked: gameState.earnings >= 500,
      color: "from-red-500 to-pink-500",
      difficulty: 3,
      icon: "📺",
    },
    {
      id: "BeatFlow",
      name: "BeatFlow",
      realName: "Tidal",
      earningsPerStream: 0.25,
      unlocked: gameState.earnings >= 250,
      color: "from-cyan-500 to-blue-500",
      difficulty: 2,
      icon: "🌊",
    },
    {
      id: "Hypefy",
      name: "Hypefy",
      realName: "Spotify",
      earningsPerStream: 3.0,
      unlocked: gameState.earnings >= 1000,
      color: "from-green-400 to-emerald-500",
      difficulty: 4,
      icon: "🎤",
    },
    {
      id: "ChartTopper",
      name: "ChartTopper",
      realName: "Amazon Music",
      earningsPerStream: 4.0,
      unlocked: gameState.earnings >= 2000,
      color: "from-yellow-500 to-orange-500",
      difficulty: 4,
      icon: "👑",
    },
    {
      id: "CoreBeats",
      name: "CoreBeats",
      realName: "Apple Music",
      earningsPerStream: 5.0,
      unlocked: gameState.earnings >= 5000,
      color: "from-gray-600 to-gray-800",
      difficulty: 5,
      icon: "🍎",
    },
  ]

  const handleUpload = async (platform: (typeof platforms)[0]) => {
    if (!platform.unlocked) return

    setUploadingTo(platform.id)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const skillAverage = Object.values(gameState.skills).reduce((a, b) => a + b, 0) / 4
    const baseStreams = Math.floor((skillAverage * 10) / platform.difficulty)
    const randomMultiplier = 0.5 + Math.random() * 1.5
    const streams = Math.floor(baseStreams * randomMultiplier)

    const earnings = streams * platform.earningsPerStream
    const newFans = Math.floor(streams * 0.1)

    addEarnings(earnings)
    addFans(newFans)

    setUploadingTo(null)
  }

  const handleSongUpload = () => {
    if (songData.title && songData.genre) {
      const skillAverage = Object.values(gameState.skills).reduce((a, b) => a + b, 0) / 4
      const rating = Math.min(10, skillAverage / 10)

      uploadSong({
        ...songData,
        rating,
      })

      setSongData({
        title: "",
        genre: "",
        duration: 180,
        artwork: "/placeholder.svg?height=200&width=200",
        rating: 0,
      })
      setShowUploadDialog(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Song Button */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transform hover:scale-105 transition-all duration-300">
            <Music className="w-4 h-4 mr-2" />
            Create New Song
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black/90 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Upload New Song</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Song Title</Label>
              <Input
                id="title"
                value={songData.title}
                onChange={(e) => setSongData({ ...songData, title: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter song title"
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select value={songData.genre} onValueChange={(value) => setSongData({ ...songData, genre: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                  <SelectItem value="Gospel">Gospel</SelectItem>
                  <SelectItem value="Afrobeat">Afrobeat</SelectItem>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="R&B">R&B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                value={songData.duration}
                onChange={(e) => setSongData({ ...songData, duration: Number.parseInt(e.target.value) })}
                className="bg-white/10 border-white/20 text-white"
                min="60"
                max="600"
              />
            </div>
            <Button onClick={handleSongUpload} className="w-full bg-gradient-to-r from-green-500 to-blue-500">
              Create Song
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Your Songs */}
      {gameState.songs.length > 0 && (
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-400" />
              Your Songs ({gameState.songs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gameState.songs.slice(0, 3).map((song) => (
              <div key={song.id} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                <img
                  src={song.artwork || "/placeholder.svg"}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold">{song.title}</h4>
                  <p className="text-sm opacity-80">
                    {song.genre} • {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
                  </p>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400">⭐ {song.rating.toFixed(1)}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Platforms Grid */}
      <div className="space-y-3">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            className={`bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 ${!platform.unlocked ? "opacity-50" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center shadow-lg text-2xl`}
                  >
                    {platform.unlocked ? platform.icon : "🔒"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{platform.name}</h3>
                    <p className="text-xs opacity-60">({platform.realName})</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="font-bold text-green-400">${platform.earningsPerStream.toFixed(2)}</span>
                  </div>
                  <p className="text-xs opacity-60">per stream</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-white/10 text-white">
                    Difficulty: {platform.difficulty}/5
                  </Badge>
                  {!platform.unlocked && (
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400">
                      Locked
                    </Badge>
                  )}
                </div>

                <Button
                  onClick={() => handleUpload(platform)}
                  disabled={!platform.unlocked || uploadingTo === platform.id || gameState.songs.length === 0}
                  size="sm"
                  className={`bg-gradient-to-r ${platform.color} hover:opacity-80 disabled:opacity-50 shadow-lg`}
                >
                  {uploadingTo === platform.id ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </>
                  )}
                </Button>
              </div>

              {!platform.unlocked && (
                <p className="text-xs opacity-60 mt-2">
                  Unlock at $
                  {platform.earningsPerStream === 0.5
                    ? "100"
                    : platform.earningsPerStream === 2.0
                      ? "500"
                      : platform.earningsPerStream === 0.25
                        ? "250"
                        : platform.earningsPerStream === 3.0
                          ? "1,000"
                          : platform.earningsPerStream === 4.0
                            ? "2,000"
                            : "5,000"}{" "}
                  total earnings
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Streaming Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-400">
                <Music className="w-5 h-5" />
                {gameState.songs.length}
              </div>
              <p className="text-xs opacity-80">Total Songs</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-400">
                <Play className="w-5 h-5" />
                {Math.floor(gameState.fans * 0.3).toLocaleString()}
              </div>
              <p className="text-xs opacity-80">Weekly Streams</p>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Platforms Unlocked:</span>
            <span className="font-bold">
              {platforms.filter((p) => p.unlocked).length}/{platforms.length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Best Platform:</span>
            <span className="font-bold">
              {platforms.filter((p) => p.unlocked).sort((a, b) => b.earningsPerStream - a.earningsPerStream)[0]?.name ||
                "None"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
