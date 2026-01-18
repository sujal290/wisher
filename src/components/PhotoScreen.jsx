"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Heart, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import Image from "next/image"

export default function PhotoScreen({ images = [], onNext }) {
  const [showButton, setShowButton] = useState(false)
  const swiperRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!images.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-pink-300">
        No photos added 📸
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <h1 className="text-2xl md:text-3xl text-pink-200 leading-relaxed mb-4 font-semibold">
          From the first day I met you, life became 🌙💗{" "}
          <span className="text-pink-400 font-bold">
            Brighter and easier to breathe…
          </span>
        </h1>

        <motion.p
          className="text-xl md:text-2xl text-purple-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          You’ve made every day more colorful 🌈
        </motion.p>
      </motion.div>

      {/* Swiper */}
      <motion.div
        className="w-full max-w-4xl mx-auto flex items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect="coverflow"
          loop
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ depth: 120 }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[EffectCoverflow, Pagination]}
          className="photo-swiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} style={{ width: "300px" }}>
              <motion.div
                className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={src}
                  alt={`Photo ${index + 1}`}
                  fill
                  sizes="300px"
                  className="object-cover cursor-pointer"
                  onClick={() => swiperRef.current.slideNext()}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: showButton ? 1 : 0,
          y: showButton ? 0 : 50,
        }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-pink-300/80 text-sm mb-6 italic"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Now for the most important part…
        </motion.p>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-pink-500 to-purple-600
                     hover:from-pink-600 hover:to-purple-700
                     text-white px-8 py-4 text-lg font-semibold
                     rounded-full transition-all duration-300
                     hover:scale-105 shadow-lg flex items-center
                     justify-center mx-auto"
        >
          <Heart className="w-5 h-5 mr-2 fill-current heartbeat-animation" />
          See the Message
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </motion.div>
    </motion.div>
  )
}

