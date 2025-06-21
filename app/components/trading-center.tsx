"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TradeItem {
  id: string
  name: string
  currentPrice: number
  trend: "up" | "down" | "neutral"
  owned: number
  buyPrice?: number
  volume24h?: number
  marketCap?: number
  volatility: number
  priceHistory: number[]
}

interface GameState {
  earnings: number
  tradeItems: TradeItem[]
}

const TradingCenter = () => {
  const [gameState, setGameState] = useState<GameState>({
    earnings: 10000,
    tradeItems: [
      {
        id: "item1",
        name: "TechCorp",
        currentPrice: 150.25,
        trend: "up",
        owned: 0,
        buyPrice: undefined,
        volume24h: 500000,
        marketCap: 1000000000,
        volatility: 0.02,
        priceHistory: Array.from({ length: 30 }, () => 150 + (Math.random() - 0.5) * 10),
      },
      {
        id: "item2",
        name: "EnviroGreen",
        currentPrice: 75.5,
        trend: "down",
        owned: 0,
        buyPrice: undefined,
        volume24h: 300000,
        marketCap: 500000000,
        volatility: 0.015,
        priceHistory: Array.from({ length: 30 }, () => 75 + (Math.random() - 0.5) * 5),
      },
      {
        id: "item3",
        name: "MediPlus",
        currentPrice: 220.75,
        trend: "neutral",
        owned: 0,
        buyPrice: undefined,
        volume24h: 750000,
        marketCap: 1500000000,
        volatility: 0.025,
        priceHistory: Array.from({ length: 30 }, () => 220 + (Math.random() - 0.5) * 15),
      },
    ],
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGameState((prevGameState) => {
        const updatedTradeItems = prevGameState.tradeItems.map((item) => {
          const randomChange = (Math.random() - 0.5) * item.volatility * item.currentPrice
          const newPrice = Math.max(1, item.currentPrice + randomChange) // Ensure price doesn't go below 1
          const trendChange = newPrice > item.currentPrice ? "up" : newPrice < item.currentPrice ? "down" : "neutral"

          const newPriceHistory = [...item.priceHistory.slice(1), newPrice]

          return {
            ...item,
            currentPrice: newPrice,
            trend: trendChange,
            priceHistory: newPriceHistory,
          }
        })

        return {
          ...prevGameState,
          tradeItems: updatedTradeItems,
        }
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  const handleBuy = (itemId: string) => {
    setGameState((prevGameState) => {
      const itemIndex = prevGameState.tradeItems.findIndex((item) => item.id === itemId)
      if (itemIndex === -1) {
        return prevGameState
      }

      const item = prevGameState.tradeItems[itemIndex]
      if (prevGameState.earnings < item.currentPrice) {
        return prevGameState
      }

      const updatedItems = [...prevGameState.tradeItems]
      const updatedItem = { ...item }

      const currentOwned = updatedItem.owned || 0
      const currentBuyPrice = updatedItem.buyPrice || 0

      const totalCost = item.currentPrice
      const newOwned = currentOwned + 1
      const newBuyPrice = (currentBuyPrice * currentOwned + item.currentPrice) / newOwned

      updatedItem.owned = newOwned
      updatedItem.buyPrice = newBuyPrice
      updatedItems[itemIndex] = updatedItem

      return {
        ...prevGameState,
        earnings: prevGameState.earnings - totalCost,
        tradeItems: updatedItems,
      }
    })
  }

  const handleSell = (itemId: string) => {
    setGameState((prevGameState) => {
      const itemIndex = prevGameState.tradeItems.findIndex((item) => item.id === itemId)
      if (itemIndex === -1) {
        return prevGameState
      }

      const item = prevGameState.tradeItems[itemIndex]
      if (item.owned === 0) {
        return prevGameState
      }

      const updatedItems = [...prevGameState.tradeItems]
      const updatedItem = { ...item }

      updatedItem.owned = item.owned - 1
      const earnings = prevGameState.earnings + item.currentPrice
      updatedItems[itemIndex] = updatedItem

      return {
        ...prevGameState,
        earnings: earnings,
        tradeItems: updatedItems,
      }
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-white">Trading Center</h1>
      <div className="mb-4">
        <span className="text-gray-400">Current Earnings:</span>
        <span className="text-white font-mono">${gameState.earnings.toFixed(2)}</span>
      </div>

      {/* Add market trend indicators and volume information: */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gameState.tradeItems.map((item) => (
          <Card key={item.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white capitalize">{item.name}</h3>
                <div
                  className={`px-2 py-1 rounded text-xs ${
                    item.trend === "up"
                      ? "bg-green-900 text-green-300"
                      : item.trend === "down"
                        ? "bg-red-900 text-red-300"
                        : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"} {item.trend.toUpperCase()}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Price:</span>
                  <span className="text-white font-mono">${item.currentPrice.toFixed(2)}</span>
                </div>

                {item.owned > 0 && item.buyPrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Buy Price:</span>
                    <span className="text-white font-mono">${item.buyPrice.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-400">24h Volume:</span>
                  <span className="text-white font-mono">${(item.volume24h || 0).toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap:</span>
                  <span className="text-white font-mono">${(item.marketCap || 0).toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Volatility:</span>
                  <span className="text-white">{(item.volatility * 100).toFixed(1)}%</span>
                </div>

                {item.owned > 0 && (
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-400">Owned:</span>
                    <span className="text-white">{item.owned}</span>
                  </div>
                )}
              </div>

              {/* Price chart simulation */}
              <div className="mt-3 h-16 bg-gray-900 rounded flex items-end justify-between px-1">
                {item.priceHistory.slice(-10).map((price, index) => {
                  const maxPrice = Math.max(...item.priceHistory.slice(-10))
                  const minPrice = Math.min(...item.priceHistory.slice(-10))
                  const height = ((price - minPrice) / (maxPrice - minPrice)) * 100
                  return (
                    <div
                      key={index}
                      className={`w-2 rounded-t ${
                        index === item.priceHistory.slice(-10).length - 1
                          ? item.trend === "up"
                            ? "bg-green-500"
                            : item.trend === "down"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          : "bg-gray-600"
                      }`}
                      style={{ height: `${Math.max(height, 5)}%` }}
                    />
                  )
                })}
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleBuy(item.id)}
                  disabled={gameState.earnings < item.currentPrice}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Buy ${item.currentPrice.toFixed(2)}
                </Button>
                <Button
                  onClick={() => handleSell(item.id)}
                  disabled={item.owned === 0}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  Sell
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default TradingCenter
