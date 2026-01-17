

"use client"
import { useEffect, useRef } from "react"

export default function BackgroundMusic({ src, fadeOut }) {
  const audioRef = useRef(null)

  /* ▶️ Start background music on first user interaction */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !src) return

    audio.volume = 0.35

    const startMusic = () => {
      audio.play().catch(() => {})
      document.removeEventListener("click", startMusic)
    }

    document.addEventListener("click", startMusic)
    return () => document.removeEventListener("click", startMusic)
  }, [src])

  /* 🔇 Fade out logic */
  useEffect(() => {
    if (!fadeOut) return
    const audio = audioRef.current
    if (!audio) return

    const fade = setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume -= 0.02
      } else {
        audio.pause()
        audio.volume = 0
        clearInterval(fade)
      }
    }, 120)

    return () => clearInterval(fade)
  }, [fadeOut])

  if (!src) return null

  return (
    <audio ref={audioRef} loop>
      <source src={src} type="audio/mpeg" />
    </audio>
  )
}
