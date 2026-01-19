"use client"

import { motion } from "framer-motion"

const images = [
  "/images/s1.jpg",
  "/images/s2.jpg",
  "/images/s3.jpg",
  "/images/s4.jpg",
  "/images/s5.jpg",
  "/images/s6.jpg",
  "/images/s7.jpg",
  "/images/s8.jpg",
  "/images/s9.jpg",
  "/images/s11.jpg",
  "/images/s12.jpg",
  "/images/s22.jpg",
  "/images/s33.jpg",
  "/images/s44.jpg",
  "/images/s66.jpg",
  "/images/s77.jpg",
  "/images/s88.jpg",
  "/images/s99.jpg",
]

export default function DecorativeImagesRectangle() {
  const margin = 8 // % distance from screen border
  const itemsPerSide = Math.ceil(images.length / 4)

  const getPosition = (i) => {
    const side = Math.floor(i / itemsPerSide)
    const pos = (i % itemsPerSide) / (itemsPerSide - 1 || 1)

    switch (side) {
      case 0: // Top
        return { top: `${margin}%`, left: `${margin + pos * (100 - margin * 2)}%` }
      case 1: // Right
        return { right: `${margin}%`, top: `${margin + pos * (100 - margin * 2)}%` }
      case 2: // Bottom
        return { bottom: `${margin}%`, left: `${margin + pos * (100 - margin * 2)}%` }
      default: // Left
        return { left: `${margin}%`, top: `${margin + pos * (100 - margin * 2)}%` }
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt=""
          className={`absolute w-24 md:w-32 opacity-70 rounded-xl shadow-lg
            ${i > 10 ? "hidden lg:block" : ""}`}
          style={getPosition(i)}
          animate={{
            y: [0, -10, 0],
            x: i % 2 === 0 ? [0, 6, 0] : [0, -6, 0],
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
