"use client"

import Link from "next/link"
import { Twitter, Linkedin } from "lucide-react"
import { DiscordIcon } from "@/components/icons/DiscordIcon"

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Link 
              href="https://discord.gg/your-discord" 
              target="_blank"
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              <DiscordIcon className="h-6 w-6" />
            </Link>
            <Link 
              href="https://twitter.com/your-twitter" 
              target="_blank"
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link 
              href="https://linkedin.com/your-linkedin" 
              target="_blank"
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link 
              href="/privacy-policy"
              className="hover:text-purple-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="hover:text-purple-500 transition-colors"
            >
              Terms of Service
            </Link>
            <span>© 2024 Solana Mega. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
