// "use client"

// import { motion } from "framer-motion"
// import { Heart } from "lucide-react"
// import { content } from "../config/content"


// export default function FirstScreen({ onNext }) {

//     return (
//         <motion.div
//             className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//         >

//             <div className="text-center max-w-3xl mx-auto">
//                 <motion.div
//                     className="mb-8"
//                     initial={{ scale: 0}}
//                     animate={{ scale: 1 }}
//                     transition={{
//                         type: "tween",
//                         stiffness: 260,
//                         damping: 20,
//                         delay: 0.5,
//                     }}
//                 >
//                     <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 flex items-center justify-center border-2 border-pink-400/30 pulse-glow">
//                         <motion.div
//                             transition={{
//                                 duration: 2,
//                                 repeat: Number.POSITIVE_INFINITY,
//                                 ease: "easeInOut",
//                             }}
//                         >
//                             <img src="/gif/cute.gif" className="" alt="panda jumping" />
                            
//                         </motion.div>
//                     </div>
//                 </motion.div>

//                 <motion.h1
//                     className="text-4xl md:text-6xl text-pink-200 mb-6 font-semibold leading-tight"
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1, duration: 0.8 }}
//                 >
//                     I have something{" "}
//                     <span className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
//                         special
//                     </span>{" "}
//                     to For you...
//                 </motion.h1>

//                 {/* Subtitle */}
//                 <motion.p
//                     className="text-pink-200/70 text-xl md:text-2xl mb-12"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1.5, duration: 0.8 }}
//                 >
//                    Site that touch your heart ❤️ ✨
//                 </motion.p>

//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 2, duration: 0.5 }}
//                 >
//                     <button
//                         onClick={onNext}
//                         className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full pulse-glow transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
//                     >
//                         <Heart className="w-5 h-5 mr-2" />
//                         Tap to Begin 
//                         <Heart className="w-5 h-5 ml-2" />
//                     </button>
//                 </motion.div>
//             </div>
//         </motion.div>
//     )
// }














"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function FirstScreen({ onNext, content }) {
  const toName = content?.to_name || "You"

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center max-w-3xl mx-auto">
        {/* Avatar */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-36 h-36 mx-auto rounded-full overflow-hidden 
                bg-gradient-to-br from-purple-500/20 to-rose-500/20 
                flex items-center justify-center 
                border-2 border-pink-400/30 pulse-glow">
  {content?.cover_image ? (
    <img
      src={content.cover_image}
      alt="Cover"
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-pink-300 text-sm">
      No Cover Image
    </span>
  )}
</div>

        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl text-pink-200 mb-6 font-semibold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Hey{" "}
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-bold">
            {toName}
          </span>
          , I have something special for you…
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-pink-200/70 text-xl md:text-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          A small surprise made with love ❤️✨
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg flex items-center mx-auto gap-2"
        >
          <Heart className="w-5 h-5" />
          Tap to Begin
          <Heart className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}




