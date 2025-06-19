# Alpha Tune Android App

This is the Android version of Alpha Tune - Music Industry Simulator Game.

## Setup Instructions

1. **Prerequisites**
   - Android Studio Arctic Fox or later
   - Android SDK 21+ (Android 5.0+)
   - Java 8 or later
   - Kotlin 1.9.10+

2. **Configuration**
   - Replace `https://your-vercel-app.vercel.app` in `MainActivity.kt` with your actual Vercel URL
   - Update the `android:host` in `AndroidManifest.xml` with your domain
   - Generate a keystore for release signing

3. **Building**
   \`\`\`bash
   # Debug build
   ./gradlew assembleDebug
   
   # Release AAB (for Play Store)
   ./gradlew bundleRelease
   
   # Release APK
   ./gradlew assembleRelease
   \`\`\`

4. **Keystore Generation**
   \`\`\`bash
   keytool -genkey -v -keystore app/keystore/release.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
   \`\`\`

5. **Play Store Submission**
   - Use the generated AAB file from `app/build/outputs/bundle/release/`
   - Upload to Google Play Console
   - Complete store listing with screenshots and descriptions

## Features

- **Trusted Web Activity (TWA)** for native app experience
- **Offline support** with local storage
- **Push notifications** for game events
- **Immersive fullscreen** gaming experience
- **Professional UI** optimized for mobile
- **Auto-save** game progress locally

## App Store Assets Needed

1. **App Icon** (512x512 PNG)
2. **Feature Graphic** (1024x500 PNG)
3. **Screenshots** (Phone: 1080x1920, Tablet: 1200x1920)
4. **Privacy Policy** URL
5. **App Description** and metadata

## Technical Details

- **Minimum SDK**: 21 (Android 5.0)
- **Target SDK**: 34 (Android 14)
- **Architecture**: WebView + TWA hybrid
- **Size**: ~5MB (excluding web assets)
- **Permissions**: Internet, Network State, Storage (for offline caching)
\`\`\`

Now let's add the achievement notification system to the main page:

```typescriptreact file="app/page.tsx"
[v0-no-op-code-block-prefix]"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Users, DollarSign, Headphones, TrendingUp, ShoppingCart, User, Briefcase, BarChart3, FileText, Building2, HelpCircle } from 'lucide-react'
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
import AchievementNotification from "./components/achievement-notification"

function GameContent() {
  const { gameState, showTitheModal } = useGame()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newAchievements, setNewAchievements] = useState<string[]>([])
  const [unreadMessages, setUnreadMessages] = useState(0)

  // Check for unread messages
  useEffect(() => {
    const unread = gameState.chatMessages.filter(m => !m.responded).length
    setUnreadMessages(unread)
  }, [gameState.chatMessages])

  const handleDismissAchievement = (achievementId: string) => {
    setNewAchievements(prev => prev.filter(id => id !== achievementId))
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto p-4 max-w-md relative z-10">
        {/* Professional header */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Alpha Tune
          </h1>
          <p className="text-sm text-gray-300 font-medium">Music Industry Simulator</p>
        </div>

        {/* Professional artist info bar */}
        <Card className="mb-4 bg-white/10 backdrop-blur-xl border-white/20 text-white shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">{gameState.artist.stageName}</h2>
                  <p className="text-sm text-gray-300">{gameState.artist.genre}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-emerald-400">
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
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl mb-2">
            <TabsTrigger
              value="dashboard"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <TrendingUp className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="practice"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <Mic className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="streaming"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <Headphones className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg relative"
            >
              <Users className="w-4 h-4" />
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <User className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-xl">
            <TabsTrigger
              value="marketplace"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <ShoppingCart className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="hustles"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <Briefcase className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <BarChart3 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="labels"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <Building2 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="finances"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
            >
              <FileText className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg data-[state=active]:text-blue-400"
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

        {/* Achievement Notifications */}
        <AchievementNotification
          achievements={newAchievements}
          onDismiss={handleDismissAchievement}
        />

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
