"use client"

import SwapComponent from "@/components/SwapComponent"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function SwapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Swap Tokens</h1>
        <WalletMultiButton className="bg-purple-500 hover:bg-purple-600" />
      </div>
      <div className="max-w-md mx-auto">
        <SwapComponent />
      </div>
    </div>
  )
}
