"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { ChatButton } from "@/components/ChatButton"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-gray-900/95 backdrop-blur border-b border-gray-800">
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            <WalletMultiButton className="bg-purple-500 hover:bg-purple-600" />
          </div>
        </div>
        <main className="p-4">{children}</main>
      </div>
      <ChatButton />
    </div>
  )
}
