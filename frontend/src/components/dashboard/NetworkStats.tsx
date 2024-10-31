"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart2, Zap, Clock, Database } from "lucide-react"

const stats = [
  {
    name: "TPS",
    value: "3,945",
    change: "+12.3%",
    trend: "up",
    icon: Zap
  },
  {
    name: "Daily Transactions",
    value: "24.5M",
    change: "+5.2%",
    trend: "up",
    icon: BarChart2
  },
  {
    name: "Block Time",
    value: "400ms",
    change: "-2.1%",
    trend: "down",
    icon: Clock
  },
  {
    name: "Total TVL",
    value: "$4.2B",
    change: "+8.7%",
    trend: "up",
    icon: Database
  }
]

export function NetworkStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
                <p className={`text-sm mt-1 ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                </p>
              </div>
              <stat.icon className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
