"use client"

import type React from "react"
import { useEffect } from "react"

interface SocialPlatform {
  id: string
  name: string
  icon: string
  followers: number
  influence: number
  unlocked: boolean
}

interface Song {
  id: string
  title: string
  streams: { [platformId: string]: number }
}

interface GameState {
  socialPlatforms: SocialPlatform[]
  songs: Song[]
  recordLabel: string | null
  fans: number
}

interface SocialMediaProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
}

const SocialMedia: React.FC<SocialMediaProps> = ({ gameState, setGameState }) => {
  useEffect(() => {
    const totalFollowers = gameState.socialPlatforms.reduce((total, p) => total + p.followers, 0)
    const totalInfluence = gameState.socialPlatforms.reduce((total, p) => total + p.influence, 0)
    const totalStreams = gameState.songs.reduce((total, song) => {
      return total + Object.values(song.streams).reduce((songTotal, streams) => songTotal + streams, 0)
    }, 0)

    // Check unlock conditions
    const unlockConditions = {
      gramsta: totalFollowers >= 500,
      twix: totalInfluence >= 50,
      reelify: totalStreams >= 1000,
      streamline: gameState.recordLabel !== null,
      beatbase: gameState.fans >= 10000,
    }

    // Update unlocked platforms
    setGameState((prev) => ({
      ...prev,
      socialPlatforms: prev.socialPlatforms.map((platform) => ({
        ...platform,
        unlocked: platform.unlocked || unlockConditions[platform.id as keyof typeof unlockConditions] || false,
      })),
    }))
  }, [gameState.socialPlatforms, gameState.songs, gameState.recordLabel, gameState.fans])

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Social Media</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gameState.socialPlatforms.map((platform) => (
          <div
            key={platform.id}
            className={`border rounded-lg p-3 ${platform.unlocked ? "border-green-500" : "border-gray-300"}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-semibold">{platform.name}</h3>
                {platform.unlocked ? (
                  <>
                    <p className="text-sm text-gray-600">Followers: {platform.followers}</p>
                    <p className="text-sm text-gray-600">Influence: {platform.influence}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-600">Locked</p>
                )}
              </div>
              <div className="text-4xl">{platform.icon}</div>
            </div>
            {!platform.unlocked && (
              <div className="text-xs text-gray-500 mt-2">
                {platform.id === "gramsta" && "Unlock: 500 total followers"}
                {platform.id === "twix" && "Unlock: 50 influence points"}
                {platform.id === "reelify" && "Unlock: 1,000 total streams"}
                {platform.id === "streamline" && "Unlock: Sign with record label"}
                {platform.id === "beatbase" && "Unlock: 10,000 fans"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SocialMedia
