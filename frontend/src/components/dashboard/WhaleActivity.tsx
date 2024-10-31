"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface WhaleTransaction {
  type: "buy" | "sell"
  amount: number
  token: string
  value: number
  wallet: string
  time: string
}

const mockTransactions: WhaleTransaction[] = [
  {
    type: "buy",
    amount: 25000,
    token: "SOL",
    value: 4247500,
    wallet: "8xxa...3j9k",
    time: "2m ago"
  },
  {
    type: "sell",
    amount: 150000,
    token: "BONK",
    value: 1800000,
    wallet: "4zzx...7h2d",
    time: "5m ago"
  },
  {
    type: "buy",
    amount: 10000,
    token: "RAY",
    value: 34500,
    wallet: "2yya...9f4k",
    time: "12m ago"
  },
  {
    type: "sell",
    amount: 15000,
    token: "SOL",
    value: 2549100,
    wallet: "6kka...1h8j",
    time: "15m ago"
  }
]

export function WhaleActivity() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Whale Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((tx, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {tx.type === "buy" ? (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <div className="font-medium">
                    {tx.type === "buy" ? "Bought" : "Sold"} {tx.amount.toLocaleString()} {tx.token}
                  </div>
                  <div className="text-sm text-gray-400">
                    {tx.wallet} • {tx.time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${tx.value.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Value</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
