"use client"

import { useState } from "react"
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
      color: \"from-blue-500 to-purple-
