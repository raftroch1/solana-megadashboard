"use client"

import { useRef } from 'react'
import { HeroSection } from '@/components/preview/HeroSection'
import { FeaturesSection } from '@/components/preview/FeaturesSection'
import { UpdatesSection } from '@/components/preview/UpdatesSection'
import Footer from '@/components/layout/Footer'

export default function PreviewPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" ref={containerRef}>
      <HeroSection />
      
      <div className="relative z-10 bg-black flex-grow px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <FeaturesSection />
          <UpdatesSection />
        </div>
      </div>

      <Footer />
    </div>
  )
}
