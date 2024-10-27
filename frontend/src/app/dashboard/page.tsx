import { BarChart3Icon, TrendingUpIcon, WalletIcon, AlertCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Add Wallet</Button>
          <Button variant="outline">Create Alert</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Total Volume</span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">$1.2B</span>
            <span className="text-xs text-muted-foreground ml-2">+12.5%</span>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Active Wallets</span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">245.8K</span>
            <span className="text-xs text-muted-foreground ml-2">+5.2%</span>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Tracked Wallets</span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">15</span>
            <span className="text-xs text-muted-foreground ml-2">Free Tier</span>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Active Alerts</span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">3</span>
            <span className="text-xs text-muted-foreground ml-2">of 5</span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between p-6">
            <h3 className="text-lg font-medium">Volume Analysis</h3>
            <Button variant="outline" size="sm">Last 7 Days</Button>
          </div>
          <div className="p-6 pt-0 h-[350px] flex items-center justify-center text-muted-foreground">
            Chart placeholder - Will integrate real data visualization
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card">
          <div className="flex items-center justify-between p-6">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Large Transfer Detected</p>
                    <p className="text-sm text-muted-foreground">1,000 SOL moved to Exchange</p>
                  </div>
                  <div className="text-sm text-muted-foreground">2m ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
