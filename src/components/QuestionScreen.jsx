"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Swal from "sweetalert2"
import DecorativeImages from "./DecorativeImages"

export default function QuestionScreen({ question, onYes, isFirst }) {

  const handleNo = async () => {
    if (isFirst) {
      await Swal.fire({
        title: "But this one is special!",
        text: "You need to open it... please?",
        imageUrl: "/gif/please.gif",
        imageAlt: "Please gif",
        imageWidth: 150,
        background: "linear-gradient(135deg, #fde7f3, #f3e8ff)",
        color: "#5b2245",
        timer: 3000,
        showConfirmButton: false,
      })
    } else {
      await Swal.fire({
        title: "Please say yes!",
        text: "I really hope you do...",
        imageUrl: "/gif/tears.gif",
        imageAlt: "Please gif",
        imageWidth: 130,
        background: "linear-gradient(135deg, #fde7f3, #f3e8ff)",
        color: "#5b2245",
        timer: 3000,
        showConfirmButton: false,
      })
    }
  }

  const handleYes = () => {
    setTimeout(() => onYes(), 500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100">

      {/* 🌸 Decorative floating images (ONLY THIS PAGE) */}
      <DecorativeImages />

      {/* 🌸 Main content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center max-w-3xl mx-auto">

          {/* Heart Icon */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-white/60 backdrop-blur-xl flex items-center justify-center border border-pink-300 shadow-xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-12 h-12 text-pink-500 fill-pink-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Question */}
          <motion.h1
            className="text-4xl md:text-6xl font-semibold mb-6 text-rose-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {question}
          </motion.h1>

          <motion.p
            className="text-rose-500 text-xl md:text-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {isFirst ? "I believe it's worth it…" : "Be honest with yourself…"}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-6 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <button
              onClick={handleYes}
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >
              Yes 🥰
            </button>

            <button
              onClick={handleNo}
              className="px-8 py-4 bg-gradient-to-r from-red-400 to-rose-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >
              No 😔
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

