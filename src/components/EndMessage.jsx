"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function EndMessage({ onClose }) {
  const [step, setStep] = useState("text")
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setStep("gif"), 6000)
    const t2 = setTimeout(() => setStep("heart"), 12000)
    const t3 = setTimeout(() => setFadeOut(true), 14000)
    const t4 = setTimeout(() => onClose(), 15000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl
                 flex items-center justify-center text-center px-6"
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >

      {/* 📝 MESSAGE */}
      {step === "text" && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.25, opacity: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
          className="text-3xl md:text-4xl text-pink-300 font-semibold"
        >
          Bas itna hi…
          <br />
          par kaafi hai ❤️
        </motion.div>
      )}

      {/* 🐰 GIF */}
      {step === "gif" && (
        <motion.img
          src="/gif/jump.png"
          alt="jump"
          className="w-40 md:w-56"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />
      )}

      {/* ❤️ HEART */}
      {step === "heart" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.4, 1], opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-6xl"
        >
          ❤️
        </motion.div>
      )}

    </motion.div>
  )
}
