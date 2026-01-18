"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  /* 🔐 Universal upload helper */
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

      /* 🖼 IMAGES */
      const cover_image = await uploadFile(
        "images",
        form.cover_image.files[0],
        form.cover_image.files[0].type
      )

      const floating_image = form.floating_image.files[0]
        ? await uploadFile(
            "images",
            form.floating_image.files[0],
            form.floating_image.files[0].type
          )
        : null

      /* 📸 PHOTO SCREEN (minimum 4) */
      const photoFiles = form.photos.files
      if (photoFiles.length < 4) {
        alert("Please upload at least 4 photos for the Photo Screen")
        setLoading(false)
        return
      }

      const photos = []
      for (const file of photoFiles) {
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
          cover_image,
          floating_images: floating_image ? [floating_image] : [],
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
        className="max-w-md w-full space-y-5 bg-black/70 p-6 rounded-2xl"
      >
        <h1 className="text-white text-2xl text-center font-semibold">
          Create Birthday Page 🎂
        </h1>

        {/* TEXT */}
        <input name="to_name" placeholder="To (Birthday Person)" className="input" required />
        <input name="from_name" placeholder="From (Your Name)" className="input" required />

        <textarea
          name="message"
          placeholder="Your Message"
          className="input"
          rows={4}
          required
        />

        {/* MUSIC */}
        <label className="text-white font-medium">
          🎵 Background Music (plays throughout site).                        
        </label>
        <input type="file" name="bg_music" accept="audio/mpeg" required />

        <label className="text-white font-medium">
          🎧 Final Song (plays at the end).      
        </label>
        <input type="file" name="final_song" accept="audio/mpeg" required />

        {/* IMAGES */}
        <label className="text-white font-medium">
          🖼 Cover Image (first screen)
        </label>
        <input type="file" name="cover_image" accept="image/*" required />

        <label className="text-white font-medium">
          ✨ Floating Image (optional decoration)
        </label>
        <input type="file" name="floating_image" accept="image/*" />

        <label className="text-white font-medium">
          📸 Photo Screen Images (exactly 4)
        </label>
        <input type="file" name="photos" accept="image/*" multiple required />
        <p className="text-xs text-pink-300">
          These images will appear in the photo carousel
        </p>

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
