"use client"

import { Card } from "@/components/ui/card"
import OrderForm from "@/components/OrderForm"
import PositionManager from "@/components/PositionManager"
import dynamic from 'next/dynamic'

// Import TradingView chart with no SSR
const TradingViewChart = dynamic(
  () => import("@/components/TradingViewChart").then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-800 text-gray-400">
        Loading chart...
      </div>
    )
  }
)

export default function TradingPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Main Chart */}
      <div className="lg:col-span-3">
        <Card className="bg-gray-800 border-gray-700">
          <div className="h-[600px] w-full">
            <TradingViewChart />
          </div>
        </Card>
      </div>

      {/* Order Form */}
      <div className="lg:col-span-1 space-y-4">
        <OrderForm />
        <PositionManager />
      </div>

      {/* Market Info */}
      <div className="lg:col-span-3">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-400">24h Volume</div>
              <div className="text-lg font-medium">$2.4B</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">24h Change</div>
              <div className="text-lg font-medium text-red-500">-2.9%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">24h High</div>
              <div className="text-lg font-medium">$175.32</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">24h Low</div>
              <div className="text-lg font-medium">$165.21</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Trades */}
      <div className="lg:col-span-1">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <h3 className="text-sm font-medium mb-4">Recent Trades</h3>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className={i % 2 === 0 ? "text-green-500" : "text-red-500"}>
                  {i % 2 === 0 ? "Long" : "Short"}
                </span>
                <span className="text-gray-400">0.5 SOL</span>
                <span>$169.94</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
