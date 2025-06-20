"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Target, TrendingUp, Music, Users, DollarSign, Award, RefreshCw, AlertTriangle } from "lucide-react"
import { useGame } from "../context/game-context"

export default function HelpGuide() {
  const { resetGame } = useGame()

  const handleResetGame = () => {
    if (confirm("Are you sure you want to restart the game? All progress will be lost!")) {
      resetGame()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Reset Button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-950 to-blue-900 rounded-xl p-6 border border-blue-400/30 shadow-xl">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Game Guide & Help</h2>
          <p className="text-blue-200">Master Alpha Tune and become a music industry legend</p>
        </div>
        <Button onClick={handleResetGame} variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Restart Game
        </Button>
      </div>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-blue-950/50 backdrop-blur-xl border-blue-400/30 shadow-xl">
          <TabsTrigger
            value="getting-started"
            className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:text-white"
          >
            Getting Started
          </TabsTrigger>
          <TabsTrigger
            value="success-tips"
            className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:text-white"
          >
            Success Tips
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:text-white"
          >
            Advanced
          </TabsTrigger>
          <TabsTrigger
            value="troubleshooting"
            className="text-blue-200 data-[state=active]:bg-blue-600/50 data-[state=active]:text-white"
          >
            Help
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started">
          <div className="space-y-4">
            <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Welcome to Alpha Tune!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-blue-200">
                <p>
                  Welcome to the ultimate music industry simulation! You're about to embark on a journey from an unknown
                  artist to a global superstar. Here's how to get started:
                </p>

                <div className="space-y-3">
                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Step 1: Create Your Artist</h4>
                    <p className="text-sm text-blue-200">
                      Choose your stage name, genre, and upload a profile picture. This will be your identity in the
                      music world.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Step 2: Practice Your Skills</h4>
                    <p className="text-sm text-blue-200">
                      Use practice points to improve your Live Performance, Voice, Production, and Writing skills.
                      Higher skills = better songs!
                    </p>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Step 3: Create Your First Song</h4>
                    <p className="text-sm text-blue-200">
                      Go to the Practice tab and create your first song. Choose a catchy title and genre that matches
                      your artist style.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Step 4: Upload to Platforms</h4>
                    <p className="text-sm text-blue-200">
                      Start with free platforms like SoundVibe and Amaplay. As you earn money, unlock premium platforms
                      for higher earnings.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Step 5: Build Your Social Presence</h4>
                    <p className="text-sm text-blue-200">
                      Post regularly on social media to gain followers and influence. This directly affects your
                      streaming numbers!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="success-tips">
          <div className="space-y-4">
            <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Path to Success
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-700/30">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      Financial Management
                    </h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Start with side hustles to cover weekly expenses ($750)</li>
                      <li>• Invest in better production quality for your songs</li>
                      <li>• Save money for premium platform uploads</li>
                      <li>• Track your finances in the Financial Statements tab</li>
                      <li>• Pay your tithe for spiritual morale boosts</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-700/30">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Music className="w-4 h-4 text-purple-400" />
                      Music Strategy
                    </h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Practice consistently to improve song quality</li>
                      <li>• Invest more money in production for better streaming performance</li>
                      <li>• Upload to multiple platforms for maximum exposure</li>
                      <li>• Release songs regularly to build your catalog</li>
                      <li>• Free style songs rely on social media and skills for success</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg border border-blue-700/30">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      Social Media Growth
                    </h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Post regularly on all unlocked platforms</li>
                      <li>• Different post types have different engagement rates</li>
                      <li>• Higher engagement = more streams on your songs</li>
                      <li>• Unlock new platforms by meeting requirements</li>
                      <li>• Build influence to attract record label attention</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-700/30">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      Record Label Strategy
                    </h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Build net profit through consistent earnings</li>
                      <li>• Grow social media influence across platforms</li>
                      <li>• Release quality songs to meet catalog requirements</li>
                      <li>• Practice to improve average skill level (5, 15, 30, 50, 70, 90)</li>
                      <li>• Higher tier labels offer better revenue shares</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="space-y-4">
            <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                  Advanced Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Streaming Revenue Formula</h4>
                    <p className="text-sm text-blue-200 mb-2">Your weekly streams are calculated based on:</p>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Production cost invested in the song</li>
                      <li>• Your total social media followers</li>
                      <li>• Your social media influence level</li>
                      <li>• Your average skill level</li>
                      <li>• Your spiritual morale level</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Platform Upload Costs</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-blue-200">
                      <div>
                        <Badge className="bg-green-500/20 text-green-400 mb-1">Free</Badge>
                        <p>SoundVibe, Amaplay</p>
                      </div>
                      <div>
                        <Badge className="bg-yellow-500/20 text-yellow-400 mb-1">$50</Badge>
                        <p>TuneJam, StreamTunes</p>
                      </div>
                      <div>
                        <Badge className="bg-orange-500/20 text-orange-400 mb-1">$200</Badge>
                        <p>BeatFlow, Hypefy, ChartTopper</p>
                      </div>
                      <div>
                        <Badge className="bg-red-500/20 text-red-400 mb-1">$1000</Badge>
                        <p>CoreBeats, DuhVoes (Label Required)</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Free Style vs Paid Production</h4>
                    <p className="text-sm text-blue-200">
                      Free style songs ($0 budget) rely entirely on your social media following, skills, and spiritual
                      morale for streams. Paid production gives you a base multiplier that significantly boosts
                      streaming potential.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Trading & Business Skills</h4>
                    <p className="text-sm text-blue-200">
                      Successful trades increase your Business skill, while losses decrease it. Higher Business skill
                      improves your trading success rate and unlocks better opportunities.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Tax System</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• 9% tax on total possessions (marketplace items)</li>
                      <li>• 7% tax on weekly earnings</li>
                      <li>• Taxes increase as you become more successful</li>
                      <li>• Plan your finances accordingly</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">ChatIt Opportunities</h4>
                    <p className="text-sm text-blue-200">
                      As your Street Knowledge increases, you'll receive collaboration offers, feature requests, and
                      record label contracts through ChatIt. Your response affects your reputation!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="troubleshooting">
          <div className="space-y-4">
            <Card className="bg-blue-950/50 backdrop-blur-xl border-blue-400/30 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Common Issues & Solutions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Can't Upload Songs?</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Make sure you have created songs first</li>
                      <li>• Check if you have enough money for upload costs</li>
                      <li>• Some platforms require record label contracts</li>
                      <li>• Verify platform unlock requirements are met</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Low Streaming Numbers?</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Invest more money in song production</li>
                      <li>• Build your social media following</li>
                      <li>• Improve your skills through practice</li>
                      <li>• Maintain high spiritual morale</li>
                      <li>• Upload to multiple platforms</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Running Out of Money?</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Start with side hustles to cover expenses</li>
                      <li>• Focus on free platforms initially</li>
                      <li>• Trade carefully to build business skills</li>
                      <li>• Monitor your weekly expenses</li>
                      <li>• Build consistent streaming income</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Can't Get Record Label?</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Build net profit through consistent earnings</li>
                      <li>• Grow social media influence</li>
                      <li>• Release more quality songs</li>
                      <li>• Practice to improve average skills</li>
                      <li>• Start with lower tier labels first</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
                    <h4 className="font-semibold text-white mb-2">Game Performance Issues?</h4>
                    <ul className="text-sm text-blue-200 space-y-1">
                      <li>• Refresh the page if buttons stop working</li>
                      <li>• Clear browser cache if needed</li>
                      <li>• Use the restart button to reset progress</li>
                      <li>• Make sure JavaScript is enabled</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-700/30">
              <CardContent className="p-4">
                <h3 className="font-bold text-white mb-2">💡 Pro Tips</h3>
                <ul className="text-sm space-y-1 text-blue-200">
                  <li>• Save your progress by keeping the browser tab open</li>
                  <li>• Plan your weekly activities before clicking "Next Week"</li>
                  <li>• Balance short-term income with long-term career building</li>
                  <li>• Experiment with different strategies to find what works</li>
                  <li>• Remember: consistency is key to music industry success!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
