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


export default function ProposalSite({content}) {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [fadeBgMusic, setFadeBgMusic] = useState(false)
  const [lightDust, setLightDust] = useState([])




  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("first")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
  setLightDust(
    Array.from({ length: 35 }).map(() => ({
      left: Math.random() * 100 + "%",
      duration: 10 + Math.random() * 20 + "s",
      delay: Math.random() * 10 + "s",
    }))
  )
}, [])


  const nextScreen = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className=" aurora-bg emotional-meter min-h-screen relative overflow-hidden">
      <BackgroundMusic fadeOut={fadeBgMusic} />

      
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


  <div className="heart-rain">
  {Array.from({ length: 25 }).map((_, i) => (
    <span
      key={i}
      style={{
        left: Math.random() * 100 + "%",
        animationDuration: 12 + Math.random() * 18 + "s",
        animationDelay: Math.random() * 10 + "s"
      }}
    />
  ))}
</div>

<div className="shooting-stars">
  {Array.from({ length: 6 }).map((_, i) => (
    <span
      key={i}
      style={{
        top: Math.random() * 80 + "%",
        left: Math.random() * 100 + "%",
        animationDuration: 6 + Math.random() * 8 + "s",
        animationDelay: Math.random() * 6 + "s"
      }}
    />
  ))}
</div>
<div className="fireflies">
  {Array.from({ length: 18 }).map((_, i) => (
    <span
      key={i}
      style={{
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        animationDuration: 6 + Math.random() * 10 + "s",
        animationDelay: Math.random() * 8 + "s"
      }}
    />
  ))}
</div>



      {/* <AnimatePresence mode="wait">
        {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}

        {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}

        {currentScreen === "question1" && (
          <QuestionScreen
            key="question1"
            question="Do you like surprises?"
            onYes={() => nextScreen("question2")}
            isFirst={true}
          />
        )}

        {currentScreen === "question2" && (
          <QuestionScreen
            key="question2"
            question="Do you like Shyarii ?"
            onYes={() => nextScreen("balloons")}
            isFirst={false}
          />
        )}

        {currentScreen === "balloons" && <BalloonsScreen key="balloons" onNext={() => nextScreen("photos")} />}

        {currentScreen === "photos" && <PhotoScreen key="photos" onNext={() => nextScreen("final")} />}

        {currentScreen === "final" && <FinalScreen key="final" />}


        
      </AnimatePresence> */}


      <AnimatePresence mode="wait">
  {isLoading && <CuteLoader key="loader" />}

  {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}

  {currentScreen === "question1" && (
    <QuestionScreen
      key="question1"
      question="Do you like surprises?"
      onYes={() => nextScreen("question2")}
      isFirst={true}
    />
  )}

  {currentScreen === "question2" && (
    <QuestionScreen
      key="question2"
      question="Do you like Shyarii ?"
      onYes={() => nextScreen("balloons")}
      isFirst={false}
    />
  )}

  {currentScreen === "balloons" && <BalloonsScreen key="balloons" onNext={() => nextScreen("photos")} />}

  {currentScreen === "photos" && <PhotoScreen key="photos" onNext={() => nextScreen("final")} />}

  {/* {currentScreen === "final" && (
    <FinalScreen
      key="final"
      onNext={() => nextScreen("song")}
    />
  )}

  {currentScreen === "song" && (
    <motion.div
      key="song"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <BlanketNightSong />
    </motion.div>
  )} */}

  {/* {currentScreen === "final" && (
  <FinalScreen
    key="final"
    onNext={() => 
      setCurrentScreen("song")
      
     }
  />
)} */}
    {currentScreen === "final" && (
  <FinalScreen
    onNext={() => {
      setFadeBgMusic(true)   // 🔇 fade background music
      nextScreen("song")     // 🎶 go to song screen
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
    className="min-h-screen flex items-center justify-center px-4"
  >
   <BlanketNightSong
      onBack={() => setCurrentScreen("final")}
    />
  </motion.div>
)}

</AnimatePresence>


      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light">
        @gsg_mks
      </motion.div>
    </div>
  )
}
