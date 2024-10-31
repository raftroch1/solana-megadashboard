"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownUp } from "lucide-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <WalletMultiButton className="bg-purple-500 hover:bg-purple-600" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/swap">
          <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-500">
                <ArrowDownUp className="mr-2 h-6 w-6" />
                Token Swap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Swap tokens using Jupiter aggregator for the best rates across Solana DEXes
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
