// "use client"

// import { useState, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase"

// export default function CreatePage() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)

//   /* ✅ NEW: store selected file names */
//   const [fileNames, setFileNames] = useState({})

//   const bgRef = useRef()
//   const finalRef = useRef()
//   const coverRef = useRef()
//   const floatingRef = useRef()
//   const photosRef = useRef()

//   /* 🔐 Upload helper */
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
//       const to_name = e.target.to_name.value
//       const from_name = e.target.from_name.value
//       const message = e.target.message.value

//       const bg_music = await uploadFile("songs", bgRef.current.files[0], "audio/mpeg")
//       const final_song = await uploadFile("songs", finalRef.current.files[0], "audio/mpeg")

//       const cover_image = await uploadFile(
//         "images",
//         coverRef.current.files[0],
//         coverRef.current.files[0].type
//       )

//       const floating_image = floatingRef.current.files[0]
//         ? await uploadFile("images", floatingRef.current.files[0], floatingRef.current.files[0].type)
//         : null

//       const photoFiles = photosRef.current.files
//       if (photoFiles.length < 4) {
//         alert("Please upload at least 4 photos")
//         setLoading(false)
//         return
//       }

//       const photos = []
//       for (const file of photoFiles) {
//         photos.push(await uploadFile("images", file, file.type))
//       }

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
//       alert(err.message || "Something went wrong")
//     } finally {
//       setLoading(false)
//     }
//   }

//   /* 🔹 helper to update filename display */
//   const handleFile = (key, files) => {
//     if (!files || files.length === 0) {
//       setFileNames(p => ({ ...p, [key]: "No file chosen" }))
//       return
//     }

//     if (files.length === 1) {
//       setFileNames(p => ({ ...p, [key]: files[0].name }))
//     } else {
//       setFileNames(p => ({
//         ...p,
//         [key]: `${files.length} files selected`
//       }))
//     }
//   }

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-700 px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-2xl bg-black/60 backdrop-blur-lg rounded-3xl p-8 space-y-8"
//       >
//         <h1 className="text-3xl text-white text-center font-semibold">
//           🎂 Create Birthday Page
//         </h1>

//         <input name="to_name" placeholder="To (Birthday Person)" className="input" required />
//         <input name="from_name" placeholder="From (Your Name)" className="input" required />
//         <textarea name="message" placeholder="Your Message…" className="input h-32" required />

//         {/* MUSIC */}
//         <UploadRow
//           title="🎵 Background Music"
//           desc="Plays throughout the site"
//           fileName={fileNames.bg_music}
//           onClick={() => bgRef.current.click()}
//         />
//         <input
//           ref={bgRef}
//           type="file"
//           accept="audio/mpeg"
//           hidden
//           required
//           onChange={e => handleFile("bg_music", e.target.files)}
//         />

//         <UploadRow
//           title="🎧 Final Song"
//           desc="Plays at the end"
//           fileName={fileNames.final_song}
//           onClick={() => finalRef.current.click()}
//         />
//         <input
//           ref={finalRef}
//           type="file"
//           accept="audio/mpeg"
//           hidden
//           required
//           onChange={e => handleFile("final_song", e.target.files)}
//         />

//         {/* IMAGES */}
//         <UploadRow
//           title="🖼 Cover Image"
//           desc="First screen image"
//           fileName={fileNames.cover_image}
//           onClick={() => coverRef.current.click()}
//         />
//         <input
//           ref={coverRef}
//           type="file"
//           accept="image/*"
//           hidden
//           required
//           onChange={e => handleFile("cover_image", e.target.files)}
//         />

//         <UploadRow
//           title="✨ Floating Image"
//           desc="Optional decoration"
//           fileName={fileNames.floating_image}
//           onClick={() => floatingRef.current.click()}
//         />
//         <input
//           ref={floatingRef}
//           type="file"
//           accept="image/*"
//           hidden
//           onChange={e => handleFile("floating_image", e.target.files)}
//         />

//         <UploadRow
//           title="📸 Photo Screen Images"
//           desc="At least 4 images"
//           fileName={fileNames.photos}
//           onClick={() => photosRef.current.click()}
//         />
//         <input
//           ref={photosRef}
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           required
//           onChange={e => handleFile("photos", e.target.files)}
//         />

//         <button
//           disabled={loading}
//           className="w-full bg-pink-500 hover:bg-pink-600 py-4 rounded-xl text-white text-lg font-semibold"
//         >
//           {loading ? "Creating…" : "Create 🎁"}
//         </button>
//       </form>
//     </div>
//   )
// }

// /* 🔹 Upload UI row */
// function UploadRow({ title, desc, onClick, fileName }) {
//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-white font-medium">{title}</p>
//           <p className="text-white/60 text-sm">{desc}</p>
//         </div>
//         <button
//           type="button"
//           onClick={onClick}
//           className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm"
//         >
//           Upload
//         </button>
//       </div>

//       <p className="text-xs text-pink-300">
//         {fileName || "No file chosen"}
//       </p>
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

  /* filenames + memory texts */
  const [fileNames, setFileNames] = useState({})
  const [memoryTexts, setMemoryTexts] = useState([])

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

  /* 📤 Submit */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const to_name = e.target.to_name.value
      const from_name = e.target.from_name.value
      const message = e.target.message.value
      const intro_text = e.target.intro_text.value
      const final_message = e.target.final_message.value


      const bg_music = await uploadFile("songs", bgRef.current.files[0], "audio/mpeg")
      const final_song = await uploadFile("songs", finalRef.current.files[0], "audio/mpeg")

      const cover_image = await uploadFile(
        "images",
        coverRef.current.files[0],
        coverRef.current.files[0].type
      )

      const floating_image = floatingRef.current.files[0]
        ? await uploadFile(
            "images",
            floatingRef.current.files[0],
            floatingRef.current.files[0].type
          )
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

      /* 📦 INSERT DATABASE (IMAGES + MEMORY TEXTS) */
      const { data, error } = await supabase
        .from("wishes")
        .insert({
          to_name,
          from_name,
          message,
          intro_text,   
          final_message,
          bg_music,
          final_song,
          cover_image,
          floating_images: floating_image ? [floating_image] : [],
          photos,
          memory_texts: memoryTexts, // ✅ NEW
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

  /* 🔹 file handler */
  const handleFile = (key, files) => {
    if (!files || files.length === 0) {
      setFileNames(p => ({ ...p, [key]: "No file chosen" }))
      return
    }

    setFileNames(p => ({
      ...p,
      [key]: files.length === 1 ? files[0].name : `${files.length} files selected`,
    }))

    /* 🧠 create text inputs for each image */
    if (key === "photos") {
      setMemoryTexts(Array(files.length).fill(""))
    }
  }

  /* 📝 memory text handler */
  const updateMemoryText = (index, value) => {
    const copy = [...memoryTexts]
    copy[index] = value
    setMemoryTexts(copy)
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
        {/* INTRO TEXT */}
<textarea
  name="intro_text"
  placeholder="Intro text (appears as typing text at the top)…"
  className="input h-28"
  required
/>

{/* FINAL MESSAGE */}
<textarea
  name="final_message"
  placeholder="Final message (appears at the very end)…"
  className="input h-28"
  required
/>



        {/* MUSIC */}
        <UploadRow title="🎵 Background Music" desc="Plays throughout site"
          fileName={fileNames.bg_music} onClick={() => bgRef.current.click()} />
        <input ref={bgRef} type="file" accept="audio/mpeg" hidden required
          onChange={e => handleFile("bg_music", e.target.files)} />

        <UploadRow title="🎧 Final Song" desc="Plays at the end"
          fileName={fileNames.final_song} onClick={() => finalRef.current.click()} />
        <input ref={finalRef} type="file" accept="audio/mpeg" hidden required
          onChange={e => handleFile("final_song", e.target.files)} />

        {/* IMAGES */}
        <UploadRow title="🖼 Cover Image" desc="First screen"
          fileName={fileNames.cover_image} onClick={() => coverRef.current.click()} />
        <input ref={coverRef} type="file" accept="image/*" hidden required
          onChange={e => handleFile("cover_image", e.target.files)} />

        <UploadRow title="✨ Floating Image" desc="Optional"
          fileName={fileNames.floating_image} onClick={() => floatingRef.current.click()} />
        <input ref={floatingRef} type="file" accept="image/*" hidden
          onChange={e => handleFile("floating_image", e.target.files)} />

        <UploadRow title="📸 Photo Screen Images" desc="Minimum 4"
          fileName={fileNames.photos} onClick={() => photosRef.current.click()} />
        <input ref={photosRef} type="file" accept="image/*" multiple hidden required
          onChange={e => handleFile("photos", e.target.files)} />

        {/* 🧠 MEMORY TEXT INPUTS */}
        {memoryTexts.length > 0 && (
  <div className="space-y-4">
    <p className="text-pink-300 font-medium">
      💬 Write something for each photo (required)
    </p>

    {memoryTexts.map((text, i) => (
      <textarea
        key={i}
        className="input h-20"
        placeholder={`Memory for photo ${i + 1}`}
        value={text}
        onChange={e => updateMemoryText(i, e.target.value)}
        required
      />
    ))}
  </div>
)}


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

/* UI row */
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

