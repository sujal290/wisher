// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase"

// export default function CreatePage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)

//   /* 🔐 Universal upload helper */
//   const uploadFile = async (bucket, file, type) => {
//     if (!file) return null
//     const ext = file.name.split(".").pop()
//     const path = `${crypto.randomUUID()}.${ext}`

//     const { error } = await supabase.storage
//       .from(bucket)
//       .upload(path, file, { contentType: type })

//     if (error) throw error

//     return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const form = e.target

//       const to_name = form.to_name.value
//       const from_name = form.from_name.value
//       const message = form.message.value

//       /* 🎵 MUSIC */
//       const bg_music = await uploadFile(
//         "songs",
//         form.bg_music.files[0],
//         "audio/mpeg"
//       )

//       const final_song = await uploadFile(
//         "songs",
//         form.final_song.files[0],
//         "audio/mpeg"
//       )

//       /* 🖼 IMAGES */
//       const cover_image = await uploadFile(
//         "images",
//         form.cover_image.files[0],
//         form.cover_image.files[0].type
//       )

//       const floating_image = form.floating_image.files[0]
//         ? await uploadFile(
//             "images",
//             form.floating_image.files[0],
//             form.floating_image.files[0].type
//           )
//         : null

//       /* 📸 PHOTO SCREEN (minimum 4) */
//       const photoFiles = form.photos.files
//       if (photoFiles.length < 4) {
//         alert("Please upload at least 4 photos for the Photo Screen")
//         setLoading(false)
//         return
//       }

//       const photos = []
//       for (const file of photoFiles) {
//         photos.push(await uploadFile("images", file, file.type))
//       }

//       /* 📦 DATABASE */
//       const { data, error } = await supabase
//         .from("wishes")
//         .insert({
//           to_name,
//           from_name,
//           message,
//           bg_music,
//           final_song,
//           cover_image,
//           floating_images: floating_image ? [floating_image] : [],
//           photos,
//         })
//         .select()
//         .single()

//       if (error) throw error

//       router.push(`/view/${data.id}`)
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
//         className="max-w-md w-full space-y-5 bg-black/70 p-6 rounded-2xl"
//       >
//         <h1 className="text-white text-2xl text-center font-semibold">
//           Create Birthday Page 🎂
//         </h1>

//         {/* TEXT */}
//         <input name="to_name" placeholder="To (Birthday Person)" className="input" required />
//         <input name="from_name" placeholder="From (Your Name)" className="input" required />

//         <textarea
//           name="message"
//           placeholder="Your Message"
//           className="input"
//           rows={4}
//           required
//         />

//         {/* MUSIC */}
//         <label className="text-white font-medium">
//           🎵 Background Music (plays throughout site).                        
//         </label>
//         <input type="file" name="bg_music" accept="audio/mpeg" required />

//         <label className="text-white font-medium">
//           🎧 Final Song (plays at the end).      
//         </label>
//         <input type="file" name="final_song" accept="audio/mpeg" required />

//         {/* IMAGES */}
//         <label className="text-white font-medium">
//           🖼 Cover Image (first screen)
//         </label>
//         <input type="file" name="cover_image" accept="image/*" required />

//         <label className="text-white font-medium">
//           ✨ Floating Image (optional decoration)
//         </label>
//         <input type="file" name="floating_image" accept="image/*" />

//         <label className="text-white font-medium">
//           📸 Photo Screen Images (exactly 4)
//         </label>
//         <input type="file" name="photos" accept="image/*" multiple required />
//         <p className="text-xs text-pink-300">
//           These images will appear in the photo carousel
//         </p>

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

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  /* ✅ NEW: store selected file names */
  const [fileNames, setFileNames] = useState({})

  const bgRef = useRef()
  const finalRef = useRef()
  const coverRef = useRef()
  const floatingRef = useRef()
  const photosRef = useRef()

  /* 🔐 Upload helper */
  const uploadFile = async (bucket, file, type) => {
    if (!file) return null
    const ext = file.name.split(".").pop()
    const path = `${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { contentType: type })

    if (error) throw error

    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const to_name = e.target.to_name.value
      const from_name = e.target.from_name.value
      const message = e.target.message.value

      const bg_music = await uploadFile("songs", bgRef.current.files[0], "audio/mpeg")
      const final_song = await uploadFile("songs", finalRef.current.files[0], "audio/mpeg")

      const cover_image = await uploadFile(
        "images",
        coverRef.current.files[0],
        coverRef.current.files[0].type
      )

      const floating_image = floatingRef.current.files[0]
        ? await uploadFile("images", floatingRef.current.files[0], floatingRef.current.files[0].type)
        : null

      const photoFiles = photosRef.current.files
      if (photoFiles.length < 4) {
        alert("Please upload at least 4 photos")
        setLoading(false)
        return
      }

      const photos = []
      for (const file of photoFiles) {
        photos.push(await uploadFile("images", file, file.type))
      }

      const { data, error } = await supabase
        .from("wishes")
        .insert({
          to_name,
          from_name,
          message,
          bg_music,
          final_song,
          cover_image,
          floating_images: floating_image ? [floating_image] : [],
          photos,
        })
        .select()
        .single()

      if (error) throw error
      router.push(`/view/${data.id}`)
    } catch (err) {
      alert(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  /* 🔹 helper to update filename display */
  const handleFile = (key, files) => {
    if (!files || files.length === 0) {
      setFileNames(p => ({ ...p, [key]: "No file chosen" }))
      return
    }

    if (files.length === 1) {
      setFileNames(p => ({ ...p, [key]: files[0].name }))
    } else {
      setFileNames(p => ({
        ...p,
        [key]: `${files.length} files selected`
      }))
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-700 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-black/60 backdrop-blur-lg rounded-3xl p-8 space-y-8"
      >
        <h1 className="text-3xl text-white text-center font-semibold">
          🎂 Create Birthday Page
        </h1>

        <input name="to_name" placeholder="To (Birthday Person)" className="input" required />
        <input name="from_name" placeholder="From (Your Name)" className="input" required />
        <textarea name="message" placeholder="Your Message…" className="input h-32" required />

        {/* MUSIC */}
        <UploadRow
          title="🎵 Background Music"
          desc="Plays throughout the site"
          fileName={fileNames.bg_music}
          onClick={() => bgRef.current.click()}
        />
        <input
          ref={bgRef}
          type="file"
          accept="audio/mpeg"
          hidden
          required
          onChange={e => handleFile("bg_music", e.target.files)}
        />

        <UploadRow
          title="🎧 Final Song"
          desc="Plays at the end"
          fileName={fileNames.final_song}
          onClick={() => finalRef.current.click()}
        />
        <input
          ref={finalRef}
          type="file"
          accept="audio/mpeg"
          hidden
          required
          onChange={e => handleFile("final_song", e.target.files)}
        />

        {/* IMAGES */}
        <UploadRow
          title="🖼 Cover Image"
          desc="First screen image"
          fileName={fileNames.cover_image}
          onClick={() => coverRef.current.click()}
        />
        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          hidden
          required
          onChange={e => handleFile("cover_image", e.target.files)}
        />

        <UploadRow
          title="✨ Floating Image"
          desc="Optional decoration"
          fileName={fileNames.floating_image}
          onClick={() => floatingRef.current.click()}
        />
        <input
          ref={floatingRef}
          type="file"
          accept="image/*"
          hidden
          onChange={e => handleFile("floating_image", e.target.files)}
        />

        <UploadRow
          title="📸 Photo Screen Images"
          desc="At least 4 images"
          fileName={fileNames.photos}
          onClick={() => photosRef.current.click()}
        />
        <input
          ref={photosRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          required
          onChange={e => handleFile("photos", e.target.files)}
        />

        <button
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 py-4 rounded-xl text-white text-lg font-semibold"
        >
          {loading ? "Creating…" : "Create 🎁"}
        </button>
      </form>
    </div>
  )
}

/* 🔹 Upload UI row */
function UploadRow({ title, desc, onClick, fileName }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-white/60 text-sm">{desc}</p>
        </div>
        <button
          type="button"
          onClick={onClick}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm"
        >
          Upload
        </button>
      </div>

      <p className="text-xs text-pink-300">
        {fileName || "No file chosen"}
      </p>
    </div>
  )
}
