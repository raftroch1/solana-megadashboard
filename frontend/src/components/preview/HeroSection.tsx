"use client"

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="relative h-screen max-h-[800px] overflow-hidden px-8 flex items-center justify-center">
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{ scale: imageScale, opacity }}
      >
        <div className="relative w-full h-full max-w-[1200px] mx-auto">
          <Image
            src="/images/backgrounds/background.png"
            alt="Solar Moon Dashboard Preview"
            fill
            className="object-contain"
            priority
            quality={100}
          />
          {/* Vertical gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />
          
          {/* Horizontal gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
          
          {/* Corner gradients for extra fade effect */}
          <div className="absolute inset-0 bg-radial-gradient opacity-30" />
        </div>
      </motion.div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-gray-300 to-purple-300 text-transparent bg-clip-text">
          SolarMoon
        </h1>
        <p className="text-xl bg-gradient-to-r from-purple-200 via-gray-400 to-purple-200 text-transparent bg-clip-text mb-8">
          Explore the Solana ecosystem
        </p>
        <Button 
          onClick={() => router.push('/dashboard')}
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg text-lg"
        >
          Launch App
        </Button>
      </div>
    </div>
  )
}
