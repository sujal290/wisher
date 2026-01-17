import { supabase } from "./supabase"

export const uploadFile = async (bucket, file, type) => {
  const ext = file.name.split(".").pop()
  const path = `${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType: type })

  if (error) throw error

  return supabase
    .storage
    .from(bucket)
    .getPublicUrl(path).data.publicUrl
}
