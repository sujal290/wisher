
// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase"

// export default function CreatePage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     const form = e.target

// const songFile = form.song.files[0]

// // ✅ SAFE filename
// const songPath = `songs/${crypto.randomUUID()}.mp3`

// const { error: songError } = await supabase
//   .storage
//   .from("songs")
//   .upload(songPath, songFile, {
//     contentType: "audio/mpeg"
//   })

// if (songError) {
//   console.error(songError)
//   alert("Song upload failed")
//   return
// }

// const { data: songPublic } = supabase
//   .storage
//   .from("songs")
//   .getPublicUrl(songPath)

// const songUrl = songPublic.publicUrl


//     /* ---------- UPLOAD IMAGES ---------- */
//     const imageUrls = []

//     for (const file of form.images.files) {
//       const imagePath = `img-${Date.now()}-${file.name}`

//       const { error } = await supabase.storage
//         .from("images")
//         .upload(imagePath, file)

//       if (!error) {
//         const url =
//           supabase.storage.from("images").getPublicUrl(imagePath).data.publicUrl
//         imageUrls.push(url)
//       }
//     }

//     /* ---------- INSERT ROW ---------- */
//     const { data, error } = await supabase
//         .from("wishes")
//         .insert({
//         to_name,
//         from_name,
//         message,
//         song: songUrl,
//         images: imageUrls
//         })
//         .select()
//         .single()

//         console.log("INSERT DATA 👉", data)
//         console.log("INSERT ERROR 👉", error)

//         if (error) {
//         alert(error.message)
//         return
// }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md w-full space-y-4 bg-black/60 p-6 rounded-2xl"
//       >
//         <h1 className="text-white text-xl text-center">Create Birthday Page 🎂</h1>

//         <input name="name" placeholder="Name" className="input" required />
//         <textarea name="message" placeholder="Message" className="input" required />

//         <input type="file" name="song" accept="audio/mpeg" required />
//         <input type="file" name="images" accept="image/*" multiple required />

//         <button className="w-full bg-pink-500 py-3 rounded-xl text-white">
//           {loading ? "Creating..." : "Create 🎁"}
//         </button>
//       </form>
//     </div>
//   )
// }






"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // 🔒 Safe filename generator
  const safeFileName = (file) => {
    const ext = file.name.split(".").pop()
    return `${crypto.randomUUID()}.${ext}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.target

      const to_name = form.to_name.value
      const from_name = form.from_name.value
      const message = form.message.value
      const songFile = form.song.files[0]
      const imageFiles = form.images.files

      /* ---------- UPLOAD SONG ---------- */
      const songName = safeFileName(songFile)

      const { error: songError } = await supabase.storage
        .from("songs")
        .upload(songName, songFile, {
          contentType: "audio/mpeg"
        })

      if (songError) throw songError

      const { data: songPublic } = supabase.storage
        .from("songs")
        .getPublicUrl(songName)

      const songUrl = songPublic.publicUrl

      /* ---------- UPLOAD IMAGES ---------- */
      const imageUrls = []

      for (const img of imageFiles) {
        const imgName = safeFileName(img)

        const { error } = await supabase.storage
          .from("images")
          .upload(imgName, img)

        if (error) throw error

        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(imgName)

        imageUrls.push(data.publicUrl)
      }

      /* ---------- INSERT DATABASE ---------- */
      const { data, error } = await supabase
        .from("wishes")
        .insert({
          to_name,
          from_name,
          message,
          song: songUrl,
          images: imageUrls
        })
        .select()
        .single()

      if (error) throw error

      // 🚀 Redirect to final birthday page
      router.push(`/view/${data.id}`)

    } catch (err) {
      console.error("CREATE ERROR 👉", err)
      alert(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4 bg-black/60 p-6 rounded-2xl"
      >
        <h1 className="text-white text-xl text-center">
          Create Birthday Page 🎂
        </h1>

        <input
          name="to_name"
          placeholder="Birthday Person Name"
          className="input"
          required
        />

        <input
          name="from_name"
          placeholder="Your Name"
          className="input"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          className="input"
          rows={4}
          required
        />

        <input
          type="file"
          name="song"
          accept="audio/mpeg"
          required
        />

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          required
        />

        <button
          disabled={loading}
          className="w-full bg-pink-500 py-3 rounded-xl text-white font-semibold"
        >
          {loading ? "Creating..." : "Create 🎁"}
        </button>
      </form>
    </div>
  )
}
