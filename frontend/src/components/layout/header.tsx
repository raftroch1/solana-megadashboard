import { Button } from "@/components/ui/button"
import Link from "next/link"
import { WalletIcon, BarChart3Icon, BellIcon, Settings2Icon } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 container">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3Icon className="h-6 w-6" />
            <span className="font-bold">Solana Analytics</span>
          </Link>
          <div className="ml-8 flex items-center gap-6 text-sm">
            <Link href="/dashboard" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/wallets" className="flex items-center gap-2">
              <WalletIcon className="h-4 w-4" />
              Wallets
            </Link>
            <Link href="/alerts" className="flex items-center gap-2">
              <BellIcon className="h-4 w-4" />
              Alerts
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Settings2Icon className="h-4 w-4" />
          </Button>
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </header>
  )
}
