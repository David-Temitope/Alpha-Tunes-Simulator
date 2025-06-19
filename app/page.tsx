"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mic,
  Users,
  DollarSign,
  Headphones,
  TrendingUp,
  ShoppingCart,
  User,
  Briefcase,
  BarChart3,
  FileText,
  Building2,
  HelpCircle,
} from "lucide-react"
import ArtistCreation from "./components/artist-creation"
import Dashboard from "./components/dashboard"
import PracticeSystem from "./components/practice-system"
import StreamingPlatforms from "./components/streaming-platforms"
import SocialMedia from "./components/social-media"
import Marketplace from "./components/marketplace"
import ArtistProfile from "./components/artist-profile"
import SideHustles from "./components/side-hustles"
import TradingCenter from "./components/trading-center"
import FinancialStatements from "./components/financial-statements"
import TitheModal from "./components/tithe-modal"
import { GameProvider, useGame } from "./context/game-context"
import RecordLabels from "./components/record-labels"
import HelpGuide from "./components/help-guide"

function GameContent() {
  const { gameState, showTitheModal } = useGame()
  const [activeTab, setActiveTab] = useState("dashboard")

  // ---------- Background music (with compatibility checks) ----------
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Skip entirely if the browser can’t decode MP3
    const testAudio = document.createElement("audio")
    if (!testAudio.canPlayType?.("audio/mpeg")) return

    // Lazily create the Audio element once we know MP3 is supported
    audioRef.current = new Audio()
    audioRef.current.src = "/audio/hope.mp3"
    audioRef.current.preload = "auto"
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Only play after the first user gesture
    const playAudio = () => {
      audioRef.current?.play().catch((err) => console.warn("Audio play failed:", err))
    }

    document.addEventListener("click", playAudio, { once: true })
    document.addEventListener("keydown", playAudio, { once: true })

    return () => {
      audioRef.current?.pause()
      document.removeEventListener("click", playAudio)
      document.removeEventListener("keydown", playAudio)
    }
  }, [])
  // ------------------------------------------------------------------

  if (!gameState.artist.stageName) {
    return <ArtistCreation />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="container mx-auto p-4 max-w-md relative z-10">
        {/* Header with 3D effect */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
            Alpha Tune
          </h1>
          <p className="text-sm opacity-80 drop-shadow-lg">Rise to Stardom</p>
        </div>

        {/* Artist Info Bar with 3D styling */}
        <Card className="mb-4 bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg drop-shadow-lg">{gameState.artist.stageName}</h2>
                  <p className="text-sm opacity-80">{gameState.artist.genre}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="font-bold text-green-400 drop-shadow-lg">
                    ${gameState.earnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">{gameState.fans.toLocaleString()} fans</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs with 3D effect */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/30 backdrop-blur-lg border-white/30 shadow-xl mb-2">
            <TabsTrigger
              value="dashboard"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <TrendingUp className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="practice"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <Mic className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="streaming"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <Headphones className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <Users className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <User className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsList className="grid w-full grid-cols-6 bg-black/30 backdrop-blur-lg border-white/30 shadow-xl">
            <TabsTrigger
              value="marketplace"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="hustles"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <Briefcase className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <BarChart3 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="labels"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <Building2 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="finances"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <FileText className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <HelpCircle className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="practice">
            <PracticeSystem />
          </TabsContent>

          <TabsContent value="streaming">
            <StreamingPlatforms />
          </TabsContent>

          <TabsContent value="social">
            <SocialMedia />
          </TabsContent>

          <TabsContent value="marketplace">
            <Marketplace />
          </TabsContent>

          <TabsContent value="hustles">
            <SideHustles />
          </TabsContent>

          <TabsContent value="trading">
            <TradingCenter />
          </TabsContent>

          <TabsContent value="labels">
            <RecordLabels />
          </TabsContent>

          <TabsContent value="finances">
            <FinancialStatements />
          </TabsContent>

          <TabsContent value="help">
            <HelpGuide />
          </TabsContent>

          <TabsContent value="profile">
            <ArtistProfile />
          </TabsContent>
        </Tabs>

        {/* Tithe Modal */}
        {showTitheModal && <TitheModal />}
      </div>
    </div>
  )
}

export default function AlphaTuneGame() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  )
}
