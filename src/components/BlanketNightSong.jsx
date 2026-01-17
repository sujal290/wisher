"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useRef,useState } from "react"
import EndMessage from "./EndMessage"


export default function BlanketNightSong({ onBack }) {
  const router = useRouter()
  const audioRef = useRef(null)
  const [showEnd, setShowEnd] = useState(false)

  useEffect(() => {
  const audio = audioRef.current
  if (!audio) return

  audio.volume = 0
  audio.play().catch(() => {}) // safe autoplay

  // smooth fade-in
  let v = 0
  const fade = setInterval(() => {
    v += 0.05
    audio.volume = Math.min(v, 1)
    if (v >= 1) clearInterval(fade)
  }, 200)

  return () => clearInterval(fade)
}, [])
  

  return (
    <>
    {/* 🌸 LEFT IMAGES (Desktop only) */}
<div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-8 z-10 pointer-events-none">
  {CONTENT.sideImages.map((img, i) => (
    <img
      key={`left-${i}`}
      src={img}
      className="w-32 xl:w-40 opacity-40 animate-[float_8s_ease-in-out_infinite]"
      alt=""
    />
  ))}
</div>


{/* 🌸 RIGHT IMAGES (Desktop only) */}
<div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col gap-8 z-10 pointer-events-none">
  {[...CONTENT.sideImages].reverse().map((img, i) => (
    <img
      key={`right-${i}`}
      src={img}
      className="w-32 xl:w-40 opacity-40 animate-[float_9s_ease-in-out_infinite]"
      alt=""
    />
  ))}
</div>



 <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
     className="
  relative z-20
  w-[95%] sm:w-[90%] md:max-w-3xl
  mx-auto
  bg-white/5 backdrop-blur-xl
  border border-white/10
  rounded-2xl sm:rounded-3xl
  p-5 sm:p-8
  text-purple-200
  max-h-[90vh]
  overflow-y-auto
"
    >
      {/* 🎧 Audio Player */}
<div className="mb-8">
  <audio
    ref={audioRef}
    onEnded={() => setShowEnd(true)}
    controls
    preload="metadata"
    className="w-full rounded-lg sticky top-0 z-30 bg-black/60 backdrop-blur-md"
  >
    <source src={CONTENT.audio} type="audio/mpeg" />
  </audio>
</div>


      {/* 🌸 Mobile Top Images */}
<div className="flex lg:hidden justify-center gap-4 mb-6">
  {CONTENT.sideImages.slice(0, 3).map((img, i) => (
    <img key={i} src={img} className="w-20 opacity-40" />
  ))}
</div>



      {/* 📝 Lyrics */}
     <div className="space-y-8 leading-relaxed text-base sm:text-lg">
        <section>
          <h3 className="text-pink-400 font-semibold mb-2 text-base sm:text-lg">[Verse 1]</h3>
          <p>
            खामोश शाम थी<br />
            तेरा हाथ था मेरे हाथ में<br />
            दो दिल बैठे थे<br />
            एक ही छोटी-सी बात में
          </p>
          <p className="mt-4">
            कम्बल की तह में<br />
            धीमी हँसी<br />
            धीमी गर्माहट<br />
            तेरी पलकों पर<br />
            रुक गई सारी जग की आहट
           </p>
        </section>

        <section>
          <h3 className="text-pink-400 font-semibold mb-2 text-base sm:text-lg">[Chorus]</h3>
          <p>
            कम्बल वाली मीठी रात<br />
            तेरे संग<br />
            बस तेरी बात<br />
            पॉपकॉर्न<br />
            फिल्म और तू<br />
            यही है मेरा संसार आज
          </p>
          <p className="mt-4">
            कम्बल वाली मीठी रात<br />
            धड़कन की धीमी सी बरसात<br />
            तीन नहीं<br />
            बस एक कहानी<br />
            जिसमें हम दोनों की मुस्कान
          </p>
        </section>

        <section>
          <h3 className="text-pink-400 font-semibold mb-2 text-base sm:text-lg">[Verse 2]</h3>
          <p>
            स्क्रीन पर चलते थे<br />
            किसी और के किस्से हौले से<br />
            पर बीच-बीच में<br />
            ठहरती थी नज़र तेरे चेहरे पे
          </p>
          <p className="mt-4">
            तेरी हँसी गिरती<br />
            जैसे तकिए पर हल्की बरसात<br />
            एक चिपकी-सी याद<br />
            हर सीन पे लिखती तेरा साथ
          </p>
        </section>

        <section>
          <h3 className="text-pink-400 font-semibold mb-2 text-base sm:text-lg">[Bridge]</h3>
          <p>
            सुबह हुई तो<br />
            सिर था मेरी गोद में आराम से <br />
            कॉफी ठंडी<br />
            पर<br />
            गरमी थी तेरे सुबुक साँस में
          </p>
          <p className="mt-4">
            फ़ोन की गैलरी<br />
            बस एक ही तस्वीर में ठहरी<br />
            हम दोनों हँसते<br />
            जैसे दुनिया यहीं पे ठहर गई
          </p>
          </section>

          {/* Chorus repeat */}
        <section>
         <h3 className="text-pink-400 font-semibold mb-2 text-base sm:text-lg">[Chorus]</h3>
          <p>
            कम्बल वाली मीठी रात<br />
            तेरे संग<br />
            बस तेरी बात
          </p>
        </section>
      </div>

      {/* 🌸 Mobile Bottom Images */}
<div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-8 z-10 pointer-events-none">
  {CONTENT.sideImages.map((img, i) => (
    <img
      key={`left-${i}`}
      src={img}
      className="w-32 xl:w-40 opacity-40 animate-[float_8s_ease-in-out_infinite]"
      alt=""
    />
  ))}
</div>



      {/* ⬅️ Back Button (FIXED) */}
      <motion.button
        onClick={onBack}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="
          mt-12 mx-auto block
          relative z-30
          bg-gradient-to-r from-purple-500 to-pink-500
          text-white px-10 py-4
          rounded-full text-lg
          shadow-2xl
        "
      >
        ⬅ Back
      </motion.button>
    </motion.div>
    {showEnd && <EndMessage onClose={() => setShowEnd(false)} />}

</>
   
  )
}
