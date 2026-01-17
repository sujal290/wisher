"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function BlanketNightSong({ song, onBack }) {
  const audioRef = useRef(null)

  /* ▶️ Safe autoplay with fade-in */
  useEffect(() => {
    if (!song) return
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0

    const startMusic = () => {
      audio.play().catch(() => {})
      document.removeEventListener("click", startMusic)
    }

    document.addEventListener("click", startMusic)

    // 🎚 Fade in
    let volume = 0
    const fade = setInterval(() => {
      if (volume < 0.9) {
        volume += 0.05
        audio.volume = Math.min(volume, 0.9)
      } else {
        clearInterval(fade)
      }
    }, 200)

    return () => {
      clearInterval(fade)
      document.removeEventListener("click", startMusic)
    }
  }, [song])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-semibold mb-6 text-pink-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Just for you 💖
      </motion.h1>

      {song ? (
        <motion.audio
          ref={audioRef}
          controls
          src={song}
          className="w-full max-w-md rounded-lg shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
      ) : (
        <p className="text-pink-200">No song added 🎵</p>
      )}

      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition shadow-lg"
      >
        ← Go Back
      </motion.button>
    </motion.div>
  )
}
