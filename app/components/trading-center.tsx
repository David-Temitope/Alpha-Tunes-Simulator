"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { useGame } from "../context/game-context"

export default function TradingCenter() {
  const { gameState, buyTradeItem, sellTradeItem } = useGame()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [tradeQuantity, setTradeQuantity] = useState(1)
  const [tradeAction, setTradeAction] = useState<"buy" | "sell">("buy")
  const [showTradeDialog, setShowTradeDialog] = useState(false)

  const categoryIcons = {
    sneakers: "👟",
    gear: "🎧",
    beats: "🎵",
    crypto: "₿",
    vinyl: "💿",
    nft: "🖼️",
  }

  const categoryColors = {
    sneakers: "from-red-500 to-pink-500",
    gear: "from-purple-500 to-indigo-500",
    beats: "from-blue-500 to-cyan-500",
    crypto: "from-yellow-500 to-orange-500",
    vinyl: "from-green-500 to-teal-500",
    nft: "from-pink-500 to-purple-500",
  }

  const portfolioValue = gameState.tradeItems.reduce((total, item) => {
    return total + item.owned * item.currentPrice
  }, 0)

  const totalInvested = gameState.tradeItems.reduce((total, item) => {
    return total + (item.buyPrice || 0) * item.owned
  }, 0)

  const totalProfitLoss = portfolioValue - totalInvested

  const handleTrade = () => {
    if (!selectedItem) return

    const success =
      tradeAction === "buy" ? buyTradeItem(selectedItem, tradeQuantity) : sellTradeItem(selectedItem, tradeQuantity)

    if (success) {
      setShowTradeDialog(false)
      setTradeQuantity(1)
    }
  }

  const openTradeDialog = (itemId: string, action: "buy" | "sell") => {
    setSelectedItem(itemId)
    setTradeAction(action)
    setShowTradeDialog(true)
  }

  const getChartData = (item: (typeof gameState.tradeItems)[0]) => {
    return item.priceHistory.map((price, index) => ({
      time: index,
      price,
    }))
  }

  const getPriceChange = (item: (typeof gameState.tradeItems)[0]) => {
    if (item.priceHistory.length < 2) return 0
    const current = item.currentPrice
    const previous = item.priceHistory[item.priceHistory.length - 2]
    return ((current - previous) / previous) * 100
  }

  return (
    <div className="space-y-4">
      {/* Portfolio Header - Stock Market Style */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BarChart3 className="w-6 h-6 text-green-400" />
            Hustler's Market Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-blue-400" />
                <span className="text-sm opacity-80">Portfolio Value</span>
              </div>
              <div className="text-2xl font-bold text-green-400">${portfolioValue.toFixed(2)}</div>
              <div
                className={`text-sm flex items-center gap-1 ${totalProfitLoss >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {totalProfitLoss >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}$
                {Math.abs(totalProfitLoss).toFixed(2)} (
                {((totalProfitLoss / Math.max(totalInvested, 1)) * 100).toFixed(1)}%)
              </div>
            </div>

            <div className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <span className="text-sm opacity-80">Cash Balance</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">${gameState.earnings.toFixed(2)}</div>
              <div className="text-sm opacity-60">Available for trading</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <Tabs defaultValue="market" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/30 backdrop-blur-lg border-white/30">
          <TabsTrigger value="market" className="text-white data-[state=active]:bg-white/20">
            Market
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="text-white data-[state=active]:bg-white/20">
            My Holdings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4">
          {/* Market Items */}
          <div className="space-y-3">
            {gameState.tradeItems.map((item) => {
              const priceChange = getPriceChange(item)
              const chartData = getChartData(item)

              return (
                <Card
                  key={item.id}
                  className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Item Icon */}
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${categoryColors[item.category]} rounded-xl flex items-center justify-center shadow-lg text-2xl`}
                      >
                        {categoryIcons[item.category]}
                      </div>

                      {/* Item Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <Badge className="bg-white/10 text-white capitalize">{item.category}</Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">${item.currentPrice.toFixed(2)}</div>
                            <div
                              className={`text-sm flex items-center gap-1 ${priceChange >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {priceChange >= 0 ? (
                                <TrendingUp className="w-4 h-4" />
                              ) : (
                                <TrendingDown className="w-4 h-4" />
                              )}
                              {priceChange.toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        {/* Mini Chart */}
                        <div className="h-16 mb-3">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                              <Line
                                type="monotone"
                                dataKey="price"
                                stroke={priceChange >= 0 ? "#10b981" : "#ef4444"}
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => openTradeDialog(item.id, "buy")}
                            className="flex-1 bg-green-500 hover:bg-green-600"
                            disabled={gameState.earnings < item.currentPrice}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Buy
                          </Button>
                          <Button
                            onClick={() => openTradeDialog(item.id, "sell")}
                            className="flex-1 bg-red-500 hover:bg-red-600"
                            disabled={item.owned === 0}
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Sell
                          </Button>
                          {item.owned > 0 && (
                            <Badge className="bg-blue-500/20 text-blue-400 px-3 py-1">Own: {item.owned}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          {/* Portfolio Holdings */}
          <div className="space-y-3">
            {gameState.tradeItems
              .filter((item) => item.owned > 0)
              .map((item) => {
                const currentValue = item.owned * item.currentPrice
                const investedValue = item.owned * (item.buyPrice || 0)
                const profitLoss = currentValue - investedValue
                const profitLossPercent = ((profitLoss / Math.max(investedValue, 1)) * 100).toFixed(1)

                return (
                  <Card key={item.id} className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${categoryColors[item.category]} rounded-lg flex items-center justify-center text-xl`}
                          >
                            {categoryIcons[item.category]}
                          </div>
                          <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm opacity-80">Qty: {item.owned}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold">${currentValue.toFixed(2)}</div>
                          <div
                            className={`text-sm flex items-center gap-1 ${profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {profitLoss >= 0 ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                            ${Math.abs(profitLoss).toFixed(2)} ({profitLossPercent}%)
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

            {gameState.tradeItems.filter((item) => item.owned > 0).length === 0 && (
              <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
                <CardContent className="p-8 text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-bold mb-2">No Holdings Yet</h3>
                  <p className="text-sm opacity-80">Start trading to build your portfolio!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Trade Dialog */}
      <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
        <DialogContent className="bg-black/90 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>
              {tradeAction === "buy" ? "Buy" : "Sell"}{" "}
              {selectedItem ? gameState.tradeItems.find((i) => i.id === selectedItem)?.name : ""}
            </DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              {(() => {
                const item = gameState.tradeItems.find((i) => i.id === selectedItem)!
                const totalCost = item.currentPrice * tradeQuantity
                const canAfford = gameState.earnings >= totalCost
                const canSell = item.owned >= tradeQuantity

                return (
                  <>
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <span>Current Price:</span>
                      <span className="font-bold">${item.currentPrice.toFixed(2)}</span>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        max={tradeAction === "sell" ? item.owned : Math.floor(gameState.earnings / item.currentPrice)}
                        value={tradeQuantity}
                        onChange={(e) => setTradeQuantity(Number.parseInt(e.target.value) || 1)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <span>Total {tradeAction === "buy" ? "Cost" : "Value"}:</span>
                      <span className="font-bold text-lg">${totalCost.toFixed(2)}</span>
                    </div>

                    {tradeAction === "sell" && item.buyPrice && (
                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                        <span>Profit/Loss:</span>
                        <span
                          className={`font-bold ${
                            totalCost - item.buyPrice * tradeQuantity >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          ${(totalCost - item.buyPrice * tradeQuantity).toFixed(2)}
                        </span>
                      </div>
                    )}

                    <Button
                      onClick={handleTrade}
                      disabled={tradeAction === "buy" ? !canAfford : !canSell}
                      className={`w-full ${
                        tradeAction === "buy" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {tradeAction === "buy" ? "Buy" : "Sell"} {tradeQuantity} {item.name}
                    </Button>
                  </>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Market News & Tips */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">📈 Market News & Tips</h3>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Sneaker prices fluctuate based on celebrity endorsements</li>
            <li>• Studio gear holds value well but has lower volatility</li>
            <li>• Beat packs can be flipped quickly for moderate profits</li>
            <li>• GrooveCoin is highly volatile - high risk, high reward</li>
            <li>• Rare vinyl appreciates slowly but steadily</li>
            <li>• NFTs are extremely risky but can yield massive returns</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
