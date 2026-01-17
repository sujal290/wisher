"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import confetti from "canvas-confetti"

export default function FinalScreen({ content, onNext }) {
  const [cardOpen, setCardOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const messageRef = useRef(null)

  const proposalMessage = content?.message || ""

  const fireConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.75 },
      colors: ["#ff4d6d", "#ff80b5", "#c084fc", "#a855f7"],
    })
  }

  useEffect(() => {
    if (!cardOpen) return

    let i = 0
    const interval = setInterval(() => {
      if (i < proposalMessage.length) {
        setDisplayedText(proposalMessage.slice(0, i + 1))
        i++
        messageRef.current?.scrollTo(0, messageRef.current.scrollHeight)
      } else {
        setTypingComplete(true)
        clearInterval(interval)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [cardOpen, proposalMessage])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-xl w-full text-center">
        {!cardOpen ? (
          <motion.div
            className="cursor-pointer bg-pink-950/20 border border-pink-500/30 rounded-3xl p-8"
            whileHover={{ scale: 1.05 }}
            onClick={() => setCardOpen(true)}
          >
            <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 fill-current" />
            <p className="text-pink-300">Tap to see what’s inside</p>
          </motion.div>
        ) : (
          <div
            ref={messageRef}
            className="h-80 overflow-y-auto text-left p-6 bg-white/5 rounded-3xl text-pink-200 whitespace-pre-line"
          >
            {displayedText}
          </div>
        )}

        {typingComplete && (
          <motion.button
            onClick={() => {
              fireConfetti()
              onNext()
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500
                       text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl"
          >
            🤍 Continue 🤍
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
