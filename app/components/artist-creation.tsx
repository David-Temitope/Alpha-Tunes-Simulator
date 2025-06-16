"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Music } from "lucide-react"
import { useGame } from "../context/game-context"

export default function ArtistCreation() {
  const { gameState, setGameState } = useGame()
  const [formData, setFormData] = useState({
    originalName: "",
    stageName: "",
    email: "",
    genre: "",
  })

  const genres = ["Hip-Hop", "Gospel", "Afrobeat", "Pop", "R&B", "Rock", "Electronic", "Country"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.originalName && formData.stageName && formData.email && formData.genre) {
      setGameState({
        ...gameState,
        artist: formData,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/20 border-white/20 text-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Music className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Create Your Artist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="originalName">Original Name</Label>
              <Input
                id="originalName"
                value={formData.originalName}
                onChange={(e) => setFormData({ ...formData, originalName: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Your real name"
                required
              />
            </div>

            <div>
              <Label htmlFor="stageName">Stage Name</Label>
              <Input
                id="stageName"
                value={formData.stageName}
                onChange={(e) => setFormData({ ...formData, stageName: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Your artist name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select your genre" />
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold"
            >
              Start Your Journey
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
