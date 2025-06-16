"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Guitar, Home, Car, DollarSign, Check, Lock } from "lucide-react"
import { useGame } from "../context/game-context"

export default function Marketplace() {
  const { gameState, purchaseItem } = useGame()
  const [selectedCategory, setSelectedCategory] = useState<"instrument" | "property" | "vehicle">("instrument")

  const categoryIcons = {
    instrument: Guitar,
    property: Home,
    vehicle: Car,
  }

  const categoryColors = {
    instrument: "from-purple-500 to-pink-500",
    property: "from-green-500 to-blue-500",
    vehicle: "from-orange-500 to-red-500",
  }

  const filteredItems = gameState.marketplaceItems.filter((item) => item.category === selectedCategory)

  const handlePurchase = (itemId: string) => {
    const success = purchaseItem(itemId)
    if (success) {
      // Could add success animation or notification here
    }
  }

  const canAfford = (price: number) => gameState.earnings >= price

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-yellow-400" />
            Marketplace
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span>Your Balance:</span>
            <div className="flex items-center gap-1 text-lg font-bold text-green-400">
              <DollarSign className="w-5 h-5" />
              {gameState.earnings.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as typeof selectedCategory)}>
        <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-lg border-white/30">
          {Object.entries(categoryIcons).map(([category, Icon]) => (
            <TabsTrigger
              key={category}
              value={category}
              className="text-white data-[state=active]:bg-white/20 data-[state=active]:shadow-lg"
            >
              <Icon className="w-4 h-4 mr-2" />
              {category.charAt(0).toUpperCase() + category.slice(1)}s
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Items Grid */}
        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid gap-4">
            {filteredItems.map((item) => {
              const affordable = canAfford(item.price)
              const Icon = categoryIcons[item.category]

              return (
                <Card
                  key={item.id}
                  className={`bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                    item.owned ? "ring-2 ring-green-400" : ""
                  } ${!affordable && !item.owned ? "opacity-60" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Item Image */}
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover border-2 border-white/20"
                        />
                        {item.owned && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-sm opacity-80">{item.description}</p>
                          </div>
                          <div
                            className={`w-10 h-10 bg-gradient-to-r ${categoryColors[item.category]} rounded-lg flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        {/* Effect Badge */}
                        <Badge className="mb-3 bg-blue-500/20 text-blue-400">{item.effect}</Badge>

                        {/* Price and Purchase */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className={`font-bold text-lg ${affordable ? "text-green-400" : "text-red-400"}`}>
                              {item.price.toLocaleString()}
                            </span>
                          </div>

                          {item.owned ? (
                            <Badge className="bg-green-500/20 text-green-400">
                              <Check className="w-4 h-4 mr-1" />
                              Owned
                            </Badge>
                          ) : (
                            <Button
                              onClick={() => handlePurchase(item.id)}
                              disabled={!affordable}
                              className={`bg-gradient-to-r ${categoryColors[item.category]} hover:opacity-80 disabled:opacity-50 shadow-lg`}
                            >
                              {affordable ? (
                                <>
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Buy
                                </>
                              ) : (
                                <>
                                  <Lock className="w-4 h-4 mr-1" />
                                  Can't Afford
                                </>
                              )}
                            </Button>
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
      </Tabs>

      {/* Owned Items Summary */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400" />
            Your Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(categoryIcons).map(([category, Icon]) => {
              const ownedCount = gameState.marketplaceItems.filter(
                (item) => item.category === category && item.owned,
              ).length
              const totalCount = gameState.marketplaceItems.filter((item) => item.category === category).length

              return (
                <div key={category} className="text-center p-3 bg-white/10 rounded-lg">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="font-bold">
                    {ownedCount}/{totalCount}
                  </div>
                  <p className="text-xs opacity-80 capitalize">{category}s</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Tips */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">🛒 Shopping Tips</h3>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Instruments boost specific skills permanently</li>
            <li>• Properties increase practice efficiency</li>
            <li>• Vehicles enhance tour earnings and fan attraction</li>
            <li>• Higher-tier items provide better bonuses</li>
            <li>• Some items unlock special features</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
