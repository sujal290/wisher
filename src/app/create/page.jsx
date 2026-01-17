"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const uploadFile = async (bucket, file) => {
    const ext = file.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) throw error

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.target

      /* 🎵 MP3 FILE (NOT URL) */
      let songUrl = null
      const songFile = form.song.files[0]
      if (songFile) {
        songUrl = await uploadFile("songss", songFile)
      }

      /* 🖼 IMAGES */
      const imageUrls = []
      for (const file of form.images.files) {
        const url = await uploadFile("images", file)
        imageUrls.push(url)
      }

      /* 📦 SAVE DATA */
      const { data, error } = await supabase
        .from("wishes")
        .insert({
          name: form.name.value,
          message: form.message.value,
          song: songUrl,       // ✅ stored URL of uploaded mp3
          images: imageUrls,
        })
        .select()
        .single()

      if (error) throw error

      router.push(`/view/${data.id}`)
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4 bg-black/40 p-6 rounded-2xl border border-white/10"
      >
        <h1 className="text-2xl text-white font-semibold text-center">
          Create Birthday Wish 🎂
        </h1>

        <input
          name="name"
          placeholder="Birthday Person Name"
          className="input"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          className="input"
          required
        />

        {/* 🎵 MP3 FILE UPLOAD */}
        <label className="text-white/70 text-sm">
          Upload Song (MP3 only)
        </label>
        <input
          type="file"
          name="song"
          accept="audio/mpeg"
          className="input"
        />

        {/* 🖼 IMAGE UPLOAD */}
        <label className="text-white/70 text-sm">
          Upload Images
        </label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="input"
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
        >
          {loading ? "Creating..." : "Create Wish 💖"}
        </button>
      </form>
    </div>
  )
}
