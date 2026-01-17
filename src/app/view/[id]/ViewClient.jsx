"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import ProposalSite from "@/app/proposalsite"

export default function ViewClient({ id }) {
  const [wish, setWish] = useState(null)

  useEffect(() => {
    const fetchWish = async () => {
      const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      setWish(data)
    }

    fetchWish()
  }, [id]) // ✅ ONLY id here

  if (!wish) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return <ProposalSite content={wish} />
}
