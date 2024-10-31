"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@solana/wallet-adapter-react"
import { AlertCircle } from "lucide-react"

export default function OrderForm() {
  const { connected } = useWallet()
  const [orderType, setOrderType] = useState<"long" | "short">("long")
  const [size, setSize] = useState("")
  const [leverage, setLeverage] = useState("1")
  const [useStopLoss, setUseStopLoss] = useState(false)
  const [useTakeProfit, setUseTakeProfit] = useState(false)
  const [stopLoss, setStopLoss] = useState("")
  const [takeProfit, setTakeProfit] = useState("")

  const leverageOptions = ["1", "2", "3", "5", "10"]
  const currentPrice = 169.94
  const liquidationPrice = orderType === "long" 
    ? currentPrice * (1 - 1 / parseInt(leverage))
    : currentPrice * (1 + 1 / parseInt(leverage))

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Trading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={orderType === "long" ? "default" : "outline"}
              onClick={() => setOrderType("long")}
              className={orderType === "long" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Long
            </Button>
            <Button
              variant={orderType === "short" ? "default" : "outline"}
              onClick={() => setOrderType("short")}
              className={orderType === "short" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Short
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Size (SOL)</label>
            <Input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-gray-700 border-gray-600"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Leverage</label>
            <div className="grid grid-cols-5 gap-2">
              {leverageOptions.map((option) => (
                <Button
                  key={option}
                  variant={leverage === option ? "default" : "outline"}
                  onClick={() => setLeverage(option)}
                  className="text-sm"
                  size="sm"
                >
                  {option}x
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Entry Price</span>
              <span className="text-white">${currentPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Liquidation Price</span>
              <span className="text-white">${liquidationPrice.toFixed(2)}</span>
            </div>
          </div>

          {parseInt(leverage) > 3 && (
            <div className="flex items-center space-x-2 text-yellow-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>High leverage increases liquidation risk</span>
            </div>
          )}

          <Button
            className="w-full"
            disabled={!connected}
            variant="default"
            size="lg"
          >
            {!connected 
              ? "Connect Wallet" 
              : `${orderType === "long" ? "Long" : "Short"} SOL`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
