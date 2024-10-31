"use client"

import { NetworkStats } from "@/components/dashboard/NetworkStats"
import { TrendingTokens } from "@/components/dashboard/TrendingTokens"
import { WhaleActivity } from "@/components/dashboard/WhaleActivity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Network Statistics */}
      <NetworkStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Tokens */}
        <div className="lg:col-span-1">
          <TrendingTokens />
        </div>

        {/* Whale Activity */}
        <div className="lg:col-span-1">
          <WhaleActivity />
        </div>
      </div>
    </div>
  )
}
