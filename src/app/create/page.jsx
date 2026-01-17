// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase"
// // import { uploadFile } from "@/lib/uploadFile"

// export default function CreatePage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const uploadFile = async (bucket, file, type) => {
//   const ext = file.name.split(".").pop()
//   const path = `${crypto.randomUUID()}.${ext}`

//   const { error } = await supabase.storage
//     .from(bucket)
//     .upload(path, file, { contentType: type })

//   if (error) throw error

//   return supabase.storage
//     .from(bucket)
//     .getPublicUrl(path).data.publicUrl
// }


//   const [songInputs, setSongInputs] = useState([0])
//   const [imageInputs, setImageInputs] = useState([0])

//   const addSong = () => setSongInputs([...songInputs, Date.now()])
//   const addImage = () => setImageInputs([...imageInputs, Date.now()])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const form = e.target

//       const to_name = form.to_name.value
//       const from_name = form.from_name.value
//       const message = form.message.value

//       /* 🎵 UPLOAD SONGS */
//       const songs = []
//       for (let i = 0; i < songInputs.length; i++) {
//         const file = form[`song_${i}`]?.files[0]
//         if (!file) continue

//         const url = await uploadFile("songs", file, "audio/mpeg")
//         songs.push(url)
//       }

//       const bg_music = await uploadFile(
//   "songs",
//   form.bg_music.files[0],
//   "audio/mpeg"
// )

// const final_song = await uploadFile(
//   "songs",
//   form.final_song.files[0],
//   "audio/mpeg"
// )

// const cover_pdf = await uploadFile(
//   "pdfs",
//   form.cover_pdf.files[0],
//   "application/pdf"
// )

// const message_pdf = await uploadFile(
//   "pdfs",
//   form.message_pdf.files[0],
//   "application/pdf"
// )

// const floating_pdf = form.floating_pdf.files[0]
//   ? await uploadFile(
//       "pdfs",
//       form.floating_pdf.files[0],
//       "application/pdf"
//     )
//   : null

// const photos = []
// for (const file of form.photos.files) {
//   photos.push(
//     await uploadFile("images", file, file.type)
//   )
// }

    
      

//       /* 🖼 UPLOAD IMAGES */
//       const images = []
//       for (let i = 0; i < imageInputs.length; i++) {
//         const file = form[`image_${i}`]?.files[0]
//         if (!file) continue

//         const url = await uploadFile("images", file, file.type)
//         images.push(url)
//       }

//       /* 📦 INSERT DATABASE */
//       const { data, error } = await supabase
//   .from("wishes")
//   .insert({
//     to_name,
//     from_name,
//     message,
//     bg_music,
//     final_song,
//     cover_pdf,
//     message_pdf,
//     floating_pdf,
//     photos
//   })
//   .select()
//   .single()

// if (error) throw error

// router.push(`/view/${data.id}`)


//     } catch (err) {
//       console.error("CREATE ERROR →", err)
//       alert(err.message || "Something went wrong")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md w-full space-y-4 bg-black/60 p-6 rounded-2xl"
//       >
//         <h1 className="text-white text-xl text-center">
//           Create Birthday Page 🎂
//         </h1>

//         <input name="to_name" placeholder="To" className="input" required />
//         <input name="from_name" placeholder="From" className="input" required />

//         <textarea
//           name="message"
//           placeholder="Message"
//           className="input"
//           rows={4}
//           required
//         />

//         {/* 🎵 SONG INPUTS */}
//         <div>
//           <label className="text-white block mb-2">Songs (MP3)</label>
//           {songInputs.map((_, i) => (
//             <input
//               key={i}
//               type="file"
//               name={`song_${i}`}
//               accept="audio/mpeg"
//               className="mb-2"
//               required={i === 0}
//             />
//           ))}
//           <button
//             type="button"
//             onClick={addSong}
//             className="text-pink-400 text-sm"
//           >
//             + Add another song
//           </button>
//         </div>

//         {/* 🖼 IMAGE INPUTS */}
//         <div>
//           <label className="text-white block mb-2">Images</label>
//           {imageInputs.map((_, i) => (
//             <input
//               key={i}
//               type="file"
//               name={`image_${i}`}
//               accept="image/*"
//               className="mb-2"
//               required={i === 0}
//             />
//           ))}
//           <button
//             type="button"
//             onClick={addImage}
//             className="text-pink-400 text-sm"
//           >
//             + Add another image
//           </button>
//         </div>

//         <button
//           disabled={loading}
//           className="w-full bg-pink-500 py-3 rounded-xl text-white font-semibold"
//         >
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

  /* 🔼 Universal upload helper */
  const uploadFile = async (bucket, file, type) => {
    const ext = file.name.split(".").pop()
    const path = `${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: type })

    if (error) throw error

    return supabase.storage
      .from(bucket)
      .getPublicUrl(path).data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.target

      const to_name = form.to_name.value
      const from_name = form.from_name.value
      const message = form.message.value

      /* 🎵 MUSIC */
      const bg_music = await uploadFile(
        "songs",
        form.bg_music.files[0],
        "audio/mpeg"
      )

      const final_song = await uploadFile(
        "songs",
        form.final_song.files[0],
        "audio/mpeg"
      )

      /* 📄 PDFs */
      const cover_pdf = await uploadFile(
        "pdfs",
        form.cover_pdf.files[0],
        "application/pdf"
      )

      const message_pdf = await uploadFile(
        "pdfs",
        form.message_pdf.files[0],
        "application/pdf"
      )

      const floating_pdf = form.floating_pdf.files[0]
        ? await uploadFile(
            "pdfs",
            form.floating_pdf.files[0],
            "application/pdf"
          )
        : null

      /* 🖼 PHOTOS */
      const photos = []
      for (const file of form.photos.files) {
        photos.push(await uploadFile("images", file, file.type))
      }

      /* 📦 DATABASE */
      const { data, error } = await supabase
        .from("wishes")
        .insert({
          to_name,
          from_name,
          message,
          bg_music,
          final_song,
          cover_pdf,
          message_pdf,
          floating_pdf,
          photos,
        })
        .select()
        .single()

      if (error) throw error

      router.push(`/view/${data.id}`)
    } catch (err) {
      console.error("CREATE ERROR →", err)
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

        <input name="to_name" placeholder="To" className="input" required />
        <input name="from_name" placeholder="From" className="input" required />

        <textarea
          name="message"
          placeholder="Message"
          className="input"
          rows={4}
          required
        />

        {/* 🎵 MUSIC */}
        <label className="text-white">Background Music (MP3)</label>
        <input type="file" name="bg_music" accept="audio/mpeg" required />

        <label className="text-white">Final Song (MP3)</label>
        <input type="file" name="final_song" accept="audio/mpeg" required />

        {/* 📄 PDFs */}
        <label className="text-white">Cover PDF</label>
        <input type="file" name="cover_pdf" accept="application/pdf" required />

        <label className="text-white">Message PDF</label>
        <input type="file" name="message_pdf" accept="application/pdf" required />

        <label className="text-white">Floating PDF (optional)</label>
        <input type="file" name="floating_pdf" accept="application/pdf" />

        {/* 🖼 PHOTOS */}
        <label className="text-white">Photos</label>
        <input type="file" name="photos" accept="image/*" multiple required />

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
