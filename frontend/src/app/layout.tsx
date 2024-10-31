"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { SolanaWalletProvider } from "@/providers/WalletProvider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SolanaWalletProvider>
          {children}
        </SolanaWalletProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
