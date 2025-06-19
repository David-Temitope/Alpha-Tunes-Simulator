"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, DollarSign, Users, Building2, Clock, CheckCircle, XCircle } from "lucide-react"
import { useGame } from "../context/game-context"

export default function ChatMessages() {
  const { gameState, respondToMessage } = useGame()

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "collaboration":
        return <Users className="w-5 h-5 text-blue-400" />
      case "feature":
        return <MessageCircle className="w-5 h-5 text-purple-400" />
      case "label_contract":
        return <Building2 className="w-5 h-5 text-yellow-400" />
      default:
        return <MessageCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getMessageColor = (type: string) => {
    switch (type) {
      case "collaboration":
        return "from-blue-600 to-cyan-600"
      case "feature":
        return "from-purple-600 to-pink-600"
      case "label_contract":
        return "from-yellow-600 to-orange-600"
      default:
        return "from-gray-600 to-slate-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2">ChatIt Messages</h2>
        <p className="text-slate-300">Industry opportunities and collaboration requests</p>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {gameState.chatMessages.length > 0 ? (
          gameState.chatMessages.map((message) => (
            <Card
              key={message.id}
              className={`bg-slate-900 border-slate-700 ${
                !message.responded ? "ring-2 ring-blue-500/50" : "opacity-75"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${getMessageColor(message.type)} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      {getMessageIcon(message.type)}
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{message.from}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-slate-700 text-slate-300 capitalize">
                          {message.type.replace("_", " ")}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {new Date(message.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {message.responded ? (
                      <Badge className="bg-green-500/20 text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Responded
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-500/20 text-blue-400">New</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Message Content */}
                <div className="p-4 bg-slate-800 rounded-lg">
                  <p className="text-slate-300">{message.message}</p>
                </div>

                {/* Offer Details */}
                {message.offer && message.offer.amount > 0 && (
                  <div className="p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">Offer Amount:</span>
                      <div className="flex items-center gap-1 text-lg font-bold text-green-400">
                        <DollarSign className="w-4 h-4" />
                        {message.offer.amount.toLocaleString()}
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{message.offer.details}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {!message.responded && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => respondToMessage(message.id, true)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => respondToMessage(message.id, false)}
                      variant="outline"
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                )}

                {message.responded && (
                  <div className="text-center py-2">
                    <span className="text-sm text-slate-400">You have already responded to this message</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="text-center py-12">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-white mb-2">No Messages Yet</h3>
              <p className="text-slate-400 mb-4">
                Build your Street Knowledge skill to start receiving collaboration offers and industry opportunities!
              </p>
              <div className="text-sm text-slate-500">
                Current Street Knowledge: {gameState.skills.streetKnowledge.toFixed(1)}/100
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-slate-900 border-slate-700">
        <CardContent className="p-4">
          <h3 className="font-bold text-white mb-2">💬 ChatIt Tips</h3>
          <ul className="text-sm space-y-1 text-slate-300">
            <li>• Higher Street Knowledge increases message frequency</li>
            <li>• Accepting offers builds your reputation and network</li>
            <li>• Declining offers may affect future opportunities</li>
            <li>• Label contracts require meeting specific requirements</li>
            <li>• Collaborations can boost your social media presence</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
