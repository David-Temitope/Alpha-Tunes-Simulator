"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, TrendingDown, Calendar, PieChart } from "lucide-react"
import { useGame } from "../context/game-context"

export default function FinancialStatements() {
  const { gameState } = useGame()

  // Calculate totals
  const totalIncome = gameState.financialRecords
    .filter((record) => record.type === "income")
    .reduce((sum, record) => sum + record.amount, 0)

  const totalExpenses = gameState.financialRecords
    .filter((record) => record.type === "expense")
    .reduce((sum, record) => sum + record.amount, 0)

  const netProfit = totalIncome - totalExpenses

  // Group by category
  const incomeByCategory = gameState.financialRecords
    .filter((record) => record.type === "income")
    .reduce(
      (acc, record) => {
        acc[record.category] = (acc[record.category] || 0) + record.amount
        return acc
      },
      {} as Record<string, number>,
    )

  const expensesByCategory = gameState.financialRecords
    .filter((record) => record.type === "expense")
    .reduce(
      (acc, record) => {
        acc[record.category] = (acc[record.category] || 0) + record.amount
        return acc
      },
      {} as Record<string, number>,
    )

  // Recent transactions (last 10)
  const recentTransactions = gameState.financialRecords.slice(0, 10)

  return (
    <div className="space-y-4">
      {/* Financial Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="font-bold">Total Income</span>
            </div>
            <div className="text-2xl font-bold text-green-400">${totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="font-bold">Total Expenses</span>
            </div>
            <div className="text-2xl font-bold text-red-400">${totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Net Profit */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <span className="font-bold text-lg">Net Profit/Loss</span>
            </div>
            <div className={`text-3xl font-bold ${netProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
              {netProfit >= 0 ? "+" : ""}${netProfit.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Balance */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-lg">Current Balance</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">${gameState.earnings.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown */}
      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/30 backdrop-blur-lg border-white/30">
          <TabsTrigger value="income" className="text-white data-[state=active]:bg-white/20">
            Income
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-white data-[state=active]:bg-white/20">
            Expenses
          </TabsTrigger>
          <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-white/20">
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Income Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(incomeByCategory).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="font-medium">{category}</span>
                    <Badge className="bg-green-500/20 text-green-400">${amount.toLocaleString()}</Badge>
                  </div>
                ))}
                {Object.keys(incomeByCategory).length === 0 && (
                  <p className="text-center opacity-60 py-4">No income recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-400" />
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(expensesByCategory).map(([category, amount]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="font-medium">{category}</span>
                    <Badge className="bg-red-500/20 text-red-400">${amount.toLocaleString()}</Badge>
                  </div>
                ))}
                {Object.keys(expensesByCategory).length === 0 && (
                  <p className="text-center opacity-60 py-4">No expenses recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm opacity-80">
                        Week {transaction.week} • {transaction.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${transaction.type === "income" ? "text-green-400" : "text-red-400"}`}>
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </div>
                      <div className="text-xs opacity-60">{new Date(transaction.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
                {recentTransactions.length === 0 && (
                  <p className="text-center opacity-60 py-4">No transactions recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Financial Tips */}
      <Card className="bg-black/30 backdrop-blur-lg border-white/30 text-white shadow-2xl">
        <CardContent className="p-4">
          <h3 className="font-bold mb-2">💰 Financial Tips</h3>
          <ul className="text-sm space-y-1 opacity-80">
            <li>• Track your spending to identify areas for improvement</li>
            <li>• Diversify income streams for financial stability</li>
            <li>• Invest in quality equipment to boost earning potential</li>
            <li>• Monitor streaming revenue trends across platforms</li>
            <li>• Balance side hustles with music career development</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
