"use client"

import { motion } from "framer-motion"

export default function BlanketNightSong({ content, onBack }) {
  const songUrl = content.song

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-semibold mb-6 text-pink-300">
        Just for you 💖
      </h1>

      {songUrl ? (
        <audio
          controls
          autoPlay
          className="w-full max-w-md"
          src={songUrl}
        />
      ) : (
        <p className="text-pink-200">No song added 🎵</p>
      )}

      <button
        onClick={onBack}
        className="mt-8 px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition"
      >
        ← Go Back
      </button>
    </motion.div>
  )
}
