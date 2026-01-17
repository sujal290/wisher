"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"



export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.target

  const { data, error } = await supabase
  .from("wishes")
  .insert({
    to_name: form.name.value,
    from_name: "Someone", // or add another input later
    message: form.message.value,
    song: form.song.value || null,
    images: []
  })
  .select()
  .single()


    if (error) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
      return
    }

    // ✅ Redirect to generated page
    router.push(`/view/${data.id}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-[#120018] to-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5
                   bg-black/60 backdrop-blur-xl
                   border border-white/10
                   rounded-3xl p-6 shadow-2xl"
      >
        <h1 className="text-2xl text-white font-semibold text-center">
          Create Birthday Wish 🎂
        </h1>

        {/* Name */}
        <input
          name="name"
          placeholder="Birthday Person Name"
          className="input"
          required
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Write your message..."
          rows={5}
          className="input resize-none"
          required
        />

        {/* Song */}
        <input
          name="song"
          placeholder="Song URL (optional)"
          className="input"
        />

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl
                     bg-gradient-to-r from-pink-500 to-purple-500
                     text-white font-semibold
                     hover:scale-[1.02] transition
                     disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Wish 💖"}
        </button>
      </form>
    </div>
  )
}
