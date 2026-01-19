"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Play, Pause } from "lucide-react"

/* ================= HANDWRITING HOOK ================= */
function useHandwriting(text = "", speed = 40) {
  const [output, setOutput] = useState("")

  useEffect(() => {
    let i = 0
    setOutput("")
    const interval = setInterval(() => {
      setOutput(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return output
}

/* ================= COMPONENT ================= */
export default function BlanketNightSong({
  song,
  introText = "",
  memories = [],
  finalMessage = "",
  onBack,
}) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const title = useHandwriting("Happy Birthday, Baby! 💗", 70)
  const subtitle = useHandwriting(
    "Today is all about celebrating you and the joy you bring to my life",
    28
  )

  /* 🎵 Smooth fade-in music */
  useEffect(() => {
    if (!song || !audioRef.current) return

    const audio = audioRef.current
    audio.volume = 0

    const start = () => {
      audio.play().catch(() => {})
      document.removeEventListener("click", start)
      setPlaying(true)
    }

    document.addEventListener("click", start)

    let v = 0
    const fade = setInterval(() => {
      if (v < 0.9) {
        v += 0.03
        audio.volume = v
      } else {
        clearInterval(fade)
      }
    }, 120)

    return () => {
      clearInterval(fade)
      document.removeEventListener("click", start)
    }
  }, [song])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="text-white">

      {/* ================= INTRO ================= */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Pacifico'] text-[#7a4a2e] mb-6">
          {title}
        </h1>

        <p className="text-lg md:text-xl text-[#8b5e3c] max-w-2xl mb-10">
          {subtitle}
        </p>

        {/* 🎧 CUSTOM MUSIC BUTTON */}
        {song && (
          <>
            <audio ref={audioRef} src={song} />

            <motion.button
              onClick={toggleMusic}
              whileTap={{ scale: 0.92 }}
              className="relative mt-4"
            >
              {/* Glow */}
              <div
                className={`
                  absolute inset-0 rounded-full blur-xl
                  bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400
                  animate-spin-slow
                  ${playing ? "opacity-100" : "opacity-70"}
                `}
              />

              {/* Core */}
              <div
                className="
                  relative z-10 w-20 h-20 rounded-full
                  bg-black/30 backdrop-blur-xl
                  flex items-center justify-center
                  border border-white/20 shadow-2xl
                "
              >
                {playing ? (
                  <Pause className="w-8 h-8 text-pink-200" />
                ) : (
                  <Play className="w-8 h-8 text-pink-200 ml-1" />
                )}
              </div>
            </motion.button>

            <p className="mt-3 text-pink-200 text-sm italic">
              Best experienced with headphones 🎧
            </p>
          </>
        )}

        <button
          onClick={() =>
            document
              .getElementById("memories")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-14 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-lg font-semibold shadow-xl"
        >
          ↓ Relive Our Memories ↓
        </button>
      </section>

      {/* ================= MEMORIES ================= */}
      <section
        id="memories"
        className="py-28 px-6 bg-gradient-to-b from-black/10 to-black/40"
      >
        <h2 className="text-center text-4xl md:text-5xl text-pink-300 mb-20">
          Memories We Hold 💕
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {memories.slice(0, 6).map((m, i) => (
            <motion.div
              key={i}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.04 }}
            >
              <img
                src={m.image}
                alt=""
                className="
                  w-full h-72 object-cover
                  transition-all duration-500
                  group-hover:opacity-70
                "
              />

              {/* Bottom caption */}
              <div
                className="
                  absolute inset-0 flex items-end
                  bg-gradient-to-t from-black/80 via-black/40 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                "
              >
                <p
                  className="
                    p-6 text-pink-200 text-lg
                    transform translate-y-6 scale-95
                    group-hover:translate-y-0 group-hover:scale-100
                    transition-all duration-500
                  "
                >
                  {m.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL MESSAGE ================= */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="max-w-4xl bg-white/10 backdrop-blur-2xl rounded-3xl p-12 text-center shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl text-pink-200 whitespace-pre-line leading-relaxed">
            {finalMessage}
          </p>

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "instant" })
              onBack()
            }}
            className="mt-14 px-10 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-lg font-semibold shadow-xl"
          >
            ← Go Back
          </button>
        </motion.div>
      </section>
    </div>
  )
}
