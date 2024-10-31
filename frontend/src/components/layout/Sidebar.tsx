"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart2, 
  ArrowLeftRight, 
  LineChart,
  Activity,
  Settings,
  Home
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    name: "Dashboard",
    icon: Home,
    href: "/dashboard"
  },
  {
    name: "Trading",
    icon: LineChart,
    href: "/dashboard/trading"
  },
  {
    name: "Swap",
    icon: ArrowLeftRight,
    href: "/dashboard/swap"
  },
  {
    name: "Analytics",
    icon: BarChart2,
    href: "/dashboard/analytics"
  },
  {
    name: "Activity",
    icon: Activity,
    href: "/dashboard/activity"
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings"
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 border-r border-gray-800">
      <div className="flex flex-col flex-1">
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          <span className="text-xl font-bold text-purple-500">Solana Mega</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm rounded-lg",
                  isActive
                    ? "bg-purple-500/10 text-purple-500"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
