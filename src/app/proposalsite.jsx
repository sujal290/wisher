"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import FirstScreen from "../components/FirstScreen"
import QuestionScreen from "../components/QuestionScreen"
import BalloonsScreen from "../components/BalloonsScreen"
import PhotoScreen from "../components/PhotoScreen"
import FinalScreen from "../components/FinalScreen"
import CuteLoader from "../components/CuteLoader"
import BackgroundMusic from "../components/BackgroundMusic"
import BlanketNightSong from "../components/BlanketNightSong"

export default function ProposalSite({ content }) {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [fadeBgMusic, setFadeBgMusic] = useState(false)
  const [lightDust, setLightDust] = useState([])
  const [siteKey, setSiteKey] = useState(0)

  /* 🔁 Always reset scroll on screen change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [currentScreen])

  /* ⏳ Loader → First Screen */
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("first")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  /* ✨ Decorative particles */
  useEffect(() => {
    setLightDust(
      Array.from({ length: 35 }).map(() => ({
        left: Math.random() * 100 + "%",
        duration: 10 + Math.random() * 20 + "s",
        delay: Math.random() * 10 + "s",
      }))
    )
  }, [])

  const nextScreen = (screen) => setCurrentScreen(screen)

  return (
    <div key={siteKey} className="aurora-bg emotional-meter min-h-screen relative overflow-hidden">

      {/* 🎵 Background Music */}
      <BackgroundMusic
        src={content.bg_music}
        fadeOut={fadeBgMusic}
      />

      {/* ✨ Light Dust */}
      <div className="light-dust">
        {lightDust.map((item, i) => (
          <span
            key={i}
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          />
        ))}
      </div>

      {/* 💕 Heart Rain */}
      <div className="heart-rain">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 12 + Math.random() * 18 + "s",
              animationDelay: Math.random() * 10 + "s",
            }}
          />
        ))}
      </div>

      {/* 🌠 Shooting Stars */}
      <div className="shooting-stars">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            style={{
              top: Math.random() * 80 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: 6 + Math.random() * 8 + "s",
              animationDelay: Math.random() * 6 + "s",
            }}
          />
        ))}
      </div>

      {/* 🧠 Screen Flow */}
      <AnimatePresence mode="wait">

        {currentScreen === "loader" && (
          <CuteLoader key="loader" />
        )}

        {currentScreen === "first" && (
          <FirstScreen
            key="first"
            content={content}
            onNext={() => nextScreen("question1")}
          />
        )}

        {currentScreen === "question1" && (
          <QuestionScreen
            key="question1"
            question="Do you like surprises?"
            isFirst
            onYes={() => nextScreen("question2")}
          />
        )}

        {currentScreen === "question2" && (
          <QuestionScreen
            key="question2"
            question="Do you like Shyarii?"
            onYes={() => nextScreen("balloons")}
          />
        )}

        {currentScreen === "balloons" && (
          <BalloonsScreen
            key="balloons"
            onNext={() => nextScreen("photos")}
          />
        )}

        {currentScreen === "photos" && (
          <PhotoScreen
            key="photos"
            images={content.photos}
            onNext={() => nextScreen("final")}
          />
        )}

        {currentScreen === "final" && (
          <FinalScreen
            key="final"
            content={content}
            pdf={content.message_pdf}
            onNext={() => {
              setFadeBgMusic(true)
              nextScreen("song")
            }}
          />
        )}

        {currentScreen === "song" && (
          <motion.div
            key="song"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="min-h-screen"
          >
            <BlanketNightSong
              song={content.final_song}
              introText={content.intro_text}
              memories={content.photos.slice(0, 6).map((img, i) => ({
                image: img,
                text: content.memory_texts?.[i] || "",
              }))}
              finalMessage={content.final_message}

              /* ✅ BACK = FULL RESET TO FIRST SCREEN */
              onBack={() => {
                setFadeBgMusic(false)
                setCurrentScreen("first")
                setSiteKey(prevKey => prevKey + 1)  // Force remount to reset state
              }}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* 🪪 Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light"
      >
        @madebyek_ehsas
      </motion.div>

    </div>
  )
}



