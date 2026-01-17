"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreatePage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [song, setSong] = useState("song1.mp3")

  const handleGenerate = () => {
    router.push(
      `/view?name=${encodeURIComponent(name)}
      &msg=${encodeURIComponent(message)}
      &song=${song}`
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md space-y-4">

        <h1 className="text-3xl text-pink-400 text-center">
          Create Birthday Surprise 🎉
        </h1>

        <input
          placeholder="Name"
          className="w-full p-3 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Message"
          className="w-full p-3 rounded h-32"
          onChange={(e) => setMessage(e.target.value)}
        />

        <select
          className="w-full p-3 rounded"
          onChange={(e) => setSong(e.target.value)}
        >
          <option value="song1.mp3">Romantic 🎶</option>
          <option value="song2.mp3">Happy 🎉</option>
        </select>

        <button
          onClick={handleGenerate}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white"
        >
          Generate Surprise ✨
        </button>

      </div>
    </div>
  )
}
