"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { CONTENT } from "../config/content"

export default function FinalScreen({ onNext }) {
  const [cardOpen, setCardOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const messageRef = useRef(null)
  const router = useRouter()
  const [showFullMessage, setShowFullMessage] = useState(false)
  const fireConfetti = () => {
  const colors = ["#ff4d6d", "#ff80b5", "#c084fc", "#a855f7"]
  const proposalMessage = data.message
const images = data.images
const song = data.song


  confetti({
    particleCount: 180,
    spread: 120,
    origin: { y: 0.75 },
    colors,
  })
}
   const downloadMessage = () => {
  const a = document.createElement("a")
  a.href = CONTENT.pdf
  a.download = "wish.pdf"
  a.click()
}


const proposalMessage = CONTENT.message

            
  useEffect(() => {
    if (cardOpen && !typingComplete) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < proposalMessage.length) {
          setDisplayedText(proposalMessage.slice(0, currentIndex + 1))
          currentIndex++

          // Auto scroll as text appears
          if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
          }
        } else {
          setTypingComplete(true)
          clearInterval(typingInterval)
        }
      }, 15)

      return () => clearInterval(typingInterval)
    }
  }, [cardOpen, proposalMessage])

  const handleYesForever = () => {
    setShowOverlay(true);

    const colors = ["#ff4d6d", "#ff80b5", "#c084fc", "#a855f7", "#f472b6", "#fb7185"];
    const count = 200;
    const defaults = { origin: { y: 0.8 }, colors };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >

      {/* Main content */}
      <div className="max-w-xl w-full mx-auto text-center">
        <AnimatePresence mode="wait">
          {!cardOpen ? (
            // Closed card state
            <motion.div
              key="closed"
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="mb-8 flex justify-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <img src="/gif/msg.gif" className="w-28" alt="envelope" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl text-pink-200 mb-8 leading-tight font-semibold">
                This is just for <span className="text-pink-400 font-bold">you...</span>
              </h1>

              <div
                className="cursor-pointer transform transition-all duration-300 hover:scale-105 bg-pink-950/20 backdrop-blur-md border border-pink-500/30 rounded-3xl p-8 w-full mx-auto max-w-84"
                onClick={() => setCardOpen(true)}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4 fill-current" />
                </motion.div>
                <p className="text-lg text-pink-300">Tap to see what’s inside</p>
              </div>
            </motion.div>
          ) : (
            // Open card state
            <motion.div
              layout
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* <motion.div className="bg-pink-950/20 backdrop-blur-xl border border-pink-400/30 shadow-[0_0_80px_rgba(236,72,153,0.25)] rounded-3xl p-8"> */}
                <motion.div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_120px_rgba(255,105,180,0.35)]">
                <div
                  ref={messageRef}
                  className="h-80 overflow-y-auto text-left pr-2.5"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(236, 72, 153, 0.3) transparent",
                  }}
                >
                  <div className="font-love love-glow text-pink-200 leading-relaxed whitespace-pre-line text-lg md:text-xl glow-text">
                   {showFullMessage ? proposalMessage : displayedText}
                    {!typingComplete && (
                      <motion.span
                        className="text-pink-400"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question and button */}
        <AnimatePresence>
          {typingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              <motion.h2
                className="text-2xl md:text-3xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mt-10 mb-8 font-semibold"
              >
                Hope You will going to love it...!
              </motion.h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

              {/* Song Button */}
                <motion.button
                  onClick={() => {
                    fireConfetti()
                    onNext()
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-7 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
                >
                  🤍 continue 🤍
                </motion.button>

              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

                    {/* 📥 Download Message */}
                    <motion.button
                      onClick={downloadMessage}
                      className="bg-white/10 border border-white/20
                                text-pink-300 px-6 py-3 rounded-full
                                hover:bg-white/20 transition"
                    >
                      ⬇ Download Message
                    </motion.button>
                  </div>
                 
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/*Overlay */}
      {showOverlay && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-3xl flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-center max-w-md mx-auto px-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {/* Heart Animation */}
            <div className="mb-8 relative">
              <motion.div
                className="relative w-32 h-32 mx-auto"
              >
                {/* Left half */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ x: -45, rotate: -35 }}
                  animate={{ x: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                >
                  <Heart
                    className="w-32 h-32 text-pink-500 fill-current"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                </motion.div>

                {/* Right half */}
                <motion.div
                  className="absolute inset-0 mr-1"
                  initial={{ x: 45, rotate: 35 }}
                  animate={{ x: 0, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                >
                  <Heart
                    className="w-32 h-32 text-pink-500 fill-current"
                    style={{ clipPath: "inset(0 0 0 50%)" }}
                  />
                </motion.div>

                {/* Same heart beats after merge */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                  transition={{
                    delay: 1.8,
                    scale: {
                      delay: 2.3,
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  }}
                >
                  <Heart className="w-32 h-32 text-pink-500 fill-current" />
                </motion.div>
              </motion.div>
            </div>

            {/* End Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 leading-tight">
                Let's make it worth it...
              </h1>
              <motion.p
                className="text-3xl md:text-4xl text-pink-300 font-semibold"
              >
                Forever✨
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

    </motion.div>
  )
}
