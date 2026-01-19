import ViewClient from "./ViewClient"

export default async function Page(props) {
  // ✅ unwrap params (REQUIRED in Next 16)
  const params = await props.params

  return <ViewClient id={params.id} />
}
