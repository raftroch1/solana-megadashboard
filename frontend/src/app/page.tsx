import { Button } from "@/components/ui/button"
import { BarChart3Icon, WalletIcon, BellIcon, BrainCircuitIcon } from "lucide-react"

export default function Home() {
  return (
    <main className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            AI-Powered Analytics for{" "}
            <span className="text-purple-400">Solana</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Track wallets, monitor transactions, and get AI-powered insights for the Solana blockchain
          </p>
          <div className="flex gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">View Demo</Button>
          </div>
        </div>
      </section>
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <BarChart3Icon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Real-time Analytics</h3>
                <p className="text-sm text-muted-foreground">Track volume and price action in real-time</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <WalletIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Wallet Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor smart money wallets and movements</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <BellIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">Custom Alerts</h3>
                <p className="text-sm text-muted-foreground">Get notified about important movements</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <BrainCircuitIcon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">AI Insights</h3>
                <p className="text-sm text-muted-foreground">Get AI-powered market analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
