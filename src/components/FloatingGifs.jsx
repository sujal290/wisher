"use client"

import { motion } from "framer-motion"

/* GIF SOURCES */
const GIFS = [
  "/gif/please.gif",
  "/gif/tears.gif",
  "/gif/cut.gif",
  "/gif/dance.gif",
  "/gif/kissss.gif",
  "/gif/touch.gif",
  "/gif/eye.gif",
]

/* HOW MANY FLOATING GIFS */
const TOTAL_GIFS = 6

export default function FloatingGifs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: TOTAL_GIFS }).map((_, index) => {
        const gif = GIFS[index % GIFS.length]

        // 🔥 BIGGER SIZE
        const size = 50 + Math.random() * 90 // 50px → 140px
        const opacity = 0.2 + Math.random() * 0.4

        // 🎯 CENTER OF SCREEN
        const startX = 50
        const startY = 50

        // 🎯 RANDOM DIRECTION (ANGLE)
        const angle = Math.random() * Math.PI * 2
        const distance = 60 + Math.random() * 80 // how far it flies

        const endX = startX + Math.cos(angle) * distance
        const endY = startY + Math.sin(angle) * distance

        const duration = 18 + Math.random() * 20
        const delay = Math.random() * 10

        return (
          <motion.img
            key={index}
            src={gif}
            alt="floating gif"
            className="absolute select-none"
            style={{
              width: size,
              height: size,
              opacity,
              left: "0",
              top: "0",
            }}
            initial={{
              x: `${startX}vw`,
              y: `${startY}vh`,
              scale: 0.4,
            }}
            animate={{
              x: `${endX}vw`,
              y: `${endY}vh`,
              scale: 1,
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeOut",
            }}
          />
        )
      })}
    </div>
  )
}
