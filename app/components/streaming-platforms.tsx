"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Play, Upload, TrendingUp, Music, AlertCircle, Lock } from "lucide-react"
import { useGame } from "../context/game-context"

export default function StreamingPlatforms() {
  const { gameState, addEarnings, addFans, uploadSong, uploadSongToPlatform } = useGame()
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showSongSelectDialog, setShowSongSelectDialog] = useState(false)
  const [selectedSong, setSelectedSong] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
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
      uploadCost: 0,
      color: "from-orange-500 to-red-500",
      difficulty: 1,
      icon: "🎵",
      description: "Free platform for emerging artists",
    },
    {
      id: "Amaplay",
      name: "Amaplay",
      realName: "Audiomack",
      earningsPerStream: 0.02,
      unlocked: true,
      uploadCost: 0,
      color: "from-blue-500 to-purple-500",
      difficulty: 1,
      icon: "🎧",
      description: "Free hip-hop focused platform",
    },
    {
      id: "TuneJam",
      name: "TuneJam",
      realName: "Boomplay",
      earningsPerStream: 0.5,
      unlocked: gameState.earnings >= 100,
      uploadCost: 50,
      color: "from-green-500 to-teal-500",
      difficulty: 2,
      icon: "🎶",
      description: "African music streaming giant",
    },
    {
      id: "StreamTunes",
      name: "StreamTunes",
      realName: "YouTube Music",
      earningsPerStream: 2.0,
      unlocked: gameState.earnings >= 500,
      uploadCost: 50,
      color: "from-red-500 to-pink-500",
      difficulty: 3,
      icon: "📺",
      description: "Video-first music platform",
    },
    {
      id: "BeatFlow",
      name: "BeatFlow",
      realName: "Tidal",
      earningsPerStream: 0.25,
      unlocked: gameState.earnings >= 250,
      uploadCost: 200,
      color: "from-cyan-500 to-blue-500",
      difficulty: 2,
      icon: "🌊",
      description: "High-fidelity audio platform",
    },
    {
      id: "Hypefy",
      name: "Hypefy",
      realName: "Spotify",
      earningsPerStream: 3.0,
      unlocked: gameState.earnings >= 1000,
      uploadCost: 200,
      color: "from-green-400 to-emerald-500",
      difficulty: 4,
      icon: "🎤",
      description: "World's largest streaming platform",
    },
    {
      id: "ChartTopper",
      name: "ChartTopper",
      realName: "Amazon Music",
      earningsPerStream: 4.0,
      unlocked: gameState.earnings >= 2000,
      uploadCost: 200,
      color: "from-yellow-500 to-orange-500",
      difficulty: 4,
      icon: "👑",
      description: "Premium streaming service",
    },
    {
      id: "CoreBeats",
      name: "CoreBeats",
      realName: "Apple Music",
      earningsPerStream: 5.0,
      unlocked: gameState.recordLabel !== null,
      uploadCost: 1000,
      color: "from-gray-600 to-gray-800",
      difficulty: 5,
      icon: "🍎",
      description: "Premium platform (Label required)",
    },
    {
      id: "DuhVoes",
      name: "DuhVoes",
      realName: "Exclusive Platform",
      earningsPerStream: 8.0,
      unlocked: gameState.recordLabel !== null,
      uploadCost: 1000,
      color: "from-purple-600 to-indigo-800",
      difficulty: 5,
      icon: "💎",
      description: "Elite platform (Label required)",
    },
  ]

  const handleSongSelect = (songId: string) => {
    setSelectedSong(songId)
    setShowSongSelectDialog(true)
  }

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const handleUploadToSelectedPlatforms = async () => {
    if (!selectedSong || selectedPlatforms.length === 0) return

    const song = gameState.songs.find((s) => s.id === selectedSong)
    if (!song) return

    // Calculate total upload cost
    const totalCost = selectedPlatforms.reduce((cost, platformId) => {
      const platform = platforms.find((p) => p.id === platformId)
      return cost + (platform?.uploadCost || 0)
    }, 0)

    if (gameState.earnings < totalCost) {
      alert("Not enough money for upload costs!")
      return
    }

    // Deduct upload costs
    addEarnings(-totalCost)

    // Upload to selected platforms
    selectedPlatforms.forEach((platformId) => {
      uploadSongToPlatform(selectedSong, platformId)
    })

    setShowSongSelectDialog(false)
    setSelectedSong(null)
    setSelectedPlatforms([])
  }

  const handleSongUpload = () => {
    if (songData.title && songData.genre) {
      const skillAverage = Object.values(gameState.skills).reduce((a, b) => a + b, 0) / 6
      const rating = Math.min(10, skillAverage / 10)

      uploadSong({
        ...songData,
        rating,
        productionCost: 500,
        qualityMultiplier: 1,
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

  // Filter songs that haven't been uploaded to all platforms
  const availableSongs = gameState.songs.filter((song) => {
    const unlockedPlatforms = platforms.filter((p) => p.unlocked)
    return song.uploadedPlatforms.length < unlockedPlatforms.length
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2">Music Distribution</h2>
        <p className="text-slate-300">Upload your songs to streaming platforms and earn from streams</p>
      </div>

      {/* Upload Song Button */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg">
            <Music className="w-5 h-5 mr-2" />
            Create New Song
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create New Song</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-slate-300">
                Song Title
              </Label>
              <Input
                id="title"
                value={songData.title}
                onChange={(e) => setSongData({ ...songData, title: e.target.value })}
                className="bg-slate-800 border-slate-600 text-white mt-1"
                placeholder="Enter song title"
              />
            </div>
            <div>
              <Label htmlFor="genre" className="text-slate-300">
                Genre
              </Label>
              <Select value={songData.genre} onValueChange={(value) => setSongData({ ...songData, genre: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white mt-1">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                  <SelectItem value="Gospel">Gospel</SelectItem>
                  <SelectItem value="Afrobeat">Afrobeat</SelectItem>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="R&B">R&B</SelectItem>
                  <SelectItem value="Rock">Rock</SelectItem>
                  <SelectItem value="Electronic">Electronic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSongUpload}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={!songData.title || !songData.genre}
            >
              Create Song
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Songs Ready for Upload */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Music className="w-5 h-5 text-blue-400" />
            Songs Ready for Upload ({availableSongs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {availableSongs.length > 0 ? (
            availableSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={song.artwork || "/placeholder.svg"}
                    alt={song.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{song.title}</h4>
                    <p className="text-sm text-slate-400">
                      {song.genre} • {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
                    </p>
                    <p className="text-xs text-slate-500">Uploaded to: {song.uploadedPlatforms.length} platforms</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-500/20 text-yellow-400">⭐ {song.rating.toFixed(1)}</Badge>
                  <Button
                    onClick={() => handleSongSelect(song.id)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No songs available for upload</p>
              <p className="text-sm">Create new songs to get started</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Platform Selection Dialog */}
      <Dialog open={showSongSelectDialog} onOpenChange={setShowSongSelectDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Select Platforms to Upload</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {platforms.map((platform) => {
              const isAlreadyUploaded =
                selectedSong &&
                gameState.songs.find((s) => s.id === selectedSong)?.uploadedPlatforms.includes(platform.id)
              const canAfford = gameState.earnings >= platform.uploadCost
              const isUnlocked = platform.unlocked

              return (
                <div
                  key={platform.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isAlreadyUploaded
                      ? "bg-green-900/20 border-green-700"
                      : !isUnlocked
                        ? "bg-slate-800/50 border-slate-700 opacity-50"
                        : !canAfford
                          ? "bg-red-900/20 border-red-700"
                          : "bg-slate-800 border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${platform.color} rounded-lg flex items-center justify-center text-xl`}
                    >
                      {isUnlocked ? platform.icon : "🔒"}
                    </div>
                    <div>
                      <h4 className="font-semibold">{platform.name}</h4>
                      <p className="text-sm text-slate-400">{platform.description}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-green-400">${platform.earningsPerStream.toFixed(2)}/stream</span>
                        {platform.uploadCost > 0 && (
                          <span className="text-xs text-yellow-400">Upload: ${platform.uploadCost}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAlreadyUploaded ? (
                      <Badge className="bg-green-500/20 text-green-400">Already Uploaded</Badge>
                    ) : !isUnlocked ? (
                      <Badge className="bg-slate-500/20 text-slate-400">
                        <Lock className="w-3 h-3 mr-1" />
                        Locked
                      </Badge>
                    ) : !canAfford ? (
                      <Badge className="bg-red-500/20 text-red-400">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Can't Afford
                      </Badge>
                    ) : (
                      <Checkbox
                        checked={selectedPlatforms.includes(platform.id)}
                        onCheckedChange={() => handlePlatformToggle(platform.id)}
                        className="border-slate-600"
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {selectedPlatforms.length > 0 && (
            <div className="border-t border-slate-700 pt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Total Upload Cost:</span>
                <span className="font-bold text-yellow-400">
                  $
                  {selectedPlatforms
                    .reduce((cost, platformId) => {
                      const platform = platforms.find((p) => p.id === platformId)
                      return cost + (platform?.uploadCost || 0)
                    }, 0)
                    .toLocaleString()}
                </span>
              </div>
              <Button
                onClick={handleUploadToSelectedPlatforms}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                disabled={selectedPlatforms.length === 0}
              >
                Upload to {selectedPlatforms.length} Platform{selectedPlatforms.length > 1 ? "s" : ""}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Platform Overview */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Platform Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  platform.unlocked ? "bg-slate-800" : "bg-slate-800/50"
                } border border-slate-700`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${platform.color} rounded-lg flex items-center justify-center text-sm`}
                  >
                    {platform.unlocked ? platform.icon : "🔒"}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{platform.name}</h4>
                    <p className="text-xs text-slate-400">{platform.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-green-400">${platform.earningsPerStream.toFixed(2)}</div>
                  <div className="text-xs text-slate-400">per stream</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Streaming Stats */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-purple-400" />
            Your Streaming Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{gameState.songs.length}</div>
              <p className="text-sm text-slate-400">Total Songs</p>
            </div>
            <div className="text-center p-4 bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {gameState.songs.reduce((total, song) => total + song.uploadedPlatforms.length, 0)}
              </div>
              <p className="text-sm text-slate-400">Platform Uploads</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
