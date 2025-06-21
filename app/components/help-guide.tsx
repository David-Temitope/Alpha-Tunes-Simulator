"use client"

import type React from "react"

import { Volume2, VolumeX } from "lucide-react"
import { useGame } from "../context/game-context"
import { Button } from "@/components/ui/button"

interface HelpGuideProps {
  onClose: () => void
}

const HelpGuide: React.FC<HelpGuideProps> = ({ onClose }) => {
  const { translation, gameState, toggleMusic } = useGame()

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75">
      <div className="relative mx-auto mt-20 max-w-3xl rounded-lg bg-gray-900 p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-4 text-center text-2xl font-bold text-white">{translation.helpGuide}</h2>

        <div className="mb-6 flex justify-center">
          <Button onClick={toggleMusic} variant="outline" className="flex items-center gap-2">
            {gameState.musicMuted ? (
              <>
                <Volume2 className="h-4 w-4" />
                {translation.unmuteMusic}
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                {translation.muteMusic}
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">{translation.gameplayBasics}</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• {translation.startAsAspiring}</p>
            <p>• {translation.buildYourSkills}</p>
            <p>• {translation.releaseSingles}</p>
            <p>• {translation.gainFans}</p>
            <p>• {translation.signWithLabel}</p>
            <p>• {translation.becomeSuperstar}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">{translation.statsAndAttributes}</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• {translation.talentDescription}</p>
            <p>• {translation.influenceDescription}</p>
            <p>• {translation.styleDescription}</p>
            <p>• {translation.lyricismDescription}</p>
            <p>• {translation.productionDescription}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">{translation.monetization}</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• {translation.streamsDescription}</p>
            <p>• {translation.merchandiseDescription}</p>
            <p>• {translation.endorsementsDescription}</p>
            <p>• {translation.liveShowsDescription}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">Building Street Knowledge</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Work as Waiter/Waitress (+0.5 per week)</p>
            <p>• Delivery Rider job (+0.8 per week)</p>
            <p>• Open Mic Performer (+1.2 per week)</p>
            <p>• Street knowledge helps with fan connection and authenticity</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-300">Unlocking Social Media Platforms</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Gramsta: Reach 500 total followers across platforms</p>
            <p>• TwiX: Achieve 50+ influence points</p>
            <p>• Reelify: Get 1,000+ total streams</p>
            <p>• Streamline: Sign with a record label</p>
            <p>• Beatbase: Reach 10,000+ fans</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpGuide
