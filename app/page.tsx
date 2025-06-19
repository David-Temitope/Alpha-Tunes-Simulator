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
import { Badge } from "@/components/ui/badge"

function GameContent() {
  const { gameState, showTitheModal } = useGame()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [unreadMessages, setUnreadMessages] = useState(5) // Example state

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
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-black relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto p-4 max-w-md relative z-10">
        {/* Professional header */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-white bg-clip-text text-transparent">
            Alpha Tune
          </h1>
          <p className="text-sm text-blue-200 font-medium">Music Industry Simulator</p>
        </div>

        {/* Professional artist info bar */}
        <Card className="mb-4 bg-blue-950/50 backdrop-blur-xl border-blue-400/30 text-white shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-white">{gameState.artist.stageName}</h2>
                  <p className="text-sm text-blue-200">{gameState.artist.genre}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="font-bold text-green-400">${gameState.earnings.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-400">{gameState.fans.toLocaleString()} fans</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-blue-950/50 backdrop-blur-xl border-blue-400/30 shadow-xl mb-2">
            <TabsTrigger
              value="dashboard"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="practice"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <Mic className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="streaming"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <Headphones className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white relative"
            >
              <Users className="w-4 h-4" />
              {unreadMessages > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <User className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsList className="grid w-full grid-cols-6 bg-blue-950/50 backdrop-blur-xl border-blue-400/30 shadow-xl">
            <TabsTrigger
              value="marketplace"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <ShoppingCart className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="hustles"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <Briefcase className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="labels"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <Building2 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="finances"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
            >
              <FileText className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:shadow-lg data-[state=active]:text-white"
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
