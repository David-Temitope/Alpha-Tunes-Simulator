"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Heart, Share, TrendingUp, Zap, Lock, Plus } from "lucide-react"
import { useGame } from "../context/game-context"

export default function SocialMedia() {
  const { gameState, createSocialPost, spendMarketingPoints } = useGame()
  const [selectedPlatform, setSelectedPlatform] = useState("fakebook")
  const [showPostDialog, setShowPostDialog] = useState(false)
  const [postContent, setPostContent] = useState("")
  const [postType, setPostType] = useState("status")

  const platformIcons = {
    fakebook: "📘",
    chatit: "💬",
    gramsta: "📸",
    twix: "🐦",
    reelify: "🎬",
    streamline: "🎵",
    beatbase: "🎼",
  }

  const platformColors = {
    fakebook: "from-blue-600 to-blue-800",
    chatit: "from-green-500 to-green-700",
    gramsta: "from-pink-500 to-purple-600",
    twix: "from-sky-400 to-blue-500",
    reelify: "from-red-500 to-pink-500",
    streamline: "from-purple-500 to-indigo-600",
    beatbase: "from-orange-500 to-red-600",
  }

  const postTypes = {
    status: "Status Update",
    photo: "Photo Post",
    video: "Video Post",
    announcement: "Announcement",
    behind_scenes: "Behind the Scenes",
    song_promo: "Song Promotion",
  }

  const currentPlatform = gameState.socialPlatforms.find((p) => p.id === selectedPlatform)

  const handleCreatePost = () => {
    if (postContent && currentPlatform && gameState.marketingPoints > 0) {
      createSocialPost(selectedPlatform, postContent, postType)
      setPostContent("")
      setShowPostDialog(false)
    }
  }

  const getUnlockCondition = (platformId: string) => {
    switch (platformId) {
      case "gramsta":
        return "Upload 1 song with 10k+ streams"
      case "twix":
        return "Collaborate with another artist"
      case "reelify":
        return "Upload 3 songs"
      case "streamline":
        return "Sign to a record label"
      case "beatbase":
        return "Earn $10,000 total"
      default:
        return "Available from start"
    }
  }

  return (
    <div className="space-y-4">
      {/* Marketing Points Header */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">Marketing Points</span>
            </div>
            <span className="text-lg font-bold text-yellow-400">{gameState.marketingPoints}/5</span>
          </div>
          <p className="text-xs opacity-80 mt-1">Resets every week • 1 point per post</p>
        </CardContent>
      </Card>

      {/* Platform Selection */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Social Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {gameState.socialPlatforms.map((platform) => (
              <Button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                disabled={!platform.unlocked}
                className={`h-auto p-3 ${
                  selectedPlatform === platform.id
                    ? `bg-gradient-to-r ${platformColors[platform.id as keyof typeof platformColors]} shadow-lg`
                    : "bg-white/10 hover:bg-white/20"
                } ${!platform.unlocked ? "opacity-50" : ""}`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">
                    {platform.unlocked ? platformIcons[platform.id as keyof typeof platformIcons] : "🔒"}
                  </div>
                  <div className="text-sm font-bold">{platform.name}</div>
                  <div className="text-xs opacity-80">{platform.followers.toLocaleString()} followers</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Platform Details */}
      {currentPlatform && (
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{platformIcons[currentPlatform.id as keyof typeof platformIcons]}</span>
              {currentPlatform.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentPlatform.unlocked ? (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-400">
                      <Users className="w-5 h-5" />
                      {currentPlatform.followers.toLocaleString()}
                    </div>
                    <p className="text-xs opacity-80">Followers</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-pink-400">
                      <Heart className="w-5 h-5" />
                      {currentPlatform.engagement}%
                    </div>
                    <p className="text-xs opacity-80">Engagement</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center justify-center gap-1 text-lg font-bold text-yellow-400">
                      <TrendingUp className="w-5 h-5" />
                      {currentPlatform.influence}
                    </div>
                    <p className="text-xs opacity-80">Influence</p>
                  </div>
                </div>

                <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full bg-gradient-to-r ${platformColors[currentPlatform.id as keyof typeof platformColors]} shadow-lg`}
                      disabled={gameState.marketingPoints === 0}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-black/90 border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle>Create Post on {currentPlatform.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Post Type</label>
                        <Select value={postType} onValueChange={setPostType}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(postTypes).map(([key, label]) => (
                              <SelectItem key={key} value={key}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <Input
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="What's happening?"
                          maxLength={280}
                        />
                        <p className="text-xs opacity-60 mt-1">{postContent.length}/280 characters</p>
                      </div>
                      <Button
                        onClick={handleCreatePost}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                        disabled={!postContent || gameState.marketingPoints === 0}
                      >
                        Post (1 Marketing Point)
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Recent Posts */}
                <div className="mt-4">
                  <h4 className="font-bold mb-3">Recent Posts</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {currentPlatform.posts.length > 0 ? (
                      currentPlatform.posts.map((post) => (
                        <div key={post.id} className="p-3 bg-white/10 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-purple-500/20 text-purple-400">
                              {postTypes[post.type as keyof typeof postTypes]}
                            </Badge>
                            <span className="text-xs opacity-60">{new Date(post.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm mb-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-xs opacity-80">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share className="w-3 h-3" />
                              {post.shares}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center opacity-60 py-4">No posts yet. Create your first post!</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="font-bold mb-2">Platform Locked</h3>
                <p className="text-sm opacity-80">{getUnlockCondition(currentPlatform.id)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Social Media Tips */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">📱 Social Media Tips</h3>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Post regularly to maintain engagement</li>
            <li>• Different platforms have different audiences</li>
            <li>• High engagement boosts streaming numbers</li>
            <li>• Viral posts can lead to sudden fan growth</li>
            <li>• Cross-platform posting unlocks with Social Media Manager</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
