"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import ProposalSite from "@/app/ProposalSite"

export default function ViewPage({ params }) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase
        .from("wishes")
        .select("*")
        .eq("id", params.id)
        .single()

      setContent(data)
    }

    loadData()
  }, [params.id])

  if (!content) return null

  // 🔥 PLUG DATA INTO YOUR EXISTING ANIMATIONS
  return <ProposalSite content={content} />
}
