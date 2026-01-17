"use client"

import { motion } from "framer-motion"

const CANDLES = 35

export default function CandleAmbience() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: CANDLES }).map((_, i) => {
        const size = 8 + Math.random() * 14
        const startX = Math.random() * 100
        const delay = Math.random() * 10
        const duration = 18 + Math.random() * 20
        const opacity = 0.15 + Math.random() * 0.35

        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-yellow-300 blur-md"
            style={{
              width: size,
              height: size,
              left: `${startX}vw`,
              bottom: "-10vh",
              opacity,
            }}
            animate={{
              y: "-120vh",
              x: `${startX + (Math.random() * 10 - 5)}vw`,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )
      })}
    </div>
  )
}
