"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"

const baseQuality = 0.7

interface Song {
  id: string
  title: string
  genre: string
  duration: number
  artwork: string
  rating: number
  productionCost: number
  qualityMultiplier: number
}

interface StreamingPlatform {
  id: string
  name: string
  marketShare: number
  royaltyRate: number
  genrePreference: string
}

interface GameState {
  week: number
  funds: number
  energy: number
  fans: number
}

const initialSongs: Song[] = [
  {
    id: "1",
    title: "Sample Song",
    genre: "Pop",
    duration: 200,
    artwork: "",
    rating: 0.8,
    productionCost: 5000,
    qualityMultiplier: baseQuality,
  },
]

const initialPlatforms: StreamingPlatform[] = [
  {
    id: "1",
    name: "Streamify",
    marketShare: 0.5,
    royaltyRate: 0.01,
    genrePreference: "Pop",
  },
  {
    id: "2",
    name: "TuneWave",
    marketShare: 0.3,
    royaltyRate: 0.015,
    genrePreference: "Rock",
  },
  {
    id: "3",
    name: "RhythmVerse",
    marketShare: 0.2,
    royaltyRate: 0.02,
    genrePreference: "Electronic",
  },
]

const initialGameState: GameState = {
  week: 1,
  funds: 10000,
  energy: 10,
  fans: 100,
}

const StreamingPlatforms = () => {
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [platforms, setPlatforms] = useState<StreamingPlatform[]>(initialPlatforms)
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const [songTitle, setSongTitle] = useState("")
  const [songGenre, setSongGenre] = useState("Pop")
  const [songRating, setSongRating] = useState(0.5)
  const [productionCost, setProductionCost] = useState(5000)
  const [isCreatingSong, setIsCreatingSong] = useState(false)
  const [energyInvestment, setEnergyInvestment] = useState(1)

  const { toast } = useToast()

  useEffect(() => {
    // Load game state from local storage on component mount
    const storedGameState = localStorage.getItem("gameState")
    if (storedGameState) {
      setGameState(JSON.parse(storedGameState))
    }
  }, [])

  useEffect(() => {
    // Save game state to local storage whenever it changes
    localStorage.setItem("gameState", JSON.stringify(gameState))
  }, [gameState])

  const calculateEarnings = (song: Song, platform: StreamingPlatform) => {
    if (song.genre === platform.genrePreference) {
      return song.rating * platform.royaltyRate * platform.marketShare * gameState.fans * song.qualityMultiplier
    } else {
      return song.rating * platform.royaltyRate * platform.marketShare * gameState.fans * song.qualityMultiplier * 0.5
    }
  }

  const handleCreateSong = () => {
    if (gameState.funds < productionCost) {
      alert("Not enough funds to produce this song!")
      return
    }

    if (gameState.energy < energyInvestment) {
      alert("Not enough energy! Complete side hustles or advance to next week.")
      return
    }

    setIsCreatingSong(true)

    const uploadSong = async (songData: Omit<Song, "id">, energyInvestment: number) => {
      // Simulate song creation and upload
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const newSong: Song = {
            id: String(songs.length + 1),
            ...songData,
          }
          setSongs([...songs, newSong])
          setGameState({
            ...gameState,
            funds: gameState.funds - productionCost,
            energy: gameState.energy - energyInvestment,
          })
          setIsCreatingSong(false)
          toast({
            title: "Song Created!",
            description: `${songTitle} has been released.`,
          })
          resolve()
        }, 2000)
      })
    }

    uploadSong(
      {
        title: songTitle,
        genre: songGenre,
        duration: Math.floor(Math.random() * 180) + 120,
        artwork: "",
        rating: songRating,
        productionCost: productionCost,
        qualityMultiplier: baseQuality,
      },
      energyInvestment,
    )
  }

  const handleAdvanceWeek = () => {
    let totalEarnings = 0

    songs.forEach((song) => {
      platforms.forEach((platform) => {
        totalEarnings += calculateEarnings(song, platform)
      })
    })

    setGameState({
      ...gameState,
      week: gameState.week + 1,
      funds: gameState.funds + totalEarnings,
      energy: Math.min(gameState.energy + 5, 10),
    })

    toast({
      title: "Week Advanced!",
      description: `You earned $${totalEarnings.toFixed(2)} this week.`,
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Music Mogul</h1>

      {/* Game State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Week</CardTitle>
            <CardDescription>Current week in the game.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{gameState.week}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funds</CardTitle>
            <CardDescription>Available funds for song production.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${gameState.funds.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy</CardTitle>
            <CardDescription>Energy available for song creation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={(gameState.energy / 10) * 100} />
              <p className="text-sm text-muted-foreground">{gameState.energy} / 10</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fans</CardTitle>
            <CardDescription>Your loyal fan base.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{gameState.fans}</p>
          </CardContent>
        </Card>
      </div>

      {/* Song Creation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Song</CardTitle>
          <CardDescription>Produce a new song to gain fans and funds.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Song Title</Label>
            <Input
              id="title"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <select
              id="genre"
              value={songGenre}
              onChange={(e) => setSongGenre(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white rounded"
            >
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Electronic">Electronic</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Country">Country</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Song Rating</Label>
            <Slider
              id="rating"
              defaultValue={[songRating * 100]}
              max={100}
              step={1}
              onValueChange={(value) => setSongRating(value[0] / 100)}
              className="bg-gray-800"
            />
            <p className="text-xs text-gray-400">
              Set the potential rating of the song. Current rating: {songRating.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Production Cost</Label>
            <Input
              id="cost"
              type="number"
              value={productionCost}
              onChange={(e) => setProductionCost(Number.parseInt(e.target.value) || 5000)}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-400">Set the production cost for the song.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="energy">Energy Investment (1-{gameState.energy})</Label>
            <Input
              id="energy"
              type="number"
              min="1"
              max={gameState.energy}
              value={energyInvestment}
              onChange={(e) =>
                setEnergyInvestment(Math.max(1, Math.min(gameState.energy, Number.parseInt(e.target.value) || 1)))
              }
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-400">
              More energy = higher song quality. Current energy: {gameState.energy}
            </p>
          </div>
          <Button
            onClick={handleCreateSong}
            disabled={isCreatingSong}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            {isCreatingSong ? "Creating..." : "Create Song"}
          </Button>
        </CardContent>
      </Card>

      {/* Song List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Songs</CardTitle>
          <CardDescription>List of your created songs.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Production Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {songs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <TableCell>{song.duration} seconds</TableCell>
                  <TableCell>{song.rating.toFixed(2)}</TableCell>
                  <TableCell>${song.productionCost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Streaming Platforms */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Streaming Platforms</CardTitle>
          <CardDescription>List of available streaming platforms and their preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Market Share</TableHead>
                <TableHead>Royalty Rate</TableHead>
                <TableHead>Genre Preference</TableHead>
                <TableHead>Earnings/Week</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platforms.map((platform) => (
                <TableRow key={platform.id}>
                  <TableCell>{platform.name}</TableCell>
                  <TableCell>{platform.marketShare * 100}%</TableCell>
                  <TableCell>{platform.royaltyRate}</TableCell>
                  <TableCell>{platform.genrePreference}</TableCell>
                  <TableCell>${songs.reduce((total, song) => total + calculateEarnings(song, platform), 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Advance Week */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-blue-500 text-white hover:bg-blue-600">Advance Week</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Advance to Next Week?</AlertDialogTitle>
            <AlertDialogDescription>
              Advancing to the next week will calculate your earnings and consume energy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAdvanceWeek}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default StreamingPlatforms
