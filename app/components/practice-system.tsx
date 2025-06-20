"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Mic, Music, Headphones, PenTool, Zap, Plus } from "lucide-react"
import { useState } from "react"
import { useGame } from "../context/game-context"

export default function PracticeSystem() {
  const { gameState, updateSkill, spendPracticePoints, uploadSong, addEarnings } = useGame()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [songTitle, setSongTitle] = useState("")
  const [songGenre, setSongGenre] = useState("")
  const [songDuration, setSongDuration] = useState(180)
  const [productionCost, setProductionCost] = useState(500)

  const genres = [
    "Hip-Hop",
    "Gospel",
    "Afrobeat",
    "Pop",
    "R&B",
    "Rock",
    "Electronic",
    "Country",
    "Jazz",
    "Reggae",
    "Classical",
    "Folk",
    "Trap",
    "Drill",
    "Amapiano",
  ]

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

  const handleCreateSong = () => {
    if (songTitle && songGenre && gameState.earnings >= productionCost) {
      const qualityMultiplier = productionCost === 0 ? 0.1 : productionCost / 1000 // Free style = 0.1x

      uploadSong({
        title: songTitle,
        genre: songGenre,
        duration: songDuration,
        artwork: "/placeholder.svg?height=100&width=100",
        rating: Math.min(10, Math.floor(Math.random() * 5) + 3 + qualityMultiplier * 0.5),
        productionCost,
        qualityMultiplier,
      })

      // Deduct production cost only if not free
      if (productionCost > 0) {
        addEarnings(-productionCost)
      }

      setSongTitle("")
      setSongGenre("")
      setSongDuration(180)
      setProductionCost(500)
      setShowCreateDialog(false)
    }
  }

  const handlePractice = (practiceType: (typeof practiceTypes)[0]) => {
    if (gameState.practicePoints >= practiceType.cost) {
      // Spend points first, then update skill
      spendPracticePoints(practiceType.cost)
      updateSkill(practiceType.id as keyof typeof gameState.skills, practiceType.skillGain)
    }
  }

  return (
    <div className="space-y-4">
      {/* Practice Points Header */}
      <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-white">Practice Points</span>
            </div>
            <span className="text-lg font-bold text-blue-400">{gameState.practicePoints}/100</span>
          </div>
          <Progress value={gameState.practicePoints} className="h-3" />
          <p className="text-xs text-blue-200 mt-2">Resets every week</p>
        </CardContent>
      </Card>

      {/* Create Song Button */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 shadow-lg"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Song
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black/90 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>Create a New Song</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Song Title</Label>
              <Input
                id="title"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter song title..."
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select value={songGenre} onValueChange={setSongGenre}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">
                Duration: {Math.floor(songDuration / 60)}:{(songDuration % 60).toString().padStart(2, "0")}
              </Label>
              <Slider
                id="duration"
                value={[songDuration]}
                max={600}
                min={60}
                step={30}
                onValueChange={(value) => setSongDuration(value[0])}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="productionCost">Production Budget</Label>
              <Select
                value={productionCost.toString()}
                onValueChange={(value) => setProductionCost(Number.parseInt(value))}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">$0 - Free Style</SelectItem>
                  <SelectItem value="500">$500 - Basic Quality</SelectItem>
                  <SelectItem value="1500">$1,500 - Good Quality</SelectItem>
                  <SelectItem value="3000">$3,000 - High Quality</SelectItem>
                  <SelectItem value="5000">$5,000 - Premium Quality</SelectItem>
                  <SelectItem value="10000">$10,000 - Studio Quality</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs opacity-60 mt-1">
                {productionCost === 0
                  ? "Free style relies on social media, skills, and morale for streams"
                  : "Higher budget = better streaming performance"}
              </p>
            </div>
            <Button
              onClick={handleCreateSong}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500"
              disabled={!songTitle || !songGenre || (productionCost > 0 && gameState.earnings < productionCost)}
            >
              Create Song {productionCost > 0 ? `($${productionCost.toLocaleString()})` : "(Free)"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Practice Options */}
      <div className="space-y-3">
        {practiceTypes.map((practice) => {
          const Icon = practice.icon
          const currentSkill = gameState.skills[practice.id as keyof typeof gameState.skills]
          const canPractice = gameState.practicePoints >= practice.cost

          return (
            <Card key={practice.id} className="bg-blue-950/30 backdrop-blur-xl border-blue-400/20 text-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
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
            <li>• Higher skills improve song ratings and streaming performance</li>
            <li>• Balanced skills unlock collaborations with other artists</li>
            <li>• Genre-specific skills boost streaming on different platforms</li>
            <li>• Practice consistently for best results and career growth</li>
            <li>• Free style songs rely on your social media and skills for success</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
