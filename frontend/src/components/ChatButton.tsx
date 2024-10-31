"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"
import { useState } from "react"
import { Card } from "./ui/card"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-purple-500 hover:bg-purple-600 p-0 shadow-lg"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 bg-gray-900 border-gray-800 shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="font-semibold text-white">AI Assistant</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Online</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Chat messages will go here */}
              <div className="text-sm text-gray-400">
                Hello! I'm your AI assistant. I can help you with:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Market analysis</li>
                  <li>Risk assessment</li>
                  <li>Whale activity tracking</li>
                  <li>Volume pattern detection</li>
                </ul>
              </div>
            </div>
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
