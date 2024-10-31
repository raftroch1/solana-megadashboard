"use client"

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    TradingView: any
  }
}

interface TradingViewChartProps {
  symbol?: string
  theme?: "dark" | "light"
  interval?: string
}

export default function TradingViewChart({
  symbol = "SOLUSD",
  theme = "dark",
  interval = "60"
}: TradingViewChartProps) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (container.current && window.TradingView) {
        new window.TradingView.widget({
          container_id: container.current.id,
          symbol: symbol,
          interval: interval,
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#1a1b1e",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          backgroundColor: "rgba(19, 23, 34, 1)",
          gridColor: "rgba(37, 51, 65, 0.5)",
          width: "100%",
          height: "100%",
          fullscreen: false,
          allow_symbol_change: true,
          studies: [
            "RSI@tv-basicstudies",
            "MASimple@tv-basicstudies",
            "VWAP@tv-basicstudies"
          ],
          disabled_features: [
            "header_symbol_search",
            "header_screenshot",
            "header_compare",
          ],
          enabled_features: [
            "study_templates",
            "hide_left_toolbar_by_default"
          ]
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [symbol, theme, interval])

  return (
    <div className="w-full h-full">
      <div
        id="tradingview_widget"
        ref={container}
        className="w-full h-full"
      />
    </div>
  )
}
