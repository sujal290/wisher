
"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import confetti from "canvas-confetti"

export default function FinalScreen({ content, onNext }) {
  const [cardOpen, setCardOpen] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const messageRef = useRef(null)

  /* 🔹 Split message into vertical lines */
  const splitMessage = (text = "") =>
    text
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)

  const lines = splitMessage(content?.message || "")

  /* 🎉 Confetti */
  const fireConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.75 },
      colors: ["#ff4d6d", "#ff80b5", "#c084fc", "#a855f7"],
    })
  }

  /* ✅ Mark complete after all lines show */
  useEffect(() => {
    if (!cardOpen) return
    const timer = setTimeout(() => {
      setTypingComplete(true)
    }, lines.length * 180)

    return () => clearTimeout(timer)
  }, [cardOpen, lines.length])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-xl w-full text-center">

        {/* 🔒 Closed Card */}
        {!cardOpen ? (
          <motion.div
            className="cursor-pointer bg-pink-950/20 border border-pink-500/30
                       rounded-3xl p-8 backdrop-blur-xl"
            whileHover={{ scale: 1.05 }}
            onClick={() => setCardOpen(true)}
          >
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 fill-current" />
            <p className="text-pink-300">Tap to see what’s inside</p>
          </motion.div>
        ) : (

          /* 💌 Message Container */
          <div
            ref={messageRef}
            className="h-80 overflow-y-auto p-6 text-left
                       bg-white/10 backdrop-blur-xl
                       rounded-3xl text-pink-200 space-y-4"
          >
            {lines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.18,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="text-lg leading-relaxed break-words"
                onAnimationComplete={() => {
                  messageRef.current?.scrollTo({
                    top: messageRef.current.scrollHeight,
                    behavior: "smooth",
                  })
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        )}

        {/* 💖 Continue Button */}
        {typingComplete && (
          <motion.button
            onClick={() => {
              fireConfetti()
              onNext()
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500
                       text-white px-8 py-4 rounded-full text-lg
                       font-semibold shadow-xl"
          >
            🤍 Continue 🤍
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
