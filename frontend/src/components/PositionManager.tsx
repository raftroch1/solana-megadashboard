"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Position {
  id: string
  type: "long" | "short"
  size: number
  leverage: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercentage: number
  liquidationPrice: number
  stopLoss?: number
  takeProfit?: number
}

const mockPositions: Position[] = [
  {
    id: "1",
    type: "long",
    size: 1.5,
    leverage: 3,
    entryPrice: 165.20,
    currentPrice: 169.94,
    pnl: 7.11,
    pnlPercentage: 2.87,
    liquidationPrice: 155.20,
    stopLoss: 160.00,
    takeProfit: 180.00
  },
  {
    id: "2",
    type: "short",
    size: 0.5,
    leverage: 2,
    entryPrice: 172.50,
    currentPrice: 169.94,
    pnl: 1.28,
    pnlPercentage: 1.49,
    liquidationPrice: 181.50
  }
]

export default function PositionManager() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Open Positions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPositions.map((position) => (
            <Card 
              key={position.id} 
              className="bg-gray-700 border-gray-600"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {position.type === "long" ? (
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium">
                      {position.type === "long" ? "Long" : "Short"} {position.size} SOL
                    </span>
                  </div>
                  <span className={`text-sm ${position.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                    ${position.pnl.toFixed(2)} ({position.pnlPercentage.toFixed(2)}%)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Entry Price</div>
                    <div>${position.entryPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Current Price</div>
                    <div>${position.currentPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Leverage</div>
                    <div>{position.leverage}x</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Liquidation</div>
                    <div>${position.liquidationPrice.toFixed(2)}</div>
                  </div>
                  {position.stopLoss && (
                    <div>
                      <div className="text-gray-400">Stop Loss</div>
                      <div>${position.stopLoss.toFixed(2)}</div>
                    </div>
                  )}
                  {position.takeProfit && (
                    <div>
                      <div className="text-gray-400">Take Profit</div>
                      <div>${position.takeProfit.toFixed(2)}</div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {mockPositions.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No open positions
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
