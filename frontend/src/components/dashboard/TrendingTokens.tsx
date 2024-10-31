"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

interface Token {
  name: string
  symbol: string
  price: number
  change24h: number
  volume24h: number
  tvl: number
}

const mockTokens: Token[] = [
  {
    name: "Solana",
    symbol: "SOL",
    price: 169.94,
    change24h: -2.9,
    volume24h: 2400000000,
    tvl: 79900000000
  },
  {
    name: "Raydium",
    symbol: "RAY",
    price: 3.45,
    change24h: 5.2,
    volume24h: 150000000,
    tvl: 890000000
  },
  {
    name: "Bonk",
    symbol: "BONK",
    price: 0.000012,
    change24h: 12.5,
    volume24h: 98000000,
    tvl: 450000000
  },
  {
    name: "Jito",
    symbol: "JITO",
    price: 45.67,
    change24h: -1.8,
    volume24h: 75000000,
    tvl: 320000000
  }
]

export function TrendingTokens() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Trending Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-6 text-sm text-gray-400 pb-2">
            <div className="col-span-2">Token</div>
            <div className="text-right">Price</div>
            <div className="text-right">24h</div>
            <div className="text-right">Volume</div>
            <div className="text-right">TVL</div>
          </div>
          {mockTokens.map((token) => (
            <div key={token.symbol} className="grid grid-cols-6 text-sm items-center">
              <div className="col-span-2 font-medium">{token.name}</div>
              <div className="text-right">${token.price.toLocaleString(undefined, {
                minimumFractionDigits: token.price < 0.01 ? 6 : 2,
                maximumFractionDigits: token.price < 0.01 ? 6 : 2
              })}</div>
              <div className={`text-right flex items-center justify-end ${
                token.change24h >= 0 ? "text-green-500" : "text-red-500"
              }`}>
                {token.change24h >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(token.change24h)}%
              </div>
              <div className="text-right">${(token.volume24h / 1000000).toFixed(1)}M</div>
              <div className="text-right">${(token.tvl / 1000000).toFixed(1)}M</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
